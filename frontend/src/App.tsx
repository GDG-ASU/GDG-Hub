import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Create from "./components/Create";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" bg-white">
        <Card />
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
        </Routes>
      </div>
    </>
  );
};

export default App;
