import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/tailwind/tailwind.css";
import App from "./components/App/App";
import { AppProvider } from "./context/AppContext";
import { PageProvider } from "./context/PageContext";
import "./index.css";

toast.configure({
  autoClose: 3000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
});

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <PageProvider>
        <App />
      </PageProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
