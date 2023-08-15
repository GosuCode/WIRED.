import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./HOC/navigation/Layout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Login from "./components/Authentication/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./components/Authentication/Register";
import SinglePage from "./pages/SinglePage";
import Analytics from "./pages/Analytics";
import UpdatePost from "./pages/UpdatePost";
import "react-toastify/dist/ReactToastify.css";
import Users from "./pages/Users";
import TodoList from "./pages/TodoList";
import SingleUser from "./pages/SingleUser";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/updatePost/:id" element={<UpdatePost />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/postById/:id" element={<SinglePage />} />
          <Route path="/userById/:id" element={<SingleUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
