import { useEffect, useState } from 'react'
import { fetchBranchPerformanceAnalysis } from '../../../services/api'
import BranchSalesAnalysisReport from './BranchSalesAnalysisReport'
import BranchComparisonReport from './BranchComparisonReport'
import TargetProgressAnalysisReport from './TargetProgressAnalysisReport'

function hasValidPayload(payload) {
  return Boolean(
    payload &&
    typeof payload === 'object' &&
    Array.isArray(payload.branchSalesAnalysis) &&
    Array.isArray(payload.branchComparisonReport) &&
    Array.isArray(payload.targetProgressAnalysisReport)
  )
}

export default function BranchPerformanceAnalysisInterface() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let mounted = true

    fetchBranchPerformanceAnalysis()
      .then((payload) => {
        if (!mounted) return
        if (!hasValidPayload(payload)) {
          setStatus('error')
          return
        }
        setData(payload)
        setStatus('success')
      })
      .catch(() => {
        if (mounted) setStatus('error')
      })

    return () => {
      mounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p role="status">Loading branch performance analysis...</p>
  }

  if (status === 'error') {
    return <p role="alert">Unable to load branch performance analysis.</p>
  }

  return (
    <section aria-label="Branch Performance Analysis Service">
      <h2>Branch Performance Analysis Service</h2>
      <BranchSalesAnalysisReport branchSalesAnalysis={data.branchSalesAnalysis} />
      <BranchComparisonReport branchComparisonReport={data.branchComparisonReport} />
      <TargetProgressAnalysisReport targetProgressAnalysisReport={data.targetProgressAnalysisReport} />
    </section>
  )
}
