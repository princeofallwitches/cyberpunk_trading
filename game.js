// Game State
const gameState = {
    cash: 50000,
    day: 1,
    portfolio: {},
    companies: [
        {
            ticker: 'SYNTH',
            name: 'SynthCorp Biomedical',
            sector: 'Cybernetics',
            basePrice: 245,
            currentPrice: 245,
            growthRate: 0.02, // 2% daily base growth
            volatility: 0.15,
            description: 'Leading manufacturer of cybernetic enhancements and synthetic organs',
            priceHistory: [{day: 1, price: 245}]
        },
        {
            ticker: 'HELOS',
            name: 'Helios Energy Solutions',
            sector: 'Energy',
            basePrice: 180,
            currentPrice: 180,
            growthRate: 0.015,
            volatility: 0.12,
            description: 'Controls fusion reactors and solar arrays across the Pacific Rim',
            priceHistory: [{day: 1, price: 180}]
        },
        {
            ticker: 'NNET',
            name: 'NeuralNet Systems',
            sector: 'AI/Tech',
            basePrice: 420,
            currentPrice: 420,
            growthRate: 0.03,
            volatility: 0.25,
            description: 'Quantum computing and neural interface technology pioneer',
            priceHistory: [{day: 1, price: 420}]
        },
        {
            ticker: 'APEX',
            name: 'Apex Consumer Group',
            sector: 'Retail',
            basePrice: 95,
            currentPrice: 95,
            growthRate: 0.01,
            volatility: 0.08,
            description: 'Megacity retail conglomerate controlling essential goods distribution',
            priceHistory: [{day: 1, price: 95}]
        },
        {
            ticker: 'GRDN',
            name: 'Guardian Security Dynamics',
            sector: 'Security',
            basePrice: 310,
            currentPrice: 310,
            growthRate: 0.018,
            volatility: 0.18,
            description: 'Private military contractor and automated law enforcement provider',
            priceHistory: [{day: 1, price: 310}]
        }
    ],
    newsHistory: [],
    currentStock: null
};

// News Event Templates
const newsEvents = [
    // SynthCorp (SYNTH) Events
    {
        company: 'SYNTH',
        templates: [
            { text: 'SynthCorp announces breakthrough in neural implant technology', impact: 0.15, growthChange: 0.01, sentiment: 'positive' },
            { text: 'FDA equivalent approves SynthCorp\'s new synthetic heart', impact: 0.12, growthChange: 0.008, sentiment: 'positive' },
            { text: 'SynthCorp faces lawsuit over faulty cybernetic limbs', impact: -0.18, growthChange: -0.012, sentiment: 'negative' },
            { text: 'Competitors challenge SynthCorp\'s organ synthesis patents', impact: -0.10, growthChange: -0.005, sentiment: 'negative' },
            { text: 'SynthCorp expands production facilities in Neo-Tokyo', impact: 0.08, growthChange: 0.004, sentiment: 'positive' },
            { text: 'Black market synthetic organs traced to SynthCorp supply chain', impact: -0.22, growthChange: -0.015, sentiment: 'negative' },
            { text: 'SynthCorp reports record quarterly earnings', impact: 0.10, growthChange: 0.006, sentiment: 'positive' }
        ]
    },
    // Helios (HELOS) Events
    {
        company: 'HELOS',
        templates: [
            { text: 'Helios fusion reactor achieves 99.9% efficiency milestone', impact: 0.20, growthChange: 0.012, sentiment: 'positive' },
            { text: 'Solar flare damages Helios orbital array', impact: -0.15, growthChange: -0.008, sentiment: 'negative' },
            { text: 'Helios signs exclusive contract with megacity governments', impact: 0.18, growthChange: 0.010, sentiment: 'positive' },
            { text: 'Environmental activists sabotage Helios reactor', impact: -0.12, growthChange: -0.006, sentiment: 'negative' },
            { text: 'Helios announces plans for lunar solar farm', impact: 0.14, growthChange: 0.009, sentiment: 'positive' },
            { text: 'Power outage in Pacific Rim blamed on Helios grid failure', impact: -0.25, growthChange: -0.018, sentiment: 'negative' },
            { text: 'Helios invests in experimental antimatter research', impact: 0.08, growthChange: 0.005, sentiment: 'neutral' }
        ]
    },
    // NeuralNet (NNET) Events
    {
        company: 'NNET',
        templates: [
            { text: 'NeuralNet AI achieves sentience, passes Turing test', impact: 0.30, growthChange: 0.020, sentiment: 'positive' },
            { text: 'NeuralNet\'s quantum computer suffers catastrophic failure', impact: -0.28, growthChange: -0.022, sentiment: 'negative' },
            { text: 'Government contracts NeuralNet for national defense AI', impact: 0.22, growthChange: 0.015, sentiment: 'positive' },
            { text: 'NeuralNet AI accused of manipulating financial markets', impact: -0.20, growthChange: -0.012, sentiment: 'negative' },
            { text: 'NeuralNet launches revolutionary brain-cloud interface', impact: 0.25, growthChange: 0.018, sentiment: 'positive' },
            { text: 'Hackers breach NeuralNet\'s neural network database', impact: -0.24, growthChange: -0.016, sentiment: 'negative' },
            { text: 'NeuralNet partners with entertainment megacorps for VR integration', impact: 0.12, growthChange: 0.007, sentiment: 'positive' }
        ]
    },
    // Apex (APEX) Events
    {
        company: 'APEX',
        templates: [
            { text: 'Apex opens 500 new automated stores across megacities', impact: 0.10, growthChange: 0.005, sentiment: 'positive' },
            { text: 'Food contamination scandal rocks Apex distribution centers', impact: -0.16, growthChange: -0.010, sentiment: 'negative' },
            { text: 'Apex acquires remaining independent grocery chains', impact: 0.14, growthChange: 0.008, sentiment: 'positive' },
            { text: 'Workers riot at Apex warehouses demanding better conditions', impact: -0.12, growthChange: -0.006, sentiment: 'negative' },
            { text: 'Apex introduces drone delivery to every megacity district', impact: 0.11, growthChange: 0.006, sentiment: 'positive' },
            { text: 'Apex accused of monopolistic practices, faces investigation', impact: -0.18, growthChange: -0.012, sentiment: 'negative' },
            { text: 'Apex reports steady growth in essential goods market', impact: 0.06, growthChange: 0.003, sentiment: 'positive' }
        ]
    },
    // Guardian (GRDN) Events
    {
        company: 'GRDN',
        templates: [
            { text: 'Guardian deploys new autonomous police drones in 12 cities', impact: 0.16, growthChange: 0.010, sentiment: 'positive' },
            { text: 'Guardian combat drones malfunction, civilian casualties reported', impact: -0.30, growthChange: -0.020, sentiment: 'negative' },
            { text: 'Guardian wins billion-yuan military contract', impact: 0.20, growthChange: 0.014, sentiment: 'positive' },
            { text: 'International court investigates Guardian for war crimes', impact: -0.22, growthChange: -0.015, sentiment: 'negative' },
            { text: 'Guardian unveils next-gen powered armor suits', impact: 0.18, growthChange: 0.012, sentiment: 'positive' },
            { text: 'Guardian security forces accused of excessive force in protests', impact: -0.14, growthChange: -0.008, sentiment: 'negative' },
            { text: 'Guardian expands private security to corporate districts', impact: 0.10, growthChange: 0.006, sentiment: 'positive' }
        ]
    },
    // Market-wide events
    {
        company: 'MARKET',
        templates: [
            { text: 'Global economic summit predicts sustained growth', impact: 0.08, growthChange: 0.002, sentiment: 'positive' },
            { text: 'Megacity tensions rise, investors flee to safe havens', impact: -0.12, growthChange: -0.004, sentiment: 'negative' },
            { text: 'New cryptocurrency regulation stabilizes markets', impact: 0.06, growthChange: 0.001, sentiment: 'neutral' },
            { text: 'Climate disaster disrupts Pacific Rim trade routes', impact: -0.15, growthChange: -0.006, sentiment: 'negative' },
            { text: 'Corporate tax reforms boost megacorp profitability', impact: 0.10, growthChange: 0.003, sentiment: 'positive' }
        ]
    }
];

// Initialize game
function init() {
    updateDisplay();
    renderStocks();

    document.getElementById('advance-day').addEventListener('click', advanceDay);

    // Trade Modal controls
    const tradeModal = document.getElementById('trade-modal');
    const tradeCloseBtn = tradeModal.getElementsByClassName('close')[0];

    tradeCloseBtn.onclick = function() {
        tradeModal.style.display = 'none';
    }

    // Chart Modal controls
    const chartModal = document.getElementById('chart-modal');
    const chartCloseBtn = chartModal.getElementsByClassName('chart-close')[0];

    chartCloseBtn.onclick = function() {
        chartModal.style.display = 'none';
    }

    // Click outside modal to close
    window.onclick = function(event) {
        if (event.target == tradeModal) {
            tradeModal.style.display = 'none';
        }
        if (event.target == chartModal) {
            chartModal.style.display = 'none';
        }
    }

    document.getElementById('buy-btn').addEventListener('click', () => executeTrade('buy'));
    document.getElementById('sell-btn').addEventListener('click', () => executeTrade('sell'));
}

// Update display
function updateDisplay() {
    document.getElementById('cash').textContent = `¥${gameState.cash.toLocaleString()}`;
    document.getElementById('current-day').textContent = gameState.day;

    let portfolioValue = 0;
    gameState.companies.forEach(company => {
        const shares = gameState.portfolio[company.ticker] || 0;
        portfolioValue += shares * company.currentPrice;
    });

    document.getElementById('portfolio-value').textContent = `¥${portfolioValue.toLocaleString()}`;
}

// Render stocks
function renderStocks() {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '';

    gameState.companies.forEach(company => {
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';

        const changePercent = ((company.currentPrice - company.basePrice) / company.basePrice) * 100;
        const changeClass = changePercent > 0 ? 'positive' : changePercent < 0 ? 'negative' : 'neutral';
        const changeSymbol = changePercent > 0 ? '▲' : changePercent < 0 ? '▼' : '●';

        const owned = gameState.portfolio[company.ticker] || 0;

        stockItem.innerHTML = `
            <div class="ticker">${company.ticker}</div>
            <div class="company-name">${company.name}</div>
            <div class="price">¥${company.currentPrice.toFixed(2)}</div>
            <div class="change ${changeClass}">${changeSymbol} ${Math.abs(changePercent).toFixed(2)}%</div>
            <div class="owned">${owned}</div>
            <div class="stock-actions">
                <button class="trade-btn" onclick="openTradeModal('${company.ticker}')">TRADE</button>
                <button class="chart-btn" onclick="openChartModal('${company.ticker}')">CHART</button>
            </div>
        `;

        stocksList.appendChild(stockItem);
    });
}

// Open trade modal
function openTradeModal(ticker) {
    gameState.currentStock = gameState.companies.find(c => c.ticker === ticker);
    const modal = document.getElementById('trade-modal');

    document.getElementById('modal-title').textContent = `TRADE ${ticker}`;
    document.getElementById('modal-info').innerHTML = `
        <strong>${gameState.currentStock.name}</strong><br>
        ${gameState.currentStock.description}<br><br>
        Current Price: ¥${gameState.currentStock.currentPrice.toFixed(2)}<br>
        You own: ${gameState.portfolio[ticker] || 0} shares
    `;

    document.getElementById('trade-amount').value = 1;
    document.getElementById('trade-result').textContent = '';

    modal.style.display = 'block';
}

// Execute trade
function executeTrade(action) {
    const amount = parseInt(document.getElementById('trade-amount').value);
    const resultDiv = document.getElementById('trade-result');

    if (!amount || amount < 1) {
        resultDiv.textContent = 'Invalid amount';
        resultDiv.style.color = '#ff0066';
        return;
    }

    const stock = gameState.currentStock;
    const cost = stock.currentPrice * amount;

    if (action === 'buy') {
        if (cost > gameState.cash) {
            resultDiv.textContent = 'Insufficient funds';
            resultDiv.style.color = '#ff0066';
            return;
        }

        gameState.cash -= cost;
        gameState.portfolio[stock.ticker] = (gameState.portfolio[stock.ticker] || 0) + amount;

        resultDiv.textContent = `Purchased ${amount} shares for ¥${cost.toFixed(2)}`;
        resultDiv.style.color = '#00ff88';
    } else if (action === 'sell') {
        const owned = gameState.portfolio[stock.ticker] || 0;
        if (amount > owned) {
            resultDiv.textContent = 'Insufficient shares';
            resultDiv.style.color = '#ff0066';
            return;
        }

        gameState.cash += cost;
        gameState.portfolio[stock.ticker] = owned - amount;

        resultDiv.textContent = `Sold ${amount} shares for ¥${cost.toFixed(2)}`;
        resultDiv.style.color = '#00ff88';
    }

    updateDisplay();
    renderStocks();
}

// Advance to next day
function advanceDay() {
    gameState.day++;

    // Generate news events (1-3 events per day)
    const numEvents = Math.floor(Math.random() * 3) + 1;
    const todaysNews = [];

    for (let i = 0; i < numEvents; i++) {
        const newsCategory = newsEvents[Math.floor(Math.random() * newsEvents.length)];
        const event = newsCategory.templates[Math.floor(Math.random() * newsCategory.templates.length)];

        todaysNews.push({
            company: newsCategory.company,
            ...event
        });
    }

    // Apply news impacts
    todaysNews.forEach(news => {
        if (news.company === 'MARKET') {
            // Apply to all companies
            gameState.companies.forEach(company => {
                applyNewsImpact(company, news);
            });
        } else {
            // Apply to specific company
            const company = gameState.companies.find(c => c.ticker === news.company);
            if (company) {
                applyNewsImpact(company, news);
            }
        }
    });

    // Apply daily growth/volatility and record price history
    gameState.companies.forEach(company => {
        const randomFactor = (Math.random() - 0.5) * company.volatility;
        const dailyChange = company.growthRate + randomFactor;
        company.currentPrice *= (1 + dailyChange);
        company.currentPrice = Math.max(company.currentPrice, 1); // Prevent negative prices

        // Record price in history
        company.priceHistory.push({
            day: gameState.day,
            price: company.currentPrice
        });
    });

    // Display news
    displayNews(todaysNews);

    // Update UI
    updateDisplay();
    renderStocks();
}

// Apply news impact to company
function applyNewsImpact(company, news) {
    // Immediate price jump
    company.currentPrice *= (1 + news.impact);

    // Modify growth rate
    company.growthRate += news.growthChange;

    // Prevent extreme growth rates
    company.growthRate = Math.max(-0.05, Math.min(0.05, company.growthRate));
}

// Display news
function displayNews(newsArray) {
    const newsFeed = document.getElementById('news-feed');

    newsArray.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = `news-item ${news.sentiment}`;

        const affectedCompany = news.company === 'MARKET' ? 'MARKET-WIDE' : news.company;

        newsItem.innerHTML = `
            <span class="news-date">DAY ${gameState.day}</span>
            <span class="news-text">[${affectedCompany}] ${news.text}</span>
        `;

        newsFeed.insertBefore(newsItem, newsFeed.firstChild);
    });

    // Keep only last 50 news items
    while (newsFeed.children.length > 50) {
        newsFeed.removeChild(newsFeed.lastChild);
    }
}

// Open chart modal
function openChartModal(ticker) {
    const company = gameState.companies.find(c => c.ticker === ticker);
    if (!company) return;

    const modal = document.getElementById('chart-modal');
    document.getElementById('chart-title').textContent = `${company.name} (${ticker}) - PRICE HISTORY`;

    // Calculate statistics
    const prices = company.priceHistory.map(h => h.price);
    const startPrice = prices[0];
    const currentPrice = prices[prices.length - 1];
    const highPrice = Math.max(...prices);
    const lowPrice = Math.min(...prices);
    const totalChange = ((currentPrice - startPrice) / startPrice) * 100;

    // Update stats display
    document.getElementById('chart-start-price').textContent = `¥${startPrice.toFixed(2)}`;
    document.getElementById('chart-current-price').textContent = `¥${currentPrice.toFixed(2)}`;
    document.getElementById('chart-high-price').textContent = `¥${highPrice.toFixed(2)}`;
    document.getElementById('chart-low-price').textContent = `¥${lowPrice.toFixed(2)}`;

    const changeElement = document.getElementById('chart-total-change');
    changeElement.textContent = `${totalChange >= 0 ? '▲' : '▼'} ${Math.abs(totalChange).toFixed(2)}%`;
    changeElement.style.color = totalChange >= 0 ? '#00ff88' : '#ff0066';

    // Draw the chart
    drawChart(company);

    modal.style.display = 'block';
}

// Draw price chart
function drawChart(company) {
    const canvas = document.getElementById('price-chart');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, width, height);

    const history = company.priceHistory;
    if (history.length < 2) {
        // Not enough data to draw chart
        ctx.fillStyle = '#00ff88';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('Not enough data. Advance a few days to see chart.', width / 2, height / 2);
        return;
    }

    // Calculate chart dimensions
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Get price range
    const prices = history.map(h => h.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

    // Draw grid lines
    ctx.strokeStyle = '#003322';
    ctx.lineWidth = 1;

    // Horizontal grid lines (price levels)
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight * i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        // Price labels
        const price = maxPrice - (priceRange * i / 5);
        ctx.fillStyle = '#00aa66';
        ctx.font = '12px Courier New';
        ctx.textAlign = 'right';
        ctx.fillText(`¥${price.toFixed(2)}`, padding - 5, y + 4);
    }

    // Vertical grid lines (days)
    const dayStep = Math.max(1, Math.floor(history.length / 10));
    for (let i = 0; i < history.length; i += dayStep) {
        const x = padding + (chartWidth * i / (history.length - 1));
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();

        // Day labels
        ctx.fillStyle = '#00aa66';
        ctx.font = '12px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(`D${history[i].day}`, x, height - padding + 20);
    }

    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;

    for (let i = 0; i < history.length; i++) {
        const x = padding + (chartWidth * i / (history.length - 1));
        const normalizedPrice = (history[i].price - minPrice) / priceRange;
        const y = padding + chartHeight - (normalizedPrice * chartHeight);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Draw area under the line
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#00ff88';
    for (let i = 0; i < history.length; i++) {
        const x = padding + (chartWidth * i / (history.length - 1));
        const normalizedPrice = (history[i].price - minPrice) / priceRange;
        const y = padding + chartHeight - (normalizedPrice * chartHeight);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw current price indicator
    const lastPrice = prices[prices.length - 1];
    const lastNormalizedPrice = (lastPrice - minPrice) / priceRange;
    const lastY = padding + chartHeight - (lastNormalizedPrice * chartHeight);

    ctx.strokeStyle = '#ff0066';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, lastY);
    ctx.lineTo(width - padding, lastY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current price label
    ctx.fillStyle = '#ff0066';
    ctx.font = 'bold 14px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(`Current: ¥${lastPrice.toFixed(2)}`, width - padding + 5, lastY + 4);
}

// Start game when page loads
window.addEventListener('load', init);
