## Installation <a name="installation"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
3. Run `pnpm install` 

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder
