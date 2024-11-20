import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingDown, Lightbulb, Calculator, ArrowLeft } from 'lucide-react';

const Results = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const storedResults = localStorage.getItem('carbonResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        }
    }, []);

    if (!results) {
        return (
            <div className="container">
                <div className="card" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
                    <h2>No Results Found</h2>
                    <p>Please calculate your carbon footprint first.</p>
                    <Link to="/calculator" className="btn btn-primary">
                        <Calculator size={20} style={{ marginRight: '8px' }} />
                        Calculate Now
                    </Link>
                </div>
            </div>
        );
    }

    const { monthlyEmissions, yearlyEmissions, breakdown, recommendations } = results;

    // Prepare data for charts
    const pieData = [
        { name: 'Travel', value: breakdown.travel.total, color: '#3b82f6' },
        { name: 'Energy', value: breakdown.energy.total, color: '#f59e0b' },
        { name: 'Waste', value: breakdown.waste.netEmissions, color: '#10b981' },
        { name: 'Food', value: breakdown.food.emissions, color: '#ef4444' }
    ];

    const barData = [
        { category: 'Car', value: breakdown.travel.car, color: '#3b82f6' },
        { category: 'Public Transport', value: breakdown.travel.publicTransport, color: '#60a5fa' },
        { category: 'Flights', value: breakdown.travel.flights, color: '#1d4ed8' },
        { category: 'Electricity', value: breakdown.energy.total, color: '#f59e0b' },
        { category: 'Waste', value: breakdown.waste.netEmissions, color: '#10b981' },
        { category: 'Food', value: breakdown.food.emissions, color: '#ef4444' }
    ];

    const getEmissionLevel = (monthly) => {
        if (monthly < 500) return { level: 'Low', color: '#10b981', description: 'Excellent! Your carbon footprint is below average.' };
        if (monthly < 1000) return { level: 'Moderate', color: '#f59e0b', description: 'Good! You\'re doing well, but there\'s room for improvement.' };
        if (monthly < 1500) return { level: 'High', color: '#ef4444', description: 'Your carbon footprint is above average. Consider making changes.' };
        return { level: 'Very High', color: '#dc2626', description: 'Your carbon footprint is significantly above average. Immediate action recommended.' };
    };

    const emissionLevel = getEmissionLevel(monthlyEmissions);

    return (
        <div className="container">
            <div style={{ maxWidth: '1200px', margin: '40px auto' }}>
                {/* Header */}
                <div className="card">
                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <Link to="/calculator" className="btn btn-secondary">
                            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                            Back to Calculator
                        </Link>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ color: emissionLevel.color, marginBottom: '8px' }}>
                                {emissionLevel.level} Impact
                            </h2>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                {emissionLevel.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-2">
                        <div className="card" style={{ textAlign: 'center', background: '#f8fafc' }}>
                            <h3 style={{ color: '#333', marginBottom: '16px' }}>Monthly Emissions</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: emissionLevel.color, marginBottom: '8px' }}>
                                {monthlyEmissions.toFixed(1)}
                            </div>
                            <div style={{ color: '#666' }}>kg CO2/month</div>
                        </div>

                        <div className="card" style={{ textAlign: 'center', background: '#f8fafc' }}>
                            <h3 style={{ color: '#333', marginBottom: '16px' }}>Yearly Emissions</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: emissionLevel.color, marginBottom: '8px' }}>
                                {yearlyEmissions.toFixed(1)}
                            </div>
                            <div style={{ color: '#666' }}>kg CO2/year</div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-2">
                    <div className="card">
                        <h3 className="section-title">
                            <Leaf size={24} />
                            Emissions Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value.toFixed(1)} kg CO2`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card">
                        <h3 className="section-title">
                            <TrendingDown size={24} />
                            Detailed Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip formatter={(value) => `${value.toFixed(1)} kg CO2`} />
                                <Bar dataKey="value" fill="#667eea">
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="card">
                    <h3 className="section-title">
                        <Calculator size={24} />
                        Detailed Analysis
                    </h3>

                    <div className="grid grid-2">
                        <div>
                            <h4 style={{ color: '#3b82f6', marginBottom: '12px' }}>Travel Emissions</h4>
                            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Car:</span>
                                    <span>{breakdown.travel.car.toFixed(1)} kg CO2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Public Transport:</span>
                                    <span>{breakdown.travel.publicTransport.toFixed(1)} kg CO2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Flights:</span>
                                    <span>{breakdown.travel.flights.toFixed(1)} kg CO2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                                    <span>Total Travel:</span>
                                    <span>{breakdown.travel.total.toFixed(1)} kg CO2</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: '#f59e0b', marginBottom: '12px' }}>Energy Emissions</h4>
                            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Electricity:</span>
                                    <span>{breakdown.energy.electricity.toFixed(1)} kg CO2</span>
                                </div>
                                {breakdown.energy.efficiencyBonus > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#10b981' }}>
                                        <span>Efficiency Bonus:</span>
                                        <span>-{(breakdown.energy.electricity * breakdown.energy.efficiencyBonus).toFixed(1)} kg CO2</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                                    <span>Total Energy:</span>
                                    <span>{breakdown.energy.total.toFixed(1)} kg CO2</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: '#10b981', marginBottom: '12px' }}>Waste Emissions</h4>
                            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Total Waste:</span>
                                    <span>{breakdown.waste.totalWaste.toFixed(1)} kg CO2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#10b981' }}>
                                    <span>Recycling Reduction:</span>
                                    <span>-{(breakdown.waste.totalWaste * breakdown.waste.recyclingReduction).toFixed(1)} kg CO2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                                    <span>Net Waste:</span>
                                    <span>{breakdown.waste.netEmissions.toFixed(1)} kg CO2</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: '#ef4444', marginBottom: '12px' }}>Food Emissions</h4>
                            <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Diet Type:</span>
                                    <span style={{ textTransform: 'capitalize' }}>{breakdown.food.type}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Monthly Spending:</span>
                                    <span>${breakdown.food.spending}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                                    <span>Food Emissions:</span>
                                    <span>{breakdown.food.emissions.toFixed(1)} kg CO2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="card">
                    <h3 className="section-title">
                        <Lightbulb size={24} />
                        Recommendations
                    </h3>

                    {recommendations.length > 0 ? (
                        <div className="grid">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: '#667eea',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '600'
                                        }}>
                                            {index + 1}
                                        </div>
                                        <h4 style={{ color: '#333', margin: 0 }}>{rec.category}</h4>
                                    </div>
                                    <p style={{ color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>
                                        {rec.suggestion}
                                    </p>
                                    <div style={{
                                        background: '#10b981',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        display: 'inline-block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}>
                                        Potential Reduction: {rec.potentialReduction}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                            <Leaf size={48} color="#10b981" style={{ marginBottom: '16px' }} />
                            <h4>Great job!</h4>
                            <p>Your carbon footprint is already quite low. Keep up the good work!</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="card text-center">
                    <h3>What's Next?</h3>
                    <p style={{ color: '#666', marginBottom: '24px' }}>
                        Use these results to make informed decisions about your lifestyle choices.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/calculator" className="btn btn-primary">
                            <Calculator size={20} style={{ marginRight: '8px' }} />
                            Recalculate
                        </Link>
                        <Link to="/" className="btn btn-secondary">
                            <Leaf size={20} style={{ marginRight: '8px' }} />
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results; 