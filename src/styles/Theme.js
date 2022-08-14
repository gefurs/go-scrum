import ThemeProvider from "styled-components";

const theme = {
    colors: {
        orange: "#FF452B",
        lightOrange: "#FFC5BE",
        grey: "#8B8B8B",
        lightGrey: "#E5E5E5",
        superLightGrey: "#FAFAFA",
        black: "#000000",
        white: "#FFFFFF",
        red: "#FF452B",
        blue: "#007BFF",
        yellow: "#FBDE3F",
        green: "#1EC876",
    },
    viewport: {
        tablet: "768px",
        desktop: "1366px",
    },
}

export default theme;

export const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
}