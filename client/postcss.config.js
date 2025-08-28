import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [
    postcssImport(),
    tailwindcss(),
    autoprefixer(),
  ],
}