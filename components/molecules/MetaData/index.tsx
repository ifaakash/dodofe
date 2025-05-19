import React from 'react';
import { Helmet } from 'react-helmet';
import dodoLogo from "public/icons/dodo.svg";

const MetaData = ({ title, description, keywords, url, image }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Team Dodo" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image || dodoLogo} />

        {/* Twitter Preview */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image || dodoLogo} />
    </Helmet>
);

export default MetaData;