import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from './components/Authentication/PrivateRoute/PrivateRoute'
import PrivateRouteForAuth from './components/Authentication/PrivateRouteForAuth/PrivateRouteForAuth'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<PrivateRouteForAuth element={<Login />} />} />
          <Route exact path="/login" element={<PrivateRouteForAuth element={<Login />} />} />
          <Route path="/register" element={<PrivateRouteForAuth element={<Register />} />} />
          <Route path="/forgotPassword" element={<PrivateRouteForAuth element={<ForgotPassword />} />} />
          {/* Protected Route */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
