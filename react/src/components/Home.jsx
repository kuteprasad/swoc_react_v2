// Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <main className="dashboard-content">
        <section className="welcome-section">
          <h2>Welcome to the Dashboard</h2>
          <p>This is the main Dashboard page where you can see an overview of your activities and stats.</p>
        </section>
        <section className="stats-section">
          <h2>Quick Stats</h2>
          <div className="stats">
            <div className="stat">
              <h3>Users</h3>
              <p>1500</p>
            </div>
            <div className="stat">
              <h3>Sales</h3>
              <p>$12,000</p>
            </div>
            <div className="stat">
              <h3>Feedback</h3>
              <p>85%</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
