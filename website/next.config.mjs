// next.config.mjs

const CompressionPlugin = require('compression-webpack-plugin');  // CommonJS形式

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: !!isProd,
    trailingSlash: true,
    compress: true,
    poweredByHeader: false,
    compiler: {
        removeConsole: isProd,
        styledComponents: true,
    },
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ({ resource }) => ({
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                        cleanupIds: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            }),
        });
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: /node_modules/,
        };
        return config;
    },
};

module.exports = nextConfig;