import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**", ".gstack/tmp/**"]
  },
  {
    languageOptions: {
      globals: {
        AbortSignal: "readonly",
        DOMException: "readonly",
        RequestInfo: "readonly",
        RequestInit: "readonly",
        Response: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        setTimeout: "readonly"
      }
    },
    rules: {
      "no-undef": "off"
    }
  },
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "error"
    }
  },
  {
    files: ["test/**/*.ts", "scripts/**/*.ts"],
    rules: {
      "no-console": "off"
    }
  }
];
