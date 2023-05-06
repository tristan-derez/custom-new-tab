import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { TopStories } from "./components/TopStories";

const queryClient = new QueryClient();

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
