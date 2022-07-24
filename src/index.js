import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./assets/tailwind/tailwind.css";
import App from "./App";
import "./index.css";

toast.configure({
  autoClose: 3000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
