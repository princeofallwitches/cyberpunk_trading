# Cyberpunk Stock Trader 2087

A dystopian stock trading game set in a cyberpunk future where you invest in fictional megacorporations.

## The Five Megacorporations

### 1. SynthCorp Biomedical (SYNTH)
**Sector:** Cybernetics & Biotech
**Starting Price:** ¥245
Leading manufacturer of cybernetic enhancements, synthetic organs, and life-extension treatments. High growth potential but volatile.

### 2. Helios Energy Solutions (HELOS)
**Sector:** Energy Infrastructure
**Starting Price:** ¥180
Controls 60% of the Pacific Rim's fusion reactors and solar arrays. Steady growth with moderate volatility.

### 3. NeuralNet Systems (NNET)
**Sector:** AI & Technology
**Starting Price:** ¥420
Pioneers in AI, quantum computing, and neural interface technology. Highest growth and highest risk.

### 4. Apex Consumer Group (APEX)
**Sector:** Retail & Distribution
**Starting Price:** ¥95
Mega-retailer controlling food distribution, housing, and essential goods across megacities. Most stable with lower growth.

### 5. Guardian Security Dynamics (GRDN)
**Sector:** Private Military & Security
**Starting Price:** ¥310
Private military contractor and automated law enforcement provider. Good growth with significant volatility.

## How to Play

1. **Open `index.html` in a web browser**
2. **Starting Capital:** You begin with ¥50,000
3. **Buy/Sell Stocks:** Click "TRADE" next to any company to buy or sell shares
4. **Read the News:** News events appear in the feed and affect stock prices
5. **Advance Days:** Click "ADVANCE TO NEXT DAY" to progress time
6. **Watch Your Portfolio:** Track your total value (cash + stocks)

## Game Mechanics

### Stock Price Changes
- Each company has a **base growth rate** (daily percentage increase)
- Prices fluctuate with **volatility** (random daily variations)
- **News events** cause immediate price jumps and modify future growth rates

### News Events
- 1-3 news events occur each day
- Events can be **positive** (green), **negative** (red), or **neutral** (yellow)
- Company-specific events affect individual stocks
- Market-wide events affect all companies
- News impacts both immediate price and ongoing growth trajectory

### Strategy Tips
- **High risk, high reward:** NNET has the highest growth but most volatility
- **Stability:** APEX offers steady, predictable returns
- **Diversify:** Spread investments across sectors to reduce risk
- **Watch the news:** React quickly to major events
- **Long-term growth:** Companies with modified growth rates compound over time

## File Structure

```
cyberpunk_trading/
├── index.html      # Main game interface
├── style.css       # Cyberpunk-themed styling
├── game.js         # Game logic and mechanics
└── README.md       # This file
```

## Running the Game

Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

No server or build process required - it's a pure client-side web application.

## Features

- 5 unique megacorporations with distinct characteristics
- Dynamic news generation system with 40+ event templates
- Real-time stock price calculations
- Portfolio tracking and management
- Cyberpunk-themed UI with neon aesthetics
- Responsive design for various screen sizes
- Persistent game state during session

---

*"In Night City, you can be come anything... except solvent."*
