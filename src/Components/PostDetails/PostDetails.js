import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Apis/Api";
import Card from "../../SharedComponents/Card/Card";
import CommentsCard from "../../SharedComponents/CommentsCard/CommentsCard";
import ShowAlert from "../Alert/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./PostDetails.css";
export default function PostDetails() {
  let { id } = useParams();
  let [postDetails, setpostDetails] = useState([]);
  let [postComments, setPostComments] = useState([]);
  let [email, setEmail] = useState(null);
  let [writtenComment, setWrittenComment] = useState(null);
  let [expanded, setExpanded] = useState(false);
  let [postUser, setPostUser] = useState(false);
  let [writtenCommentData, setWrittenCommentData] = useState(null);
  let [alertdata, setAlertData] = useState({});
  let handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function handleChangeemail(fieldValue) {
    setEmail(fieldValue);
  }
  function handleChangeComment(fieldValue) {
    setWrittenComment(fieldValue);
  }
  function submitComment() {
    Api.addCommentsApi(id, {
      postId: parseInt(id),
      name: `${email.includes("@") ? email.split("@")[0] : email}`,
      email: `${email}`,
      body: `${writtenComment}`,
    })
      .then((res) => {
        setAlertData({
          type: "success",
          message: "Add post comment successfully",
        });
        setWrittenCommentData(res.data);
        let allComments = postComments;
        allComments.unshift(res.data);
        setPostComments(allComments);
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to add comments",
        });
      })
      .finally(() => {
        setWrittenComment(null);
        setEmail(null);
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function getPostDetails() {
    Api.getPostDetailsApi(id)
      .then((res) => {
        setAlertData({
          type: "success",
          message: "Get post data successfully",
        });
        setpostDetails(res.data);
        commentsApi(res.data.id);
        getPostUser(res.data.userId);
      })

      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get  post data",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function commentsApi(id) {
    Api.commentsApi(id)
      .then((res) => {
        setAlertData({
          type: "success",
          message: "Get post Commments successfully",
        });
        setPostComments(res.data);
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to post Commments",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function getPostUser(userId) {
    Api.getPostUser(userId)
      .then((res) => {
        setPostUser(res.data);
        setAlertData({
          type: "success",
          message: "Get the user successfully",
        });
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get the user",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <>
      {" "}
      {alertdata?.type ? (
        <ShowAlert type={alertdata.type} message={alertdata.message} />
      ) : (
        ""
      )}
      <Card
        bodyclassName="card-content-Details"
        className="cardstyle card-details"
        postUser={postUser}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        handleChangeemail={handleChangeemail}
        handleChangeComment={handleChangeComment}
        email={email}
        writtenComment={writtenComment}
        submitComment={() => submitComment()}
        key={postDetails.id}
        posts={postDetails}
        postType="details"
      />
      <div className="comment-container">
        <p className="comments-header">Comments {postComments.length}</p>

        {postComments ? (
          postComments.map((comment) => {
            return <CommentsCard key={comment.id} comment={comment} />;
          })
        ) : (
          <Box sx={{ display: "flex", width: "100%" }}>
            <CircularProgress style={{ margin: "auto", padding: "5%" }} />
          </Box>
        )}
      </div>
    </>
  );
}
