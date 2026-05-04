import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  external: [
    "react",
    "react-dom",
    "react-leaflet",
    "leaflet",
    "leaflet-editable",
  ],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
  treeshake: true,
  splitting: true,
});
