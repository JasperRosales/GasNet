import { useEffect, useState } from 'react'
import { getAIInsights } from '../../../services/aiService'

export default function AIInsightCards() {
  const [insights, setInsights] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let mounted = true
    getAIInsights()
      .then((data) => {
        if (mounted) {
          setInsights(data)
          setStatus('success')
        }
      })
      .catch(() => {
        if (mounted) setStatus('error')
      })
    return () => { mounted = false }
  }, [])

  if (status === 'loading') {
    return <p role="status">Loading AI insights...</p>
  }

  if (status === 'error') {
    return <p role="alert">Unable to load AI insights.</p>
  }

  return (
    <section aria-label="AI Insight Cards">
      <h2>AI Insight Cards</h2>
      <div>
        {insights.map((item) => (
          <article key={item.id} aria-label={`Insight: ${item.id}`}>
            <h3>Insight</h3>
            <p>{item.insight}</p>
            <h4>Recommendation</h4>
            <p>{item.recommendation}</p>
            <h4>Sales Trend</h4>
            <p>{item.trend}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
