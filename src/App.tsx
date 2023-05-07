import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { TopStories } from "./components/TopStories";
import { SearchBar } from "./components/SearchBar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";

const queryClient = new QueryClient();

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <a
          href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox'
          className='gmail-link'
        >
          Gmail
        </a>
        <div className='main-container'>
          <Stack spacing={2}>
            <SearchBar />
            <QueryClientProvider client={queryClient}>
              <TopStories />
            </QueryClientProvider>
          </Stack>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
