import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { TopStories } from "./components/TopStories";

const queryClient = new QueryClient();

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <TopStories />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
