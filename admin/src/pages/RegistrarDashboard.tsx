import { useState, useEffect } from 'react'
import { LayoutDashboard, User, Settings as SettingsIcon, BookOpen, FileText, GraduationCap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Profile from './Profile'
import SettingsPage from './Settings'
import { getProfile } from '../lib/authApi'
import type { ProfileResponse } from '../lib/authApi'
import './RegistrarDashboard.css'

type RegistrarView = 'dashboard' | 'students' | 'courses' | 'reports' | 'profile' | 'settings'

type RegistrarDashboardProps = {
  username: string
  onLogout: () => void
  onProfileUpdated?: (profile: ProfileResponse) => void
}

const REGISTRAR_NAV_ITEMS: { id: RegistrarView; label: string; icon: any }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Student Management', icon: GraduationCap },
  { id: 'courses', label: 'Course Management', icon: BookOpen },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function RegistrarDashboard({ username, onLogout, onProfileUpdated }: RegistrarDashboardProps) {
  const [view, setView] = useState<RegistrarView>('dashboard')
  const [profile, setProfile] = useState<ProfileResponse | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    
    getProfile()
      .then(setProfile)
      .catch(() => {
        // Fallback handled in JSX
      })

    return () => controller.abort()
  }, [])

  const handleProfileUpdated = (profile: ProfileResponse) => {
    setProfile(profile)
    onProfileUpdated?.(profile)
  }

  const renderContent = () => {
    switch (view) {
      case 'students':
        return <StudentManagement />
      case 'courses':
        return <CourseManagement />
      case 'reports':
        return <ReportsDashboard />
      case 'profile':
        return <Profile onProfileUpdated={handleProfileUpdated} />
      case 'settings':
        return <SettingsPage onProfileUpdated={handleProfileUpdated} onLogout={onLogout} />
      default:
        return <RegistrarHome />
    }
  }

  return (
    <div className="registrar-dashboard">
      <aside className="registrar-sidebar">
        <div className="registrar-sidebar-brand">
          <div className="brand-content">
            <div className="logo-container">
              <img 
                src="/Logo.jpg" 
                alt="West Coast College Logo" 
                className="sidebar-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = 'block'
                }}
              />
              <div className="logo-fallback-text" style={{ display: 'none' }}>
                WCC
              </div>
            </div>
            <div className="brand-text">
              <span className="sidebar-title">West Coast College</span>
              <span className="sidebar-tagline">Registrar Portal</span>
            </div>
          </div>
        </div>

        <nav className="registrar-sidebar-nav" aria-label="Registrar navigation">
          {REGISTRAR_NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`registrar-sidebar-link ${view === id ? 'registrar-sidebar-link-active' : ''}`}
              onClick={() => setView(id)}
              aria-current={view === id ? 'page' : undefined}
            >
              <Icon size={18} className="registrar-sidebar-icon" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="registrar-sidebar-footer">
          <div className="profile-section">
            <div className="profile-avatar">
              {profile?.avatar ? (
                <img 
                  src={profile.avatar.startsWith('data:') ? profile.avatar : `data:image/jpeg;base64,${profile.avatar}`} 
                  alt="Profile" 
                  className="profile-avatar-img"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  <User size={16} />
                </div>
              )}
            </div>
            <div className="profile-info">
              <div className="profile-name">
                {profile?.displayName || profile?.username || 'Registrar User'}
              </div>
              <div className="profile-role">Registrar</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="registrar-dashboard-body">
        <Navbar username={username} onLogout={onLogout} />
        <main className="registrar-dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

// Placeholder Components
function RegistrarHome() {
  return (
    <div className="registrar-home">
      <h2 className="registrar-welcome-title">Welcome to the Registrar Portal</h2>
      <p className="registrar-welcome-desc">Manage student records, courses, and generate reports from your dashboard.</p>
      
      <div className="registrar-quick-actions">
        <div className="quick-action-card">
          <GraduationCap size={32} className="quick-action-icon" />
          <h3>Student Management</h3>
          <p>Enroll new students and manage existing records</p>
        </div>
        <div className="quick-action-card">
          <BookOpen size={32} className="quick-action-icon" />
          <h3>Course Management</h3>
          <p>Create courses and manage class schedules</p>
        </div>
        <div className="quick-action-card">
          <FileText size={32} className="quick-action-icon" />
          <h3>Reports</h3>
          <p>Generate enrollment and academic reports</p>
        </div>
      </div>
    </div>
  )
}

function StudentManagement() {
  return (
    <div className="registrar-section">
      <h2 className="registrar-section-title">Student Management</h2>
      <p className="registrar-section-desc">Manage student admissions, enrollment, and academic records.</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h3>Student Admissions</h3>
          <p>Process new student applications and enrollments</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Student Records</h3>
          <p>View and update existing student information</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Enrollment Status</h3>
          <p>Check enrollment status and academic standing</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
      </div>
    </div>
  )
}

function CourseManagement() {
  return (
    <div className="registrar-section">
      <h2 className="registrar-section-title">Course Management</h2>
      <p className="registrar-section-desc">Create and manage courses, schedules, and class sections.</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h3>Course Catalog</h3>
          <p>Manage course offerings and descriptions</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Class Scheduling</h3>
          <p>Create and modify class schedules</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Section Assignment</h3>
          <p>Assign instructors and manage class capacity</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
      </div>
    </div>
  )
}

function ReportsDashboard() {
  return (
    <div className="registrar-section">
      <h2 className="registrar-section-title">Reports Dashboard</h2>
      <p className="registrar-section-desc">Generate and view reports on enrollment, academics, and more.</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h3>Enrollment Reports</h3>
          <p>View enrollment statistics by program and semester</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Academic Reports</h3>
          <p>Generate grade distributions and academic standing reports</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
        <div className="placeholder-card">
          <h3>Financial Reports</h3>
          <p>Tuition and fee collection reports</p>
          <button className="registrar-btn" disabled>Coming Soon</button>
        </div>
      </div>
    </div>
  )
}
