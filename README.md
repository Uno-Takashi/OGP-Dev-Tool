# OGP Dev Tool

![build](https://github.com/chibat/chrome-extension-typescript-starter/workflows/build/badge.svg)
[![Code Quality](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/code-quality.yml/badge.svg?branch=master)](https://github.com/Uno-Takashi/OGP-Dev-Tool/actions/workflows/code-quality.yml)

OGP Dev Tool is a tool to check how OGP is displayed on web services such as X, Facebook, etc. By providing it as Chrome Extensions, you can test OGP on your localhost without complicated uploads. 

## 📈Elevator Pitch

- Sites on localhost can also be tested.
- Provided as Chrome Extensions.

## ⚒️Develop

### Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

### Option

* [Visual Studio Code](https://code.visualstudio.com/)
* [Developing inside a Container using Visual Studio Code Remote Development](https://code.visualstudio.com/docs/devcontainers/containers)

### Includes the following

* TypeScript
* Webpack
* React
* Jest
* Example Code
  * Chrome Storage
  * Options Version 2
  * content script
  * count up badge number
  * background

### Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

### Setup

```bash
npm install
```

### Import as Visual Studio Code project

...

### Build

```bash
npm run build
```

### Build in watch mode

#### terminal

```bash
npm run watch
```

#### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

### Load extension to chrome

Load `dist` directory

### Test

`npx jest` or `npm run test`
