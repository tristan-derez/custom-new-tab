import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { StoriesContainer } from "./components/StoriesContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <StoriesContainer />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
