// React import is not required with automatic JSX runtime
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toast";
import { SignalRProvider } from "./context/signalRContext";
import { QueryProvider } from "./providers/QueryProvider";
import { routes } from "./routes";

// Create router instance
const router = createBrowserRouter(routes);

function App() {
  return (
    <SignalRProvider>
      <Toaster />
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </SignalRProvider>
  );
}

export default App;
