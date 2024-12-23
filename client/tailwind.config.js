import theme from "@material-tailwind/react/theme";
import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-shadow": "inset 0 0 10px 0 rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        SFPro: ["SF Pro Display", "sans-serif"],
      },
      colors: {
        primary: "#00674F",
        secondary: "#C2A353",
        info: "#2F80ED",
        success: "#27AE60",
        error: "#EB5757",
        warning: "#E2B93B",
        text: "#464646",
        "disable-text": "#BDBDBD",
        "disable-line": "#EFEFEF",
        "disable-button": "#EFEFEF",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: false,
  },
});
