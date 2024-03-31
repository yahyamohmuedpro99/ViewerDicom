import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Componetnts/Header';
import DicomViewer from './Pages/dicomViewer';
import Home from './Pages/Home'; 
const Link1 = () => <h2>Link 1 Content</h2>;
const Link2 = () => <h2>Link 2 Content</h2>;

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/link1" element={<Link1 />} />
          <Route path="/analytics" element={<Link2 />} />
          <Route path="/annotate" element={<DicomViewer />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
