import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Calculator, BarChart3 } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '16px 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '1.5rem',
                        fontWeight: '700'
                    }}>
                        <Leaf size={32} color="#10b981" />
                        CarbonWise
                    </Link>

                    <div style={{
                        display: 'flex',
                        gap: '32px',
                        alignItems: 'center'
                    }}>
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/' ? '#667eea' : '#666',
                                fontWeight: location.pathname === '/' ? '600' : '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Leaf size={20} />
                            Home
                        </Link>
                        <Link
                            to="/calculator"
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/calculator' ? '#667eea' : '#666',
                                fontWeight: location.pathname === '/calculator' ? '600' : '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Calculator size={20} />
                            Calculator
                        </Link>
                        <Link
                            to="/results"
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === '/results' ? '#667eea' : '#666',
                                fontWeight: location.pathname === '/results' ? '600' : '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <BarChart3 size={20} />
                            Results
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 