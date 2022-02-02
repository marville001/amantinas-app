import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

const App = () => {
  return (
      <div className="bg-[#effafb] min-h-screen">
          <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
          </Routes>
      </div>
  );
};

export default App;
