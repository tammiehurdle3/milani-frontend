// **MANDATORY FIX: CommonJS syntax is required for a .cjs file extension.**
module.exports = {
  plugins: {
    // We are still explicitly using the plugin you installed to resolve the original Tailwind error.
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};