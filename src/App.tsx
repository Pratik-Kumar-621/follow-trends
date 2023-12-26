import React from "react";
import { data } from "./data/data";
import Fuse from "fuse.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Fashion from "./components/Fashion";
import "./assets/styles/app.scss";
export const fuse = new Fuse(data, { keys: ["name", "brandName"] });
const App: React.FC = () => {
  console.log(data);

  // console.log(fuse.search("Bespoke Steel Gloves"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
