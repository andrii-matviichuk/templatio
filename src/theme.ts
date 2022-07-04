import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// https://mui.com/customization/theming/#themes

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#6200EE',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: grey[50],
        },
      },
    },
  },
});

export default theme;
