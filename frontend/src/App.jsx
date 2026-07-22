import { useState } from 'react'
import LoginPage from './components/auth/LoginPage'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'
import HomePage from './pages/HomePage'
import POSPage from './pages/POSPage'
import AnalyticsPage from './pages/AnalyticsPage'
import InventoryPage from './pages/InventoryPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (user.role === 'Admin') {
    return <AdminLayout user={user} onLogout={handleLogout} />
  }

  return <POSLayout user={user} onLogout={handleLogout} />
}

function POSLayout({ user, onLogout }) {
  const [activePage, setActivePage] = useState('pos')

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage branchId={user.branch_id} />
      case 'pos':
        return <POSPage user={user} />
      case 'inventory':
        return <InventoryPage branchId={user.branch_id} />
      case 'analytics':
        return <AnalyticsPage branchId={user.branch_id} />
      case 'settings':
        return <SettingsPage user={user} />
      default:
        return <POSPage user={user} />
    }
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      activePage={activePage}
      onNavigate={setActivePage}
      branchId={user.branch_id}
    >
      {renderPage()}
    </DashboardLayout>
  )
}

export default App
