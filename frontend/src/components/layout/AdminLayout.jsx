import { useState, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import AccountsPage from '../pages/admin/AccountsPage'
import AdminInventoryPage from '../pages/admin/AdminInventoryPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminTransactionsPage from '../pages/admin/AdminTransactionsPage'
import AdminPricesPage from '../pages/admin/AdminPricesPage'

export default function AdminLayout({ user, onLogout }) {
  const [activePage, setActivePage] = useState('accounts')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (activePage) {
      case 'accounts':
        return <AccountsPage />
      case 'inventory':
        return <AdminInventoryPage />
      case 'products':
        return <AdminProductsPage />
      case 'prices':
        return <AdminPricesPage />
      case 'transactions':
        return <AdminTransactionsPage />
      default:
        return <AccountsPage />
    }
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAdmin={true}
      />

      <div className="flex-1 lg:ml-64">
        <TopBar
          user={user}
          onLogout={onLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
