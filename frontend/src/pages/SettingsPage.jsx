export default function SettingsPage({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Account</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-xl uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900">{user?.name || 'User'}</div>
              <div className="text-sm text-slate-500">{user?.email || 'user@gasnet.local'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Application</h2>
        <div className="space-y-4">
          <SettingRow label="Application" value="GasNet — AI-Driven POS System" />
          <SettingRow label="Version" value="0.1.0" />
          <SettingRow label="Objective" value="AI-Based Decision Support and Business Analytics" />
          <SettingRow label="Organization" value="CJG LPG Trading" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Notifications</h2>
        <div className="space-y-4">
          <ToggleSetting label="Stock Alerts" description="Get notified when stock falls below minimum levels" defaultChecked />
          <ToggleSetting label="Sync Notifications" description="Notifications for synchronization events" defaultChecked />
          <ToggleSetting label="Delivery Updates" description="Track delivery status changes" defaultChecked={false} />
        </div>
      </div>
    </div>
  )
}

function SettingRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  )
}

function ToggleSetting({ label, description, defaultChecked = true }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-brand-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600 transition-colors duration-200" />
      </label>
    </div>
  )
}
