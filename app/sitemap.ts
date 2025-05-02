import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://dodoclub.in/',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: 'https://dodoclub.in/blogs',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: 'https://dodoclub.in/home',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7
        },
        {
            url: 'https://dodoclub.in/blogs/how-dodopage-skyrockets-your-clicks-and-views',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        }
    ];
}
