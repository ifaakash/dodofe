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
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks = {}, url, mode }) => {  
  const [showAll, setShowAll] = useState(false);

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
    ({ name }) => socialLinks && socialLinks[name as keyof typeof socialLinks]
  );

  const visibleIcons = showAll ? availableLinks : availableLinks.slice(0, 4);
  const remainingCount = availableLinks.length - 4;

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-4">
        <div className="flex gap-4">
          {visibleIcons.map((item) => (
            <a
              key={item.name}
              href={socialLinks[item.name as keyof typeof socialLinks]}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer bg-white p-3 rounded-full flex items-center justify-center"
            >
              <Image src={item.icon} alt={item.name} className="w-5 h-5" />
            </a>
          ))}
        </div>

        {availableLinks.length > 4 && !showAll && (
          mode === "edit" ? (
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
          )
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
