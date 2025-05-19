import { Outlet } from "react-router-dom";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <CssBaseline />
        <Outlet />
      </Container>
    </>
  );
}

export default App;
