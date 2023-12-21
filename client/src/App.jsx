import { TextField, Typography } from "@mui/material";
import "./App.css";

import AllRoutes from "./routes/AllRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}
export default App;
