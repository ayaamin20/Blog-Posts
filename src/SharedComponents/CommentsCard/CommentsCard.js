import * as React from "react";
import {
  CardHeader,
  Card,
  Typography,
  IconButton,
  Avatar,
  CardActions,
  CardContent,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./CommentsCard.css";
export default function Comments({ comment }) {
  let [colorChange, setColorChange] = React.useState(false);
  function handleFavClick() {
    setColorChange(!colorChange);
  }
  return (
    <Card sx={{ maxWidth: "100%" }} className="comment-box">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {comment.email.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.name}
        subheader={comment.email}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="card-actions">
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleFavClick()}
          style={{ color: colorChange ? "red" : "" }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
