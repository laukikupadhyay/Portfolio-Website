import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SuccessPage from "./pages/Success";
import Main from "./pages/Main/Main.jsx";
import User from "./pages/User/User";
import Allrooms from "./components/Rooms/Allrooms/Allrooms";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User/>} />
          <Route path="/allrooms" element={<Allrooms/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
