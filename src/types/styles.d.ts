declare module "*.css";

declare module "html-minifier-terser/dist/htmlminifier.esm.bundle" {
  export function minify(value: string, options?: Record<string, unknown>): Promise<string>;
}

declare module "csso" {
  export function minify(
    value: string,
    options?: Record<string, unknown>,
  ): {
    css: string;
  };
}
