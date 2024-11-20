const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Carbon footprint calculation function
const calculateCarbonFootprint = (data) => {
    let totalEmissions = 0;
    const breakdown = {};

    // Travel calculations
    const carEmissions = data.carMiles * 0.404; // kg CO2 per mile
    const publicTransportEmissions = data.publicTransportHours * 0.14; // kg CO2 per hour
    const flightEmissions = data.flightHours * 90; // kg CO2 per hour of flight

    breakdown.travel = {
        car: carEmissions,
        publicTransport: publicTransportEmissions,
        flights: flightEmissions,
        total: carEmissions + publicTransportEmissions + flightEmissions
    };

    // Energy calculations
    const electricityEmissions = data.electricityUsage * getElectricityFactor(data.energySource);
    const efficiencyBonus = data.energyEfficient ? 0.15 : 0; // 15% reduction if energy efficient

    breakdown.energy = {
        electricity: electricityEmissions * (1 - efficiencyBonus),
        efficiencyBonus: efficiencyBonus,
        total: electricityEmissions * (1 - efficiencyBonus)
    };

    // Waste calculations
    const wasteEmissions = data.wasteKg * 0.5; // kg CO2 per kg of waste
    const recyclingReduction = data.recyclePercentage / 100;
    const netWasteEmissions = wasteEmissions * (1 - recyclingReduction);

    breakdown.waste = {
        totalWaste: wasteEmissions,
        recyclingReduction: recyclingReduction,
        netEmissions: netWasteEmissions
    };

    // Food calculations
    const foodEmissions = getFoodEmissions(data.foodType, data.foodSpending);

    breakdown.food = {
        type: data.foodType,
        spending: data.foodSpending,
        emissions: foodEmissions
    };

    // Calculate totals
    totalEmissions = breakdown.travel.total + breakdown.energy.total + breakdown.waste.netEmissions + breakdown.food.emissions;

    return {
        monthlyEmissions: totalEmissions,
        yearlyEmissions: totalEmissions * 12,
        breakdown: breakdown,
        recommendations: generateRecommendations(breakdown, totalEmissions)
    };
};

// Helper functions
const getElectricityFactor = (source) => {
    const factors = {
        'coal': 0.9,
        'natural-gas': 0.5,
        'nuclear': 0.02,
        'renewable': 0.05,
        'mixed': 0.6
    };
    return factors[source] || 0.6;
};

const getFoodEmissions = (type, spending) => {
    const baseEmissions = spending * 0.5; // kg CO2 per dollar
    const multipliers = {
        'omnivore': 1.0,
        'vegetarian': 0.7,
        'vegan': 0.5,
        'pescatarian': 0.8
    };
    return baseEmissions * (multipliers[type] || 1.0);
};

const generateRecommendations = (breakdown, totalEmissions) => {
    const recommendations = [];

    if (breakdown.travel.car > breakdown.travel.publicTransport * 2) {
        recommendations.push({
            category: 'Travel',
            suggestion: 'Consider using public transportation more frequently to reduce car emissions',
            potentialReduction: '20-30%'
        });
    }

    if (breakdown.energy.total > 500) {
        recommendations.push({
            category: 'Energy',
            suggestion: 'Switch to energy-efficient appliances and consider renewable energy sources',
            potentialReduction: '15-25%'
        });
    }

    if (breakdown.waste.recyclingReduction < 0.5) {
        recommendations.push({
            category: 'Waste',
            suggestion: 'Increase recycling efforts and reduce overall waste generation',
            potentialReduction: '10-20%'
        });
    }

    if (breakdown.food.type === 'omnivore') {
        recommendations.push({
            category: 'Food',
            suggestion: 'Consider reducing meat consumption or switching to plant-based options',
            potentialReduction: '20-40%'
        });
    }

    if (totalEmissions > 1000) {
        recommendations.push({
            category: 'General',
            suggestion: 'Your carbon footprint is above average. Consider implementing multiple changes for significant impact',
            potentialReduction: '30-50%'
        });
    }

    return recommendations;
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'CarbonWise API is running' });
});

app.post('/api/calculate', (req, res) => {
    try {
        const {
            carMiles = 0,
            publicTransportHours = 0,
            flightHours = 0,
            electricityUsage = 0,
            energySource = 'mixed',
            energyEfficient = false,
            wasteKg = 0,
            recyclePercentage = 0,
            foodType = 'omnivore',
            foodSpending = 0
        } = req.body;

        const result = calculateCarbonFootprint({
            carMiles,
            publicTransportHours,
            flightHours,
            electricityUsage,
            energySource,
            energyEfficient,
            wasteKg,
            recyclePercentage,
            foodType,
            foodSpending
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error calculating carbon footprint',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`CarbonWise server running on port ${PORT}`);
}); 