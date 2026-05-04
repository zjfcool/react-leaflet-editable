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
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV ?? "development",
    ),
  },
  esbuildOptions(options) {
    if (process.env.NODE_ENV === "production") {
      options.drop = ["console"];
    }
  },
});
