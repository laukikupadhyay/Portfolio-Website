import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SuccessPage from "./pages/Success";
import Main from "./pages/Main/Main.jsx";

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
