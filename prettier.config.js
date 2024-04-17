// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    printWidth: 80,
    semi: true,
    singleQuote: true,
    importOrder: [
        '<BUILTIN_MODULES>',
        '^(^react$|@react|react)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',

        '^~/(components|data|config)/',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],
};

export default config;
