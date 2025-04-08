import ReactMarkdown from "react-markdown";
import fs from 'fs';
import path from 'path';
import { BLOGS } from "@utils/constants";

async function getBlogData(blogId: string) {
    const filePath = path.join(process.cwd(), 'public', 'markdown', `${blogId}.md`);
    const markdown = fs.readFileSync(filePath, 'utf8');

    // Extract additional data like title, image, and date from the markdown or a separate source
    const title = BLOGS[blogId].title; // Replace with actual logic to extract title
    const image = BLOGS[blogId].image; // Replace with actual logic to extract image path
    const date = BLOGS[blogId].date; // Replace with actual logic to extract date

    return { markdown, title, image, date };
}

export default async function BlogPage({ params }) {
    const { blogId } = params;
    const { markdown, title, image, date } = await getBlogData(blogId);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-black font-sans leading-relaxed">
            {/* Blog Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p className="text-gray-500 text-sm">{date}</p>
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="mt-6 w-full max-h-96 object-cover rounded-lg shadow-md"
                    />
                )}
            </div>

            <article
                className="
    prose prose-lg max-w-3xl mx-auto px-4 sm:px-6 leading-loose 
    prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl 
    prose-headings:font-bold prose-p:text-gray-800 
    prose-a:text-blue-600 hover:prose-a:underline 
    prose-blockquote:border-l-green-400 prose-blockquote:text-gray-700 
    prose-img:rounded-xl prose-img:shadow-md 
    prose-li:marker:text-green-500
    text-lg
  "
            >
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </article>


        </div>
    );
}
