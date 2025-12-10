export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#22c55e",
        accentSoft: "rgba(34,197,94,0.15)"
      },
      boxShadow: {
        card: "0 22px 45px rgba(0,0,0,0.55)"
      }
    }
  },
  plugins: []
};
