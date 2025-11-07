// React import is not required with automatic JSX runtime
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toast";
import { SocketProvider } from "./context/socketContext";
import { QueryProvider } from "./providers/QueryProvider";
import { routes } from "./routes";

// Create router instance
const router = createBrowserRouter(routes);

function App() {
  return (
    <SocketProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryProvider>
    </SocketProvider>
  );
}

export default App;
