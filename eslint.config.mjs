/* eslint-disable import/no-anonymous-default-export */

import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/coverage",
      "**/storybook",
      "**/build",
      "**/.next",
      "**/scripts",
    ],
  },
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
  ),
  {
    settings: {
      next: {
        rootDir: "./",
      },

      files: ["**/*.{ts,tsx}"],

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },

      rules: {
        "@next/next/no-page-custom-font": "off",
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "**/types/*.d.ts",
              "**/__fixtures__/**",
              "**/__mocks__/**",
              "**/__tests__/**",
              "**/*.spec.{js,ts,tsx}",
            ],

            optionalDependencies: false,
          },
        ],
        "no-unused-expressions": "off",
        "react/no-unescaped-entities": "",
        "react/require-default-props": "off",
        "react-refresh/only-export-components": [
          "warn",
          {
            allowConstantExport: true,
          },
        ],

        "react/prop-types": "off",
        "@typescript-eslint/no-unsafe-assign": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  },
];
