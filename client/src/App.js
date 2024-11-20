import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Calculator from './components/Calculator';
import Results from './components/Results';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App; 