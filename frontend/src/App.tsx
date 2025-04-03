import Header from "./components/Header";
import Post from "./components/Post";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Create from "./components/Create";
import EditPost from "./components/EditPost";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" bg-white">
        <Post />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <div className=" bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
