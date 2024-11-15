import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

import SRoutes from "./Routes";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SRoutes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
