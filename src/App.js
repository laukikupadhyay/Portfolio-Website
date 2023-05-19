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
import { useSelector } from "react-redux";

function App() {
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={userInfo==null?<Auth />:<Auth />} />
          <Route path="/register" element={userInfo==null?<Auth />:<Register />} />
          <Route path="/success" element={userInfo==null?<Auth />:<SuccessPage />} />
          <Route path="/main" element={userInfo==null?<Auth />:<Main />} />
          <Route path="/user" element={userInfo==null?<Auth />:<User />} />
          <Route path="/allrooms" element={userInfo==null?<Auth />:<Allrooms />} />
          <Route path="/category" element={userInfo==null?<Auth />:<Category />} />
          <Route path="/room/:roomId" element={userInfo==null?<Auth />:<RoomDetails />} />
          <Route path="/viewprofile/:userId" element={userInfo==null?<Auth />:<ViewProfile />} />
          <Route path="/search" element={userInfo==null?<Auth />:<Search />} />
          <Route path="/userpage/:id" element={userInfo==null?<Auth />:<PublicProfile />} />
          <Route path="/chat/:roomId/:roomname" element={<ChatRoom />} />
          <Route path="/buynsell" element={userInfo==null?<Auth />:<BuynSell />} />
          <Route path="/additem" element={userInfo==null?<Auth />:<Additem />} />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
