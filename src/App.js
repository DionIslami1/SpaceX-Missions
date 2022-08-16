import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import Home from './Home';
import Mission from './Mision';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Mission/:urlid" element={<Mission />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
