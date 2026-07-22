import { useEffect, useState } from 'react'
import { fetchSyncStatus } from '../services/api'

export default function SyncPage() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSyncStatus()
      .then((data) => { setStatus(data); setError(null) })
      .catch(() => setError('Unable to load sync status'))
      .finally(() => setLoading(false))
  }, [])

  const connectionStatus = status?.connectionStatus ?? 'unknown'
  const syncStatus = status?.syncStatus ?? 'unknown'
  const lastSync = status?.lastSync ?? null

  const isOnline = connectionStatus === 'online'
  const isSynced = syncStatus === 'synchronized'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sync Status</h1>
        <p className="text-sm text-slate-500 mt-1">Transaction synchronization across devices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatusCard label="Connection" loading={loading} error={error}>
          <StatusPill color={isOnline ? 'brand' : 'red'} text={connectionStatus} />
        </StatusCard>
        <StatusCard label="Sync Status" loading={loading} error={error}>
          <StatusPill color={isSynced ? 'brand' : 'amber'} text={syncStatus} />
        </StatusCard>
        <StatusCard label="Last Sync" loading={loading} error={error}>
          {error ? (
            <span className="text-slate-400 text-sm">N/A</span>
          ) : (
            <div className="text-sm font-medium text-slate-900">
              {lastSync ? new Date(lastSync).toLocaleString() : 'N/A'}
            </div>
          )}
        </StatusCard>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Transaction Synchronization</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-brand-50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <SyncRow label="Synchronization Status" value={syncStatus} synced={isSynced} />
            <SyncRow label="Connection Status" value={connectionStatus} synced={isOnline} />
            <SyncRow label="Last Synchronized" value={lastSync ? new Date(lastSync).toLocaleString() : 'Never'} synced={!!lastSync} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Connected Devices</h2>
        <div className="space-y-2">
          <DeviceRow name="Main Terminal (Bayan)" status="online" lastSeen="Now" />
          <DeviceRow name="Branch Terminal (Caloocan)" status="online" lastSeen="2 min ago" />
          <DeviceRow name="Branch Terminal (Sta. Teresita)" status="offline" lastSeen="15 min ago" />
          <DeviceRow name="Mobile Device (Marikina)" status="online" lastSeen="5 min ago" />
        </div>
      </div>
    </div>
  )
}

function StatusCard({ label, loading, error, children }) {
  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <div className="text-sm text-slate-500 mb-2">{label}</div>
      {loading ? (
        <div className="h-8 bg-brand-50 rounded animate-pulse" />
      ) : error ? (
        <StatusPill color="red" text="Offline" />
      ) : (
        children
      )}
    </div>
  )
}

function StatusPill({ color, text }) {
  const styles = {
    brand: 'bg-brand-50 text-brand-700 border border-brand-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    red: 'bg-red-50 text-red-700 border border-red-200',
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium capitalize ${styles[color]}`}>
      <span className={`w-2 h-2 rounded-full ${color === 'brand' ? 'bg-brand-500' : color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {text}
    </span>
  )
}

function SyncRow({ label, value, synced }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-brand-50/50 border border-brand-100/40">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-sm font-medium ${synced ? 'text-brand-600' : 'text-slate-700'}`}>{value}</span>
    </div>
  )
}

function DeviceRow({ name, status, lastSeen }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-brand-50/30 border border-brand-100/40 transition-colors">
      <div className={`w-2.5 h-2.5 rounded-full ${status === 'online' ? 'bg-brand-500' : 'bg-slate-300'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-700 truncate">{name}</div>
        <div className="text-xs text-slate-400">Last seen: {lastSeen}</div>
      </div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
        status === 'online' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
      }`}>
        {status}
      </span>
    </div>
  )
}
