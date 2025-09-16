# WMF SVG Viewer

An offline Electron + React desktop app for Windows to view `.wmf` (Windows Metafile) images as SVG, using ImageMagick.

## Features

- Select a `.wmf` file from your system
- Converts WMF to SVG locally using ImageMagick (`magick.exe`)
- Renders a preview of the SVG

## Requirements

- [Node.js](https://nodejs.org/)
- [ImageMagick](https://imagemagick.org/) installed (with `magick` on your PATH) on Windows

## Getting Started

1. **Install dependencies**
   ```
   npm install
   ```

2. **Start React dev server**
   ```
   npm run react-start
   ```
   (Leave this running in one terminal)

3. **Start Electron**
   ```
   npm start
   ```
   (In a new terminal)

> For production, build with `npm run build` and point `main.js` to `dist/index.html`.

## Notes

- The app uses Electron's `child_process` to run the `magick` CLI for conversion.
- For true portability, you can bundle a portable ImageMagick binary with your app and adjust the path in `main.js`.