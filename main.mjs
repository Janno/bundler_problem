import * as lib from './dist/transpiled/bundler_problem.js';
const args = process.argv;

import { WASIShim } from "@bytecodealliance/preview2-shim/instantiation";

const sandboxedShim = new WASIShim({
    sandbox: {
        preopens: {'/':'/'}, // mount fs root
        env: {},
        args: [],
        enableNetwork: false,
    }
});

import {readFileSync} from 'node:fs';

const getCoreModule = (path) => {
    const wasmBuffer = readFileSync('dist/transpiled/' + path);
    return WebAssembly.compile(wasmBuffer);
}

const module = await lib.instantiate(getCoreModule, sandboxedShim.getImportObject());
module.run(args[2])
