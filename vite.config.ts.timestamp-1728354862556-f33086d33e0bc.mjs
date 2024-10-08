// vite.config.ts
import { defineConfig } from "file:///D:/aryajaka/Seleksi%20tahap%20akhir/ITHO-academy/node_modules/vite/dist/node/index.js";
import adonisjs from "file:///D:/aryajaka/Seleksi%20tahap%20akhir/ITHO-academy/node_modules/@adonisjs/vite/build/src/client/main.js";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["resources/css/app.css", "resources/js/app.js"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["resources/views/**/*.edge"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhcnlhamFrYVxcXFxTZWxla3NpIHRhaGFwIGFraGlyXFxcXElUSE8tYWNhZGVteVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYXJ5YWpha2FcXFxcU2VsZWtzaSB0YWhhcCBha2hpclxcXFxJVEhPLWFjYWRlbXlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2FyeWFqYWthL1NlbGVrc2klMjB0YWhhcCUyMGFraGlyL0lUSE8tYWNhZGVteS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgYWRvbmlzanMoe1xuICAgICAgLyoqXG4gICAgICAgKiBFbnRyeXBvaW50cyBvZiB5b3VyIGFwcGxpY2F0aW9uLiBFYWNoIGVudHJ5cG9pbnQgd2lsbFxuICAgICAgICogcmVzdWx0IGluIGEgc2VwYXJhdGUgYnVuZGxlLlxuICAgICAgICovXG4gICAgICBlbnRyeXBvaW50czogWydyZXNvdXJjZXMvY3NzL2FwcC5jc3MnLCAncmVzb3VyY2VzL2pzL2FwcC5qcyddLFxuXG4gICAgICAvKipcbiAgICAgICAqIFBhdGhzIHRvIHdhdGNoIGFuZCByZWxvYWQgdGhlIGJyb3dzZXIgb24gZmlsZSBjaGFuZ2VcbiAgICAgICAqL1xuICAgICAgcmVsb2FkOiBbJ3Jlc291cmNlcy92aWV3cy8qKi8qLmVkZ2UnXSxcbiAgICB9KSxcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sY0FBYztBQUVyQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtQLGFBQWEsQ0FBQyx5QkFBeUIscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLNUQsUUFBUSxDQUFDLDJCQUEyQjtBQUFBLElBQ3RDLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
