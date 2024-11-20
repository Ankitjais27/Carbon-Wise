# CarbonWise - Carbon Footprint Calculator

A comprehensive web application that helps users calculate their carbon footprint and provides personalized recommendations to reduce their environmental impact.

## 🌱 Features

- **Interactive Calculator**: Calculate your monthly carbon emissions based on travel, energy, waste, and food habits
- **Detailed Breakdown**: View emissions by category with visual charts and graphs
- **Personalized Recommendations**: Get specific suggestions to reduce your carbon footprint
- **Beautiful UI**: Modern, responsive design with intuitive user experience
- **Real-time Calculations**: Instant results with detailed analysis

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📊 Calculation Categories

### Travel
- Car miles per month
- Public transport hours per month
- Flight hours per month

### Energy
- Monthly electricity usage (kWh)
- Primary energy source (Coal, Natural Gas, Nuclear, Renewable, Mixed)
- Energy efficiency considerations

### Waste
- Monthly waste in kg
- Recycling percentage

### Food Habits
- Diet type (Omnivore, Vegetarian, Vegan, Pescatarian)
- Monthly food spending

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CarbonWise
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 📁 Project Structure

```
CarbonWise/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Home.js
│   │   │   ├── Calculator.js
│   │   │   ├── Results.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Express server
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run install-all` - Install dependencies for all packages

### Backend (server/)
- `npm run dev` - Start server with nodemon (development)
- `npm start` - Start server (production)

### Frontend (client/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌍 API Endpoints

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "CarbonWise API is running"
}
```

### POST `/api/calculate`
Calculate carbon footprint

**Request Body:**
```json
{
  "carMiles": 500,
  "publicTransportHours": 20,
  "flightHours": 2,
  "electricityUsage": 800,
  "energySource": "mixed",
  "energyEfficient": true,
  "wasteKg": 50,
  "recyclePercentage": 60,
  "foodType": "omnivore",
  "foodSpending": 400
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "monthlyEmissions": 1200.5,
    "yearlyEmissions": 14406.0,
    "breakdown": {
      "travel": { "car": 202.0, "publicTransport": 2.8, "flights": 180.0, "total": 384.8 },
      "energy": { "electricity": 480.0, "efficiencyBonus": 0.15, "total": 408.0 },
      "waste": { "totalWaste": 25.0, "recyclingReduction": 0.6, "netEmissions": 10.0 },
      "food": { "type": "omnivore", "spending": 400, "emissions": 200.0 }
    },
    "recommendations": [...]
  }
}
```

## 🧮 How the Carbon Footprint is Calculated

The CarbonWise calculator estimates your carbon footprint using standard emission factors for each lifestyle input. Here’s how each category is calculated:

**Travel:**
- Car miles per month: `car miles × 0.404` (kg CO₂ per mile)
- Public transport hours per month: `public transport hours × 0.14` (kg CO₂ per hour)
- Flight hours per month: `flight hours × 90` (kg CO₂ per hour)

**Energy:**
- Monthly electricity usage (kWh): `electricity usage × emission factor` (kg CO₂ per kWh)
  - Emission factor depends on energy source:
    - Coal: 0.9
    - Natural Gas: 0.5
    - Nuclear: 0.02
    - Renewable: 0.05
    - Mixed/Grid: 0.6
- If you consider energy efficiency, your energy emissions are reduced by 15%.

**Waste:**
- Monthly waste in kg: `waste (kg) × 0.5` (kg CO₂ per kg)
- Recycling percentage: Your waste emissions are reduced by the percentage you recycle. For example, recycling 60% means only 40% of your waste counts toward emissions.

**Food Habits:**
- Monthly food spending: `food spending × 0.5 × diet multiplier` (kg CO₂)
  - Diet multipliers:
    - Omnivore: 1.0
    - Vegetarian: 0.7
    - Vegan: 0.5
    - Pescatarian: 0.8

**Total Emissions:**
- All the above emissions are added together to get your monthly total.
- Yearly emissions are simply `monthly total × 12`.

**Example:**
If you drive 500 miles, use 800 kWh of mixed electricity, produce 50 kg of waste (recycling 60%), and spend $400/month as an omnivore, your monthly emissions would be:
- Travel: 500 × 0.404 = 202 kg CO₂
- Energy: 800 × 0.6 = 480 kg CO₂ (reduced by 15% if energy efficient)
- Waste: 50 × 0.5 = 25 kg CO₂ (only 40% counts if recycling 60% → 10 kg CO₂)
- Food: 400 × 0.5 × 1.0 = 200 kg CO₂
- **Total:** 202 + 480 + 10 + 200 = 892 kg CO₂/month

The app also provides a breakdown and recommendations based on your highest emission categories.

## 🎨 Features Overview

### Home Page
- Educational content about carbon footprints
- Statistics and information about environmental impact
- Call-to-action to start calculating

### Calculator Page
- Comprehensive form with all input categories
- Real-time validation and user feedback
- Responsive design for all devices

### Results Page
- Visual charts (pie chart and bar chart)
- Detailed breakdown by category
- Personalized recommendations
- Monthly and yearly emission totals
- Impact level assessment

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Server-side validation
- **Error handling** - Comprehensive error management

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

### Backend Deployment
1. Set environment variables:
   ```bash
   PORT=5000
   NODE_ENV=production
   ```
2. Deploy to your Node.js hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Carbon emission factors based on scientific research
- Icons from Lucide React
- Charts powered by Recharts
- Built with modern web technologies for sustainability

---

**Make a difference today! Calculate your carbon footprint and start your journey towards a more sustainable future.** 🌱 