import ReactDOM from "react-dom/client";
import { App } from "./App";
import { logger } from "./util/logger";
import "./style.css";

logger.debug("Starting react app...");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

logger.debug("react app started!");
