import '../../../styles/targetProgressIndicator.css'

export default function TargetProgressIndicator({ progressData }) {
  if (!progressData || progressData.length === 0) {
    return <div className="target-progress-indicator error">No progress data available</div>
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'achieved':
        return '✓'
      case 'on-track':
        return '→'
      case 'needs-attention':
        return '!'
      default:
        return '-'
    }
  }

  return (
    <div className="target-progress-indicator" data-testid="target-progress-indicator">
      <div className="progress-header">
        <h3>Target Progress Overview</h3>
        <p className="subtitle">Branch Performance Status</p>
      </div>
      <div className="progress-list">
        {progressData.map((item, index) => (
          <div key={`${item.name}-${index}`} className={`progress-item status-${item.status}`} data-testid={`progress-item-${index}`}>
            <div className="progress-info">
              <div className="branch-name">{item.name}</div>
              <div className="progress-details">
                <span className="sales">Sales: ₱{(item.sales / 1000).toFixed(0)}K</span>
                <span className="target">Target: ₱{(item.target / 1000).toFixed(0)}K</span>
                <span className={`gap ${item.gap < 0 ? 'surplus' : 'deficit'}`}>
                  {item.gap < 0 ? 'Surplus' : 'Gap'}: ₱{Math.abs(item.gap).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="progress-visual">
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{width: `${Math.min(item.progress, 100)}%`}}></div>
              </div>
              <div className="progress-text">
                <span className="percentage">{item.progress}%</span>
                <span className={`status-badge status-${item.status}`}>
                  {getStatusIcon(item.status)} {item.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
