import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorMainLayout from "./Components/Doctor/DoctorMainLayout";
import DoctorDashboard from "./Pages/Doctors/DoctorDashboard";
import DoctorLogin from "./Pages/Doctors/DoctorLogin";
import DoctorRegister from "./Pages/Doctors/DoctorRegister";

// Protected Route wrapper — driven by React state so logout instantly redirects
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/doctor/login" replace />;
  }
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Read auth state from localStorage on mount
    const token = localStorage.getItem("doctorToken");
    const doctorInfo = localStorage.getItem("doctorInfo");
    setIsAuthenticated(!!(token && doctorInfo));
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Called by DoctorSidebar after logout — clears auth state so ProtectedRoute redirects immediately
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Called after a successful login or registration
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading MediConnect Doctor Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/doctor/login" element={<DoctorLogin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/doctor/register" element={<DoctorRegister onLoginSuccess={handleLoginSuccess} />} />

        {/* Short-form aliases so /login and /register links still work */}
        <Route path="/login" element={<Navigate to="/doctor/login" replace />} />
        <Route path="/register" element={<Navigate to="/doctor/register" replace />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DoctorMainLayout onLogout={handleLogout}>
                <DoctorDashboard />
              </DoctorMainLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all for protected /doctor/* routes */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DoctorMainLayout onLogout={handleLogout}>
                <DoctorDashboard />
              </DoctorMainLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect root → dashboard (will be protected) */}
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />

        {/* Catch-all — redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/doctor/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;