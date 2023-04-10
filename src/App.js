import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SuccessPage from "./pages/Success";
import Main from "./pages/Main/Main.jsx";
import User from "./pages/User/User";
import Allrooms from "./components/Rooms/Allrooms/Allrooms";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Category from "./pages/Category/Category";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import Search from "./pages/Search/Search";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/allrooms" element={<Allrooms />} />
          <Route path="/category" element={<Category />} />
          <Route path="/room/:roomId" element={<RoomDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
