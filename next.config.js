/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["three", "@react-three/fiber", "@react-three/drei"]);

const nextConfig = {};

module.exports = withTM({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glb)$/,
      use: {
        loader: "file-loader",
      },
    });
    config.module.rules.push({
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    })
    return config;
  },
});
