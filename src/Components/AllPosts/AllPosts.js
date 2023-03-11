import React from "react";
import Card from "../../SharedComponents/Card/Card";
import { useNavigate } from "react-router-dom";
export default function AllPosts(props) {
  const navigate = useNavigate();
  function handleShowMore(id) {
    navigate(`/posts/${id}`);
  }
  function renderAllPosts() {
    return props.posts?.map((post) => {
      return (
        <Card
          bodyclassName="card-content-posts"
          className="cardstyle"
          key={post.id}
          posts={post}
          handleShowMore={handleShowMore}
          postType="all-posts"
        />
      );
    });
  }

  return <div className="AllPosts">{props.posts && renderAllPosts()}</div>;
}
