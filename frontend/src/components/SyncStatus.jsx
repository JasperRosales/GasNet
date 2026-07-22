import { useEffect, useState } from 'react'
import { fetchSyncStatus } from '../services/api'

function formatDate(iso) {
  if (!iso) return 'N/A'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function SyncStatus() {
  const [status, setStatus] = useState({ syncStatus: null, lastSync: null, connectionStatus: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchSyncStatus()
      .then((data) => {
        if (!mounted) return
        setStatus(data)
        setError(null)
      })
      .catch(() => {
        if (!mounted) return
        setError('Unable to load status')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const getStatusInfo = () => {
    if (loading) return { color: 'bg-slate-400', text: 'Loading', textColor: 'text-slate-400' }
    if (error) return { color: 'bg-red-400', text: 'Error', textColor: 'text-red-400' }
    if (status.connectionStatus === 'online' && status.syncStatus === 'synchronized')
      return { color: 'bg-brand-400', text: status.syncStatus, textColor: 'text-brand-400' }
    if (status.connectionStatus === 'offline')
      return { color: 'bg-red-400', text: 'Offline', textColor: 'text-red-400' }
    return { color: 'bg-amber-400', text: status.syncStatus || 'Unknown', textColor: 'text-amber-400' }
  }

  const { color, text, textColor } = getStatusInfo()

  return (
    <div className="space-y-2" data-testid="sync-status">
      <div className="flex items-center gap-2" data-testid="sync-indicator">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className={`text-xs font-medium ${textColor}`}>{text}</span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-white/40">Last Sync</span>
          <span className="text-white/60 font-medium" data-testid="last-sync">
            {loading ? '—' : error ? '—' : formatDate(status.lastSync)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">Connection</span>
          <span className="text-white/60 font-medium" data-testid="connection-status">
            {loading ? '—' : error ? 'Offline' : status.connectionStatus}
          </span>
        </div>
      </div>

      {error && <div className="text-xs text-red-400">{error}</div>}
    </div>
  )
}
