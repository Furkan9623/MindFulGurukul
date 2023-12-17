import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { loginUserApi, registerUserApi } from "../api/user-api";
import { loginContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
const RegisterLogin = () => {
  const [toggle, setToggle] = useState("register");

  const initValue = {
    ...(toggle === "register" && { name: "" }),
    email: "",
    ...(toggle === "register" && { gender: "" }),
    ...(toggle === "register" && { city: "" }),
    ...(toggle === "register" && { state: "" }),
    ...(toggle === "register" && { phone: "" }),
    password: "",
  };
  const [formInput, setFormInput] = useState(initValue);
  const [file, setFile] = useState("");
  const { setLoginAuth } = useContext(loginContext);

  const { name, email, password, city, phone, gender, state } = formInput;
  useEffect(() => {
    setFormInput(initValue);
  }, [toggle]);
  const toggleForm = (toggleInput) => {
    setToggle(toggleInput);
  };
  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  // create form
  const formData = new FormData();
  formData.append("profile", file);
  formData.append("user", JSON.stringify(formInput));
  const alpha = /^[A-Za-z\s]+$/;
  const alphaNumberic = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const validation = (isLogin = false) => {
    console.log(isLogin);
    if (
      !email ||
      !password ||
      (!isLogin && !name) ||
      (!isLogin && !city) ||
      (!isLogin && !state) ||
      (!isLogin && !gender) ||
      (!isLogin && !phone)
    ) {
      alert("Please fill all the details...");
      return false;
    } else if (!email.match(alphaNumberic)) {
      alert("Email format is not correct");
      return false;
    } else if (!isLogin && !phoneRegex.test(phone)) {
      alert("Phone field should contain exactly 10 numeric digits.");
      return false;
    } else if (!isLogin && !alpha.test(name)) {
      alert("only allow alphabate in name field..");
      return false;
    } else if (!isLogin && password?.length <= 4) {
      alert("Password should be greater than 5 digit");
      return false;
    } else {
      return true;
    }
  };
  // register user
  const registerFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    if (!validation()) return;
    console.log(file);
    console.log(Object.fromEntries(formData));
    const result = await registerUserApi(formData);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("User register successfull"),
        setToggle("login"),
        setFormInput(initValue))
      : error
      ? alert(error)
      : alert(result?.message);
  };
  // save on localStorage
  const saveOnLocalStorage = (key, value) => {
    console.log(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  const navigate = useNavigate();
  // login user
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    if (!validation(true)) return;
    const result = await loginUserApi(formInput);
    const { name, imageUrl } = result?.data?.user || "";
    const Token = result?.data?.token || "";
    let userData = { name, imageUrl, Token };
    console.log(result);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (alert("user login successfull"),
        setLoginAuth(true),
        saveOnLocalStorage("User", userData),
        navigate("/"))
      : error
      ? alert(error)
      : alert(result?.message);
  };
  return (
    <Box className="w-1/3 shadow-2xl p-12 m-auto mt-16 flex flex-col gap-4 text-center rounded">
      <Typography variant="h4" className="bg-black text-white py-2 ">
        {toggle === "register" ? "REGISTER USER" : "LOGIN USER"}
      </Typography>
      <Box className="flex gap-2">
        <Button
          type="button"
          size="small"
          variant={toggle === "register" ? "contained" : "outlined"}
          fullWidth
          sx={{ fontWeight: "600" }}
          onClick={() => toggleForm("register")}
        >
          REGISTER
        </Button>
        <Button
          type="button"
          size="small"
          variant={toggle === "login" ? "contained" : "outlined"}
          fullWidth
          onClick={() => toggleForm("login")}
          sx={{ fontWeight: "600" }}
        >
          LOGIN
        </Button>
      </Box>
      <form
        className="flex flex-col gap-4 mt-3"
        onSubmit={toggle === "login" ? loginFormSubmit : registerFormSubmit}
      >
        <Box
          className={
            toggle === "register"
              ? "grid grid-cols-2 gap-4 mt-3"
              : "flex flex-col gap-4 mt-3"
          }
        >
          {toggle === "register" && (
            <TextField
              type="text"
              size="small"
              label="Enter name....."
              name="name"
              onChange={handleChange}
            />
          )}
          <TextField
            type="text"
            size="small"
            label="Enter email...."
            name="email"
            value={email}
            onChange={handleChange}
          />

          {toggle === "register" && (
            <>
              <TextField
                type="text"
                size="small"
                label="Enter Phone number..."
                onChange={handleChange}
                name="phone"
              />
              <FormControl size="small">
                <InputLabel id="city">Select City</InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  name="city"
                  onChange={handleChange}
                  value={city}
                  label="Select City"
                >
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                </Select>
              </FormControl>

              <input
                type="text"
                list="list"
                name="state"
                className="border px-3 rounded border-gray-300 outline-none"
                placeholder="Enter the state"
                onChange={handleChange}
              />
              <datalist id="list">
                <select>
                  {[
                    { id: 1, label: "Gujarat" },
                    { id: 2, label: "Maharashtra" },
                    { id: 3, label: "Karnataka" },
                  ].map((elem) => {
                    return (
                      <option key={elem.id} value={elem.label}>
                        {elem.label}
                      </option>
                    );
                  })}
                </select>
              </datalist>
            </>
          )}
          <TextField
            type="text"
            size="small"
            label="Enter password..."
            onChange={handleChange}
            name="password"
            value={password}
          />

          {toggle === "register" && (
            <>
              <FormControl className="text-left" size="small">
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup
                  onChange={handleChange}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <TextField size="small" type="file" onChange={handleFile} />
            </>
          )}
        </Box>

        <Button
          type="submit"
          size="small"
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "600" }}
        >
          {toggle === "register" ? "REGISTER USER" : "LOGIN USER"}
        </Button>
      </form>
      <Typography>
        {toggle === "register"
          ? "If Already have an Account"
          : "Create new User"}{" "}
        <Button
          color="warning"
          size="small"
          variant="contained"
          onClick={() =>
            toggle === "register" ? toggleForm("login") : toggleForm("register")
          }
        >
          {toggle === "register" ? "login" : "register"}
        </Button>{" "}
      </Typography>
    </Box>
  );
};

export default RegisterLogin;
