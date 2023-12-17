import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
export default function SingleCard({ elem }) {
  const { name, email, phone } = elem;
  return (
    <Card sx={{ padding: "10px 20px", width: 230, m: "auto" }}>
      <CardMedia
        component="img"
        // height="194"
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
        <Fab size="small" color="error" aria-label="add">
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
