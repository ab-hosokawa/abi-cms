import CompressionPlugin from 'compression-webpack-plugin'; // 圧縮用プラグイン
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: !!isProd,
    trailingSlash: true,
    // 静的ファイルの配信設定
    compress: true,
    poweredByHeader: false,
    compiler: {
        removeConsole: isProd,
        styledComponents: true,
    },
    webpack(config, { isServer }) {
        // if (!isServer) {
        //     config.plugins.push(localesPlugin.webpack({ locales: [] }));
        // }
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
            ignored: /node_modules/
        };
        return config;
    },
};

export default nextConfig;
