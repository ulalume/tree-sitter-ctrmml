Install Tree-sitter CLI:

```sh
# mac
brew install tree-sitter
# other
npm i -g tree-sitter-cli
# or npx tree-sitter-cli to avoid a global install
```

Install Emscripten:

```sh
brew install emscripten
# or use emsdk if you prefer
```

If you use emsdk, make sure it is activated in your shell:

```sh
source /path/to/emsdk_env.sh
```

Build the parser:

```sh
tree-sitter generate
tree-sitter build --wasm
# If your CLI is older and doesn’t recognize build --wasm, try:
tree-sitter build-wasm
```

Notes:

- Output: `tree-sitter-ctrmml.wasm`
- CLI version: `tree-sitter --version` should be recent for `build --wasm`.
