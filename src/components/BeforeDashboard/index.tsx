'use client'

import React from 'react'
import './index.scss'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="before-dashboard">
      <div className="welcome-message">
        <h2>Welcome to Prosumely Admin</h2>
        <p>Manage your job description keyword finder tool and monitor analytics.</p>
        <div className="quick-stats">
          <div className="stat-item">
            <h3>Keyword Extraction API</h3>
            <p>✅ Active and secured with rate limiting</p>
          </div>
          <div className="stat-item">
            <h3>Security Status</h3>
            <p>🛡️ All security measures active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard
