module.exports = {
  globDirectory: "../../www",
  globPatterns: [
    "*.{png,svg,jpg,txt,gif,css,js,ico,eot,ttf,woff,json, woff2}",
    "assets/*.{png,svg,jpg,ico,gif}",
    "**/*.{html,js,css,png,jpg,jpeg,svg,gif,json}",
    "*.{html, js,css}",
    "assets/i18n/*.json"
  ],
  globFollow: true, // follow symlinks
  globStrict: true, // fail on error
  globIgnores: [
    // Ignore Angular's ES5 bundles
    "**/*-es5.js*",
    "sw.js",
  ],
  // Don't need to cachebust angular files
  dontCacheBustURLsMatching: new RegExp(".+.[a-f0-9]{20}..+"),
  // Set large files to catch the angular vendor.js files. It is up to the developer to ensure the cache is not overwhelmed
  maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
  swDest: "../../www/sw.js",
  swSrc: "./swtemplate.js",
};
