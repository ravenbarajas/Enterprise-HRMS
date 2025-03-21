import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/components.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")!).render(<App />);
