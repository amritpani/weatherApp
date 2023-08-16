import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./Component/SearchPage";
import SearchResultPage from "./Component/SearchResultPage";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
