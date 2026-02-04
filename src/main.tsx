import { I18nProvider } from "@lingui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import i18n from "./i18n";
import "./global.css";
import Layout from "./components/Layout";
import DownloadPage from "./pages/Download";
import HomePage from "./pages/HomePage";
import InitPage from "./pages/InitPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<InitPage />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/download" element={<DownloadPage />} />
          </Route>
        </Routes>
      </Router>
    </I18nProvider>
  </React.StrictMode>,
);
