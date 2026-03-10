import { defineConfig } from "rolldown";
import { defineEnv as defineUnenv } from "unenv";

// NOTE: the line below creates an unenv environment,
// there are various variables you can control here (including
// supplying your own implementations for NodeJS builtins).
//
// see: https://github.com/unjs/unenv for more information
//
const unenv = defineUnenv();

export default defineConfig({
    input: "main.mjs",
    external: [/wasi:.*/, /node:.*/],
    output: {
    	codeSplitting: false,
        file: "dist/bundle.mjs",
        format: "esm",
    },
    resolve: {
        alias: {
            ...unenv.env.alias,
        },
    },
});
