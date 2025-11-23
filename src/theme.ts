import { createTheme, Paper, Anchor } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Montserrat",
  shadows: {
    md: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  components: {
    Paper: Paper.extend({
      styles: {
        root: { backgroundColor: "#fff", boxShadow: "var(--paper-shadow)" },
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "never",
      },
      styles: {
        root: {
          padding: 12
        }
      }
    })
  },
});
