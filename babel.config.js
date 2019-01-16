module.exports = {
  presets: ["@vue/app"],
  // tslint:disable-next-line:object-literal-sort-keys
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
