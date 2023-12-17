import { useEffect, useState } from "react";
import { getAllUerApi } from "../api/crud-api";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SingleCard from "../components/SingleCard";

const Home = () => {
  const [allUser, setAllUer] = useState([]);
  const getAllUser = async () => {
    const result = await getAllUerApi();
    console.log(result);
    const error = result?.data?.response?.message;
    return result?.status === 200
      ? setAllUer(result?.data?.alluser)
      : error
      ? alert(error)
      : alert(result?.message);
  };
  useEffect(() => {
    getAllUser();
  }, []);
  const data = [
    {
      id: 1,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 2,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 3,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 4,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 4,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 4,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 4,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
    {
      id: 4,
      name: "Md Furkan",
      email: "furkan@gmail.com",
      phone: "858400923",
    },
  ];
  return (
    <Box className="mt-20 w-2/3 m-auto">
      <Box className="flex gap-3">
        <TextField
          className="w-3/4"
          size="small"
          type="text"
          label="Search By Name, Email, Mobile ............................."
        />
        <FormControl size="small" className="w-1/4">
          <InputLabel id="city">Select City</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            name="city"
            // onChange={handleChange}
            // value={city}
            label="Select City"
          >
            <MenuItem value="a-z">A - Z</MenuItem>
            <MenuItem value="z-a">Z - A</MenuItem>
            <MenuItem value="last-modify">Last Modified</MenuItem>
            <MenuItem value="last-insert">Last Inserted</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {allUser?.length > 0 ? (
        <Box className="flex gap-5 mt-4 flex-wrap">
          {allUser?.map((elem) => {
            return <SingleCard elem={elem} />;
          })}
        </Box>
      ) : (
        <h1>no data</h1>
      )}
    </Box>
  );
};
export default Home;
