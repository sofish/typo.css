module.exports = {
  map: { inline: false },
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
