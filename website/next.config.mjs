/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    poweredByHeader: false,
    compiler: {
        removeConsole: isProd,
        styledComponents: true,
    },
};

export default nextConfig;
