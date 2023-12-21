import { useContext, useEffect, useState } from "react";
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
import { loadingContext } from "../context/MyContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const Home = () => {
  const [allUser, setAllUer] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const { loading, setLoading } = useContext(loadingContext);
  const getAllUser = async () => {
    setLoading(true);
    const result = await getAllUerApi(query, searchField, filter);
    console.log(result);
    const error = result?.response?.data?.message;
    setLoading(false);
    return result?.status === 200
      ? setAllUer(result?.data?.alluser)
      : error
      ? toast.error(error, {
          theme: "colored",
        })
      : toast.error(result?.message, {
          theme: "colored",
        });
  };
  useEffect(() => {
    getAllUser();
  }, [query, filter]);
  // debouncing
  const Debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const handleChange = (e) => {
    const input = e.target.value;
    console.log("input", input);

    if (input.includes("@gmail.com")) {
      setSearchField("email");
    } else if (!isNaN(input)) {
      setSearchField("phone");
    } else {
      setSearchField("name");
    }
    setQuery(input);
  };
  // magic function
  const magicFunc = Debounce(handleChange, 1000);

  const handleFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };
  return (
    <Box className="mt-20 w-2/3 m-auto">
      <Box className="flex gap-3">
        <TextField
          className="w-3/4"
          size="small"
          type="text"
          onChange={magicFunc}
          label="Search By Name, Email, Mobile ............................."
        />
        <FormControl size="small" className="w-1/4">
          <InputLabel id="city">Select City</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            name="city"
            label="Select City"
            value={filter}
            onChange={handleFilter}
          >
            <MenuItem value="a-z">A - Z</MenuItem>
            <MenuItem value="z-a">Z - A</MenuItem>
            <MenuItem value="last-modify">Last Modified</MenuItem>
            <MenuItem value="last-insert">Last Inserted</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Spinner />
      ) : allUser && allUser.length > 0 ? (
        <Box className="flex gap-5 mt-4 flex-wrap">
          {allUser.map((elem) => (
            <SingleCard key={elem._id} elem={elem} getAllUser={getAllUser} />
          ))}
        </Box>
      ) : (
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=ais"
          alt="404 Error"
        />
      )}
    </Box>
  );
};
export default Home;
