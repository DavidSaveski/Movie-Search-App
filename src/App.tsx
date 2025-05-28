import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
