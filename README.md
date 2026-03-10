```
# Build the rust code of `run` which takes a single filepath that it will try to read
cargo build --release --target wasm32-wasip2
pnpm install
pnpm run transpile
# Check that the code works by trying to read Cargo.toml (using its full path). This should work.
nodejs main.mjs $(pwd)/Cargo.toml
# Bundle main.mjs into dist/bundle.mjs
pnpm run bundle
# Check that the bundled code fails to read Cargo.toml
nodejs dist/bundle.mjs $(pwd)/Cargo.toml
# Forbid inlining of @bytecodealliance/preview2-shim/instantiation and re-bundle
sed -i -r -e 's/external: \[/external: [\/@bytecodealliance.*\/\,/ ' rolldown.config.mjs
pnpm run bundle
# Check that the bundled code works again
nodejs dist/bundle.mjs $(pwd)/Cargo.toml
```
