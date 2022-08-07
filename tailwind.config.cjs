/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // add daisyUI plugin
  plugins: [require("daisyui")],

  // daisyUI config (optional)
  daisyui: {
		themes: [
			{
				mytheme: {
          "primary": "#9db69c",
          "secondary": "#d9d4c1",
          "accent": "#fcd34d",
          "neutral": "#5e8562",
          "base-100": "#f2f1ed",
          "info": "#e7e2ce",
          "success": "#1A6B38",
          "warning": "#A76106",
          "error": "#EC7476",
        },
			},
		]
	},
};