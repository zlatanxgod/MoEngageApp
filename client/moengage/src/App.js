import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import cors from "cors";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import BreweryDetails from "./components/BreweryDetails";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<BreweryDetails />} />
        </Routes>
      </AuthProvider>
    </Router>   
  );
};

export default App;
