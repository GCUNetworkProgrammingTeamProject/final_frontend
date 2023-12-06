const path = require('path');

module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:6009/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/files/', // Adjust this path as needed
              outputPath: 'static/files/', // Adjust this path as needed
            },
          },
        ],
      },
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/videos/', // Adjust this path as needed
              outputPath: 'static/videos/', // Adjust this path as needed
            },
          },
        ],
      },
      // Add a loader for .txt files
      {
        test: /\.(txt)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/txt/', // Adjust this path as needed
              outputPath: 'static/txt/', // Adjust this path as needed
            },
          },
        ],
      }
    );

    return config;
  },
};
