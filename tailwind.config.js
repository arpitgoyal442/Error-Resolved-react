module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				lightest: "#ffffff",
				light: "#e7e6e1",
				darkest: "#a9a9a9",
				highlight: "#008891",
			},
			margin: {
				navbar: "10vh",
			},
			padding: {
				navbar: "10vh",
			},
			height: {
				navbar: "10vh",
			},
		},
	},
	plugins: [],
};
