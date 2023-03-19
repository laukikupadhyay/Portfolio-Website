import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SuccessPage from "./pages/Success";
import supabase from "./supabase";
import Main from './pages/Main/Main.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
