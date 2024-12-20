import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-shadow": "inset 0 0 10px 0 rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
});