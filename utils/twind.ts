import { IS_BROWSER } from "fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      colors: {
        primary: "#0F5586",
        secondary: "#006E87",
      },
    },
  },
};

if (IS_BROWSER) setup(config);
