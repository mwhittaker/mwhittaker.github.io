# Visualizing Distributed Systems Consistency

## Getting Started
Because of a [tsuquyomi bug](https://github.com/Quramy/tsuquyomi/issues/173),
first run `export PATH="$PWD/node_modules/typescript/bin:$PATH"`. Otherwise,
tsuquyomi cannot correctly find the local version of `tsserver`.
```bash
npm install         # Install dependencies.
npm run webpack     # Build and bundle code.
npm run tslint ts/* # Lint code.
npm run build       # Lint, build, and bundle code.
```
