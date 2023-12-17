import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterLogin from "../pages/RegsiterLogin";
import Home from "../pages/Home";
import EditUser from "../pages/EditUser";
import PrivateRoute from "./PrivateRoute";
import AddUser from "../pages/AddUser";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user" element={<EditUser />} />
        </Route>
        <Route path="/login-register" element={<RegisterLogin />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
