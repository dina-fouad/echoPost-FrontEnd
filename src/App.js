import { Routes, Route, useLocation } from "react-router";
import Header from "./Components/Header";
import Login from "./pages/Forms/Login";
import PostsPage from "./pages/PostsPage";
import CreatePost from "./pages/CreatePost";
import AdminDashBoard from "./pages/AdminDashBoard";
import Register from "./pages/Forms/Register";
import Home from "./pages/Home";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />

      <div style={{ paddingTop: isHome ? "0px" : "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/dashboard" element={<AdminDashBoard />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

        
        <Footer />
      </div>
    </div>
  );
}

export default App;
