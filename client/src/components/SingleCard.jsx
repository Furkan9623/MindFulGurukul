import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { toast } from "react-toastify";
import { deleteUserApi } from "../api/crud-api";
import { loadingContext } from "../context/MyContext";
export default function SingleCard({ elem, getAllUser }) {
  const { _id, name, email, phone, gender } = elem;
  const { loading, setLoading } = React.useContext(loadingContext);
  const deleteUser = async () => {
    setLoading(true);
    const result = await deleteUserApi(_id);
    const error = result?.response?.data?.message;
    setLoading(false);
    return result?.status === 200
      ? (toast.success("User deleted successfull", { theme: "colored" }),
        getAllUser())
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message);
  };
  return (
    <Card sx={{ padding: "10px 20px", width: 230, m: "auto" }}>
      <CardMedia
        component="img"
        image="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Name : {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email : {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone : {phone}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <Fab size="small" color="success" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab size="small" color="error" aria-label="add" onClick={deleteUser}>
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
