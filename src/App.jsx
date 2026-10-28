import React, { useState } from 'react'

const lessons = [
  {
    title: 'Stock Basics',
    description: 'Learn what stocks are, how companies issue shares, and how public markets work.',
    level: 'Beginner',
    duration: '12 min'
  },
  {
    title: 'Market Orders',
    description: 'Understand market, limit, and stop orders to control trade execution and risk.',
    level: 'Beginner',
    duration: '18 min'
  },
  {
    title: 'Diversification',
    description: 'Discover how spreading investments across sectors reduces the impact of volatility.',
    level: 'Intermediate',
    duration: '16 min'
  },
  {
    title: 'Valuation',
    description: 'Use P/E ratios, earnings, and growth metrics to assess whether a stock is expensive.',
    level: 'Intermediate',
    duration: '20 min'
  }
]

const marketStats = [
  { label: 'S&P 500', value: '5,376', change: '+0.8%' },
  { label: 'Nasdaq', value: '17,214', change: '+1.1%' },
  { label: '10Y Treasury', value: '4.15%', change: '-0.07%' },
  { label: 'VIX', value: '13.6', change: '-1.4%' }
]

const watchlist = [
  { symbol: 'AAPL', name: 'Apple', price: 214.62, change: 1.82, sentiment: 'Strong demand' },
  { symbol: 'MSFT', name: 'Microsoft', price: 432.15, change: 0.94, sentiment: 'AI tailwind' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 128.4, change: 2.31, sentiment: 'Momentum' },
  { symbol: 'AMZN', name: 'Amazon', price: 185.7, change: -0.41, sentiment: 'Mixed' },
  { symbol: 'TSLA', name: 'Tesla', price: 219.09, change: 1.64, sentiment: 'Volatile' }
]

const quizQuestions = [
  {
    question: 'What does a company issue when it raises capital from the stock market?',
    choices: ['Bonds', 'Shares', 'Loans', 'Options'],
    answer: 'Shares'
  },
  {
    question: 'If stock prices fall sharply, which strategy often reduces risk?',
    choices: ['Concentrating in one stock', 'Diversifying your portfolio', 'Avoiding all investments', 'Buying only on margin'],
    answer: 'Diversifying your portfolio'
  },
  {
    question: 'What does a P/E ratio help investors compare?',
    choices: ['Company cash flow alone', 'Price relative to earnings', 'Dividend yield only', 'Interest rates'],
    answer: 'Price relative to earnings'
  },
  {
    question: 'Which order type is typically used to buy a stock only at or below a specific price?',
    choices: ['Market order', 'Limit order', 'Stop-loss order', 'Short sale'],
    answer: 'Limit order'
  }
]

const keyPrinciples = [
  'Start with a long-term mindset instead of chasing quick gains.',
  'Diversify across sectors and asset classes to manage risk.',
  'Focus on understanding business quality, valuation, and cash flow.',
  'Use risk controls like emergency funds and position sizing.'
]

const formatUSD = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)

export default function App() {
  const [cash, setCash] = useState(15000)
  const [holdings, setHoldings] = useState({ AAPL: 6, MSFT: 4 })
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const totalPortfolioValue = Object.entries(holdings).reduce((sum, [symbol, quantity]) => {
    const stock = watchlist.find((item) => item.symbol === symbol)
    return sum + (stock ? stock.price * quantity : 0)
  }, 0)

  const totalNetWorth = cash + totalPortfolioValue

  const buyStock = (symbol) => {
    const stock = watchlist.find((item) => item.symbol === symbol)
    if (!stock || stock.price > cash) return

    setCash((current) => current - stock.price)
    setHoldings((current) => ({
      ...current,
      [symbol]: (current[symbol] || 0) + 1
    }))
  }

  const sellStock = (symbol) => {
    const stock = watchlist.find((item) => item.symbol === symbol)
    if (!stock || !(holdings[symbol] > 0)) return

    setCash((current) => current + stock.price)
    setHoldings((current) => ({
      ...current,
      [symbol]: Math.max(0, (current[symbol] || 0) - 1)
    }))
  }

  const submitAnswer = (choice) => {
    const correctAnswer = quizQuestions[selectedQuestion].answer
    if (choice === correctAnswer) {
      setScore((current) => current + 1)
    }

    if (selectedQuestion < quizQuestions.length - 1) {
      setSelectedQuestion((current) => current + 1)
    } else {
      setQuizSubmitted(true)
    }
  }

  const resetQuiz = () => {
    setSelectedQuestion(0)
    setScore(0)
    setQuizSubmitted(false)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-name">MarketMinds</p>
            <span className="brand-tag">Academy</span>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#lessons">Lessons</a>
          <a href="#simulator">Simulator</a>
          <a href="#quiz">Quiz</a>
        </nav>

        <button className="primary-btn">Start Learning</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Invest smarter, not harder</span>
            <h1>Learn the stock market with confidence.</h1>
            <p>
              Build investing knowledge through interactive lessons, market insights, and hands-on portfolio practice.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Explore lessons</button>
              <button className="secondary-btn">View market pulse</button>
            </div>
            <div className="mini-stats">
              <div>
                <strong>12k+</strong>
                <span>learners</span>
              </div>
              <div>
                <strong>4 modules</strong>
                <span>core topics</span>
              </div>
              <div>
                <strong>97%</strong>
                <span>completion rate</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card market-card">
              <div className="panel-header">
                <span>Market overview</span>
                <span className="status-pill positive">Live</span>
              </div>

              <div className="market-grid">
                {marketStats.map((stat) => (
                  <div key={stat.label} className="market-stat">
                    <small>{stat.label}</small>
                    <strong>{stat.value}</strong>
                    <span className={stat.change.startsWith('-') ? 'negative' : 'positive'}>{stat.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="lessons" className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Learning path</span>
              <h2>Pick a concept to master</h2>
            </div>
            <button className="secondary-btn">See all modules</button>
          </div>

          <div className="lesson-grid">
            {lessons.map((lesson) => (
              <article className="lesson-card" key={lesson.title}>
                <div className="lesson-meta">
                  <span className="pill">{lesson.level}</span>
                  <span>{lesson.duration}</span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <button className="text-link">Start lesson</button>
              </article>
            ))}
          </div>
        </section>

        <section className="principles-panel">
          <div>
            <span className="eyebrow">Investor mindset</span>
            <h2>Smart investing principles</h2>
          </div>

          <ul className="principle-list">
            {keyPrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </section>

        <section id="simulator" className="simulator-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Practice desk</span>
              <h2>Mock portfolio simulator</h2>
            </div>
          </div>

          <div className="simulator-grid">
            <div className="portfolio-card">
              <p className="card-label">Portfolio snapshot</p>
              <div className="portfolio-total">
                <span>Total net worth</span>
                <strong>{formatUSD(totalNetWorth)}</strong>
              </div>

              <div className="portfolio-line">
                <span>Cash</span>
                <strong>{formatUSD(cash)}</strong>
              </div>
              <div className="portfolio-line">
                <span>Invested</span>
                <strong>{formatUSD(totalPortfolioValue)}</strong>
              </div>

              <div className="holding-list">
                {watchlist.map((stock) => {
                  const quantity = holdings[stock.symbol] || 0
                  return (
                    <div key={stock.symbol} className="holding-item">
                      <div>
                        <strong>{stock.symbol}</strong>
                        <small>{quantity} shares</small>
                      </div>
                      <div>
                        <strong>{formatUSD(stock.price * quantity || 0)}</strong>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="watchlist-card">
              <p className="card-label">Watchlist</p>
              {watchlist.map((stock) => (
                <div key={stock.symbol} className="stock-row">
                  <div>
                    <strong>{stock.symbol}</strong>
                    <small>{stock.name}</small>
                  </div>
                  <div className="stock-price">
                    <span>{formatUSD(stock.price)}</span>
                    <em className={stock.change >= 0 ? 'positive' : 'negative'}>{stock.change >= 0 ? '+' : ''}{stock.change}%</em>
                  </div>
                  <div className="stock-actions">
                    <button className="mini-btn buy" onClick={() => buyStock(stock.symbol)}>Buy</button>
                    <button className="mini-btn sell" onClick={() => sellStock(stock.symbol)}>Sell</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="quiz" className="quiz-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Knowledge check</span>
              <h2>Quick market quiz</h2>
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="quiz-card">
              <p className="question-index">Question {selectedQuestion + 1} / {quizQuestions.length}</p>
              <h3>{quizQuestions[selectedQuestion].question}</h3>

              <div className="answer-grid">
                {quizQuestions[selectedQuestion].choices.map((choice) => (
                  <button key={choice} className="answer-btn" onClick={() => submitAnswer(choice)}>
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-card result-card">
              <h3>Quiz complete</h3>
              <p>
                You scored <strong>{score}</strong> out of <strong>{quizQuestions.length}</strong>.
              </p>
              <button className="primary-btn" onClick={resetQuiz}>Retake quiz</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
