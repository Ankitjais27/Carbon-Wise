import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car, Bus, Plane, Zap, Trash2, Utensils, Calculator as CalculatorIcon } from 'lucide-react';

const Calculator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carMiles: '',
        publicTransportHours: '',
        flightHours: '',
        electricityUsage: '',
        energySource: 'mixed',
        energyEfficient: false,
        wasteKg: '',
        recyclePercentage: '',
        foodType: 'omnivore',
        foodSpending: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/calculate', formData);

            if (response.data.success) {
                // Store results in localStorage for the Results component
                localStorage.setItem('carbonResults', JSON.stringify(response.data.data));
                navigate('/results');
            }
        } catch (err) {
            setError('Error calculating carbon footprint. Please try again.');
            console.error('Calculation error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '800px', margin: '40px auto' }}>
                <div className="text-center mb-8">
                    <h1 className="section-title">
                        <CalculatorIcon size={32} />
                        Carbon Footprint Calculator
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>
                        Fill in the details below to calculate your monthly carbon emissions
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Travel Section */}
                    <div className="card">
                        <h2 className="section-title">
                            <Car size={24} />
                            Travel
                        </h2>

                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Car miles per month</label>
                                <input
                                    type="number"
                                    name="carMiles"
                                    value={formData.carMiles}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Public transport hours per month</label>
                                <input
                                    type="number"
                                    name="publicTransportHours"
                                    value={formData.publicTransportHours}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Flight hours per month</label>
                                <input
                                    type="number"
                                    name="flightHours"
                                    value={formData.flightHours}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Energy Section */}
                    <div className="card">
                        <h2 className="section-title">
                            <Zap size={24} />
                            Energy
                        </h2>

                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Monthly electricity usage (kWh)</label>
                                <input
                                    type="number"
                                    name="electricityUsage"
                                    value={formData.electricityUsage}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Primary energy source</label>
                                <select
                                    name="energySource"
                                    value={formData.energySource}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="mixed">Mixed/Grid</option>
                                    <option value="coal">Coal</option>
                                    <option value="natural-gas">Natural Gas</option>
                                    <option value="nuclear">Nuclear</option>
                                    <option value="renewable">Renewable (Solar/Wind)</option>
                                </select>
                            </div>
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                name="energyEfficient"
                                checked={formData.energyEfficient}
                                onChange={handleInputChange}
                                className="checkbox-input"
                                id="energyEfficient"
                            />
                            <label htmlFor="energyEfficient" style={{ cursor: 'pointer' }}>
                                Do you consider the energy efficiency of electronic devices?
                            </label>
                        </div>
                    </div>

                    {/* Waste Section */}
                    <div className="card">
                        <h2 className="section-title">
                            <Trash2 size={24} />
                            Waste
                        </h2>

                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Monthly waste in kg</label>
                                <input
                                    type="number"
                                    name="wasteKg"
                                    value={formData.wasteKg}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Recycling percentage</label>
                                <input
                                    type="number"
                                    name="recyclePercentage"
                                    value={formData.recyclePercentage}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Food Section */}
                    <div className="card">
                        <h2 className="section-title">
                            <Utensils size={24} />
                            Food Habits
                        </h2>

                        <div className="grid grid-2">
                            <div className="form-group">
                                <label className="form-label">Diet type</label>
                                <select
                                    name="foodType"
                                    value={formData.foodType}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="omnivore">Omnivore (Meat + Plants)</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="pescatarian">Pescatarian (Fish + Plants)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Monthly food spending ($)</label>
                                <input
                                    type="number"
                                    name="foodSpending"
                                    value={formData.foodSpending}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ fontSize: '1.1rem', padding: '16px 32px' }}
                        >
                            {loading ? 'Calculating...' : (
                                <>
                                    <CalculatorIcon size={20} style={{ marginRight: '8px' }} />
                                    Calculate Carbon Footprint
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Calculator; 