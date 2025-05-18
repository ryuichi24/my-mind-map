import ReactDOM from "react-dom/client";
import { App } from "./App";
import { logger } from "./util/logger";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

logger.debug("Starting react app...");

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

logger.debug("react app started!");
