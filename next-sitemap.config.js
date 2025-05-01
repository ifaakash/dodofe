// const { getDodoPageURLs } = require('./lib/sitemap-helpers');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://dodoclub.in',
    generateRobotsTxt: true,
    generateIndexSitemap: true, // creates sitemap.xml pointing to sitemap-0.xml
    // Optional: if you already have a robots.txt, set this to false
    // since you already have one in your public directory
    exclude: ['/admin/*', '/dashboard/*'], // exclude admin routes

    // Add additional configuration for better SEO
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,

    // Generate a sitemap for specific routes
    additionalPaths: async (config) => {
        const result = [];

        // Add your important pages with custom priorities and change frequencies
        result.push({
            loc: '/',
            changefreq: 'daily',
            priority: 1.0,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: '/blogs',
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: '/blogs/how-dodopage-skyrockets-your-clicks-and-views',
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });

        // Add more static pages
        const staticPages = [
            { url: '/about', priority: 0.7 },
            { url: '/features', priority: 0.8 },
            { url: '/pricing', priority: 0.8 },
            { url: '/contact', priority: 0.6 },
            // Add all your important pages here
        ];

        staticPages.forEach(page => {
            result.push({
                loc: page.url,
                changefreq: 'monthly',
                priority: page.priority,
                lastmod: new Date().toISOString(),
            });
        });

        // If you have dynamic pages like blog posts, you could fetch them here
        // const blogPosts = await fetchAllBlogPosts();
        // blogPosts.forEach(post => {
        //   result.push({
        //     loc: `/blogs/${post.slug}`,
        //     changefreq: 'monthly',
        //     priority: 0.7,
        //     lastmod: new Date(post.updatedAt).toISOString(),
        //   });
        // });

        // Add DodoPage URLs to sitemap
        // try {
        //     const dodoPageURLs = await getDodoPageURLs();
        //     dodoPageURLs.forEach(url => {
        //         result.push({
        //             loc: `/${url}`,
        //             changefreq: 'daily',
        //             priority: 0.8,
        //             lastmod: new Date().toISOString(),
        //         });
        //     });
        // } catch (error) {
        //     console.error('Error fetching DodoPage URLs for sitemap:', error);
        // }

        return result;
    },

    // Transform the default config
    transform: async (config, path) => {
        // Custom transformation based on path
        // For example, give higher priority to certain paths
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Default transformation
        return {
            loc: path,
            changefreq: 'weekly',
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
}
