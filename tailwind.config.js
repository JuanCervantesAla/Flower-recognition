const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}",
	  flowbite.content(),
	],
	theme: {
	  extend: {
		colors: {
			'neutralSilver': '#F5F7FA',
			'neutralDGrey': '#4D4D4D',
			'brandPrimary': '#008c9a',
			'neutralGrey': '#717171',
			'gray900': '#18191F',
		}
	  },
	},
	plugins: [
		flowbite.plugin(),
	],
  }
  