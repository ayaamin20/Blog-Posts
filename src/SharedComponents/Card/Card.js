import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Collapse,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Card.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function RecipeReviewCard({
  posts,
  handleShowMore,
  postType,
  className,
  email,
  writtenComment,
  submitComment,
  handleChangeComment,
  handleChangeemail,
  expanded,
  handleExpandClick,
  postUser,
  bodyclassName,
}) {
  let [colorChange, setColorChange] = React.useState(false);
  function handleFavClick() {
    setColorChange(!colorChange);
  }
  return (
    <Card className={className}>
      <CardHeader
        className="card-header"
        avatar={
          <Tooltip title={postUser?.name} placement="top">
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {postUser?.name?.charAt(0)}
            </Avatar>
          </Tooltip>
        }
        title={posts.title}
        subheader={postUser?.email}
      />
      {postUser && (
        <>
          <div className="phone">
            <p>{postUser?.company?.name}</p>
          </div>
          <div className="phone">
            <PhoneIcon width={20} className="icon" />
            <p>{postUser?.phone}</p>
          </div>
        </>
      )}
      <CardContent className={bodyclassName}>
        <Typography variant="body2" color="text.secondary">
          {posts.body}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className="card-actions">
        {postType == "all-posts" ? (
          <div className="post-footer">
            <IconButton onClick={() => handleShowMore(posts.id)}>
              Show More
            </IconButton>
            <div>
              <IconButton
                onClick={() => handleFavClick()}
                aria-label="add to favorites"
                style={{ color: colorChange ? "red" : "" }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <>
            <Tooltip title={postUser?.name} placement="top">
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <AddIcon />
              </ExpandMore>
            </Tooltip>

            <IconButton
              onClick={() => handleFavClick()}
              aria-label="add to favorites"
              style={{ color: colorChange ? "red" : "" }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="add-comment">
            <TextField
              className="addcomment-field"
              id="outlined-basic"
              label="Add a comment"
              placeholder="Say something about this post"
              variant="outlined"
              multiline={true}
              rows={4}
              onChange={(e) => {
                handleChangeComment(e.target.value);
              }}
            />
            <TextField
              className="addemail-field"
              id="outlined-basic"
              placeholder="Enter your E-mail"
              variant="outlined"
              rows={1}
              onChange={(e) => {
                handleChangeemail(e.target.value);
              }}
            />
            <Button
              disabled={email == null || writtenComment == null}
              onClick={() => {
                submitComment();
              }}
              variant="contained"
              className="submit-post"
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
