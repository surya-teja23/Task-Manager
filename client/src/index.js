import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import ContextProvider from "./context/ContextProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
