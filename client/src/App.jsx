import "bootstrap/dist/css/bootstrap.css";
import * as Reactstrap from "reactstrap";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ShopDetails from "./components/ShopDetails";
import About from "./components/About";
import Map from "./components/Map";
import AdminPage from "./components/AdminPage";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import "./styles/App.css";

import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const hideNavbar = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar user={user} />}

    <div className="app-container">
  <Routes>

    <Route
      path="/"
      element={user ? <Navigate to="/home" /> : <Login />}
    />

    <Route
      path="/register"
      element={user ? <Navigate to="/home" /> : <Register />}
    />

    <Route
      path="/home"
      element={user?.email ? <Home /> : <Navigate to="/" />}
    />

    <Route
      path="/AdminPage"
      element={
        user?.role === "admin"
          ? <AdminPage />
          : <Navigate to="/" />
      }
    />

    <Route
      path="/about"
      element={user?.email ? <About /> : <Navigate to="/" />}
    />

    <Route
      path="/map"
      element={user?.email ? <Map /> : <Navigate to="/" />}
    />

    <Route
      path="/shops"
      element={user?.email ? <Shop /> : <Navigate to="/" />}
    />

    <Route
      path="/shop/:id"
      element={user?.email ? <ShopDetails /> : <Navigate to="/" />}
    />

    <Route
      path="/profile"
      element={user?.email ? <UserProfile /> : <Navigate to="/" />}
    />

  </Routes>
</div>
    </>
  );
}

export default App;