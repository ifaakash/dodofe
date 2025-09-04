import React, { useState } from "react";
import Image from "next/image";
import Web from "public/icons/globeEarth.svg";
import Insta from "public/icons/insta.svg";
import Facebook from "public/icons/fb.svg";
import Twitter from "public/icons/twitter.svg";
import Youtube from "public/icons/youtube.svg";
import Telegram from "public/icons/telegram.svg";
import Snapchat from "public/icons/snapchat.svg";
import Github from "public/icons/github.svg";
import Discord from "public/icons/discord.svg";
import Behance from "public/icons/behance.svg";
import Dribble from "public/icons/dribble.svg";
import EmailId from "public/icons/email.svg";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";

interface SocialLink {
    name: string;
    icon: string;
    url: string;
}

interface SocialLinksProps {
    socialLinks: {
        website?: string;
        instagram?: string;
        facebook?: string;
        youtube?: string;
        telegram?: string;
        snapchat?: string;
        twitter?: string;
        github?: string;
        discord?: string;
        behance?: string;
        dribble?: string;
        email?: string;
    };
    url: string;
    mode: string;
    isLoading?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks = {}, url, mode, isLoading }) => {
    const [showAll, setShowAll] = useState(false);

    // Fallback function for copying to clipboard (for older browsers)
    const fallbackCopyToClipboard = (text: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                toast.success(`📧 Email copied: ${text}`, {
                    duration: 2000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to copy email', {
                    duration: 2000,
                    position: 'top-center',

                });
            }
        } catch (err) {
            toast.error('Failed to copy email', {
                duration: 2000,
                position: 'top-center',

            });
        }

        document.body.removeChild(textArea);
    };

    const socialIcons = [
        { name: "website", icon: Web },
        { name: "instagram", icon: Insta },
        { name: "facebook", icon: Facebook },
        { name: "youtube", icon: Youtube },
        { name: "telegram", icon: Telegram },
        { name: "snapchat", icon: Snapchat },
        { name: "twitter", icon: Twitter },
        { name: "github", icon: Github },
        { name: "discord", icon: Discord },
        { name: "behance", icon: Behance },
        { name: "dribble", icon: Dribble },
        { name: "email", icon: EmailId },
    ];

    const availableLinks = socialIcons.filter(
        ({ name }) =>
            socialLinks && socialLinks[name as keyof typeof socialLinks]
    );

    const visibleIcons = showAll ? availableLinks : availableLinks.slice(0, 4);
    const remainingCount = availableLinks.length - 4;

    // Show skeleton loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex gap-4">
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map((index) => (
                            <Skeleton
                                key={index}
                                circle
                                width={44}
                                height={44}
                                baseColor="#c6c6c6"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex gap-4">
                <div className="flex gap-4">
                    {visibleIcons.map((item) => {
                        const linkValue = socialLinks[
                            item.name as keyof typeof socialLinks
                        ];
                        const href = item.name === "email" ? `mailto:${linkValue}` : linkValue;

                        return (
                            <a
                                key={item.name}
                                {...(item.name !== "email" ? {
                                    href: href,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                } : {
                                    href: "#",
                                    "aria-label": `Copy ${linkValue} to clipboard`
                                })}
                                className="cursor-pointer bg-white p-3 rounded-full flex items-center justify-center"
                                onClick={(e) => {
                                    if (item.name === "email") {
                                        e.preventDefault();

                                        // Copy email to clipboard
                                        if (navigator.clipboard && navigator.clipboard.writeText) {
                                            navigator.clipboard.writeText(linkValue).then(() => {
                                                toast.success(`Email copied: ${linkValue}`, {
                                                    duration: 2000,
                                                    position: 'top-center',
                                                });
                                            }).catch(() => {
                                                // Fallback for clipboard API failure
                                                fallbackCopyToClipboard(linkValue);
                                            });
                                        } else {
                                            // Fallback for older browsers
                                            fallbackCopyToClipboard(linkValue);
                                        }
                                    }
                                }}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    className="w-5 h-5"
                                />
                            </a>
                        );
                    })}
                </div>

                {availableLinks.length > 4 &&
                    !showAll &&
                    (mode === "edit" ? (
                        <Link
                            href={`/dodo/${url}/addBlock?type=social`}
                            className="bg-white rounded-full text-xs font-semibold p-3 cursor-pointer flex items-center justify-center w-11 h-11"
                        >
                            +{remainingCount}
                        </Link>
                    ) : (
                        <div
                            className="bg-white rounded-full text-xs font-semibold p-3 cursor-pointer flex items-center justify-center w-11 h-11"
                            onClick={() => setShowAll(true)}
                        >
                            +{remainingCount}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SocialLinks;
