import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import EmployeeDashboard from "./EmployeeDashboard";
import EmployeeList from "./EmployeeList";
import Sidebar from "./Sidebar";
import Attendance from "./Attendance";
import Tasks from "./Tasks";
import Settings from "./Settings";
import "./App.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ProtectedRoute from './ProtectedRoute';
import GlowingGrid from './components/GlowingGrid';
import GlowingGridDemo from './components/GlowingGridDemo';
import ScrollTest from './components/ScrollTest';

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Show hamburger only on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 700;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      {isMobile && (
        <button
          className="sidebar-toggle-btn"
          aria-label="Open sidebar"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      )}
      <div className="centered-page" style={{ marginLeft: isMobile ? 0 : 220, width: "100%", minHeight: "100vh" }}>
        <GlowingGrid variant="grid" intensity="medium" color="blue" speed="normal" opacity={0.3}>
          {children}
        </GlowingGrid>
      </div>
    </div>
  );
};

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";
  return isAuthPage ? (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  ) : (
    <MainLayout>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/grid-demo" element={<ProtectedRoute><GlowingGridDemo /></ProtectedRoute>} />
        <Route path="/scroll-test" element={<ProtectedRoute><ScrollTest /></ProtectedRoute>} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <AppRoutes />
        </Router>
      </LocalizationProvider>
    </>
  );
}

export default App;
