/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // 这里的配置允许我们在代码中使用 animate-in, slide-in 等自定义动画类
        // 虽然我们在 App.jsx 的 GlobalStyles 中手动定义了一些 keyframes
        // 但保持 Tailwind 默认配置通常能覆盖大部分需求
      },
    },
    plugins: [],
  }