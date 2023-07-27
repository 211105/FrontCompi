import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MikroTikConnection from './MikroTikConnection ';
import DocumentView from './DocumentView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MikroTikConnection />} />
        <Route path="/document" element={<DocumentView />} />
      </Routes>
    </Router>
  );
};

export default App;
