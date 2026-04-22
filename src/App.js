import { Routes, Route, useLocation } from "react-router";
import Header from "./Components/Header";
import Login from "./pages/Forms/Login";
import PostsPage from "./pages/PostsPage";
import CreatePost from "./pages/CreatePost";
import AdminDashBoard from "./pages/AdminDashBoard";
import Register from "./pages/Forms/Register";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import PostDetails from "./pages/PostDetails";
import { useSnackbar } from "notistack";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { enqueueSnackbar } = useSnackbar();

  function toastMsg(msg, type) {
    enqueueSnackbar(msg, { variant: type });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // ✅ يملأ كامل الشاشة
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div
        style={{
          flex: 1, // ✅ يملأ المساحة المتبقية
          paddingTop: isHome ? "0px" : "100px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/create" element={<CreatePost toastMsg={toastMsg} />} />
          <Route path="/create/details/:id" element={<PostDetails />} />
          <Route path="/dashboard" element={<AdminDashBoard />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
