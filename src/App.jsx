import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./HOC/navigation/Layout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Login from "./components/Authentication/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./components/Authentication/Register";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postById/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
