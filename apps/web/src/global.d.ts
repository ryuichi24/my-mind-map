/// <reference types="vite/client" />

/**
 * Declaration Merging to add API definition to global Window object
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */
declare global {
  interface Window {}
}

// https://vite.dev/guide/env-and-mode#intellisense-for-typescript
interface ViteTypeOptions {
}

interface ImportMetaEnv {
  readonly M3_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
