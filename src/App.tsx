import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
