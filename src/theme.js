import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",

    h1: { fontFamily: "Bebas Neue, sans-serif" },
    h2: { fontFamily: "Bebas Neue, sans-serif" },
    h3: { fontFamily: "Bebas Neue, sans-serif" },
    h4: { fontFamily: "Bebas Neue, sans-serif" }, //  banner title
    h5: { fontFamily: "Bebas Neue, sans-serif" },
    h6: { fontFamily: "Montserrat, sans-serif" },

    button: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },

    body1: { fontFamily: "Roboto, sans-serif" },
    body2: { fontFamily: "Roboto, sans-serif" , lineHeight: 1.4 },
  },
});

export default theme;
