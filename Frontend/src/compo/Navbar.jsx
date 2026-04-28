import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Zap, LogOut, LogIn, Info, Sparkles } from 'lucide-react'
import { getBackendURL } from '../utils/apiConfig'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookies = document.cookie
    setIsAuthenticated(cookies && cookies.trim().length > 0)
  }, [])

  if (location.pathname === '/login') {
    return null
  }

  const handleLogout = async () => {
    try {
      const backendURL = getBackendURL();
      const response = await fetch(`${backendURL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  // ADDED: Insights to the navigation array
  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: Zap },
    { label: 'Insights', path: '/insights', icon: Sparkles },
    { label: 'About', path: '/about', icon: Info },
  ]

  return (
    <nav className='w-full bg-[#0B1120] border-b border-gray-800/80 sticky top-0 z-50 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          
          {/* Logo */}
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
            <Zap size={22} className='text-[#34D399]' fill="currentColor" />
            <span className='text-xl font-bold text-white tracking-wide'>
              SolarGrid
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-[#064E3B]/40 text-[#34D399] font-medium border-b-2 border-[#34D399] rounded-b-none' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#111827]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Login/Logout */}
          <div className='flex items-center gap-3'>
            <button
              onClick={isAuthenticated ? handleLogout : () => navigate('/login')}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isAuthenticated
                  ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                  : 'bg-[#064E3B]/20 border border-[#10B981]/30 text-[#34D399] hover:bg-[#064E3B]/40'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <LogOut size={18} />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar