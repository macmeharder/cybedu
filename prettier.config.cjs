module.exports = {
  tailwindConfig: "./tailwind.config.cjs",
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^~/processes/(.*)$",
    "^~/pages/(.*)$",
    "^~/widgets/(.*)$",
    "^~/features/(.*)$",
    "^~/entities/(.*)$",
    "^~/shared/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
