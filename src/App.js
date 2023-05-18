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
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import Auth from "./pages/Auth/Auth";
import ChatRoom from "../src/pages/Chat/Chat";
import BuynSell from "./pages/BuynSell/BuynSell";
import Additem from "./pages/Additem/Additem";
import PagenotFound from "./pages/PagenotFound/PagenotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/allrooms" element={<Allrooms />} />
          <Route path="/category" element={<Category />} />
          <Route path="/room/:roomId" element={<RoomDetails />} />
          <Route path="/viewprofile/:userId" element={<ViewProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userpage/:id" element={<PublicProfile />} />
          <Route path="/chat/:roomId/:roomname" element={<ChatRoom />} />
          <Route path="/buynsell" element={<BuynSell />} />
          <Route path="/additem" element={<Additem />} />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
