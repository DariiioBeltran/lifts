import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OutlinesPage from "./pages/Outlines/OutlinesPage";
import StatsPage from "./pages/Stats/StatsPage";
import LoggingPage from "./pages/Logging/LoggingPage";
import NotFound from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RecordsPage from "./pages/Records/RecordsPage";
import ExercisesPage from "./pages/Exercises/ExercisesPage";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <RegisterPage />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/outlines" element={
          <ProtectedRoute>
            <OutlinesPage />
          </ProtectedRoute>
        } />
        <Route path="/stats/:notional_exercise_id" element={
          <ProtectedRoute>
            <StatsPage />
          </ProtectedRoute>
        } />
        <Route path="/log/:id" element={
          <ProtectedRoute>
            <LoggingPage />
          </ProtectedRoute>
        } />
        <Route path="/records" element={
          <ProtectedRoute>
            <RecordsPage />
          </ProtectedRoute>
        } />
        <Route path="/exercises" element={
          <ProtectedRoute>
            <ExercisesPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
