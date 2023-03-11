import Pagination from "@mui/material/Pagination";
import React from "react";
import "./Paging.css";
export default function Paging({ postCount, handleChange, page }) {
  return (
    <Pagination
      count={postCount / 10}
      page={page}
      onChange={handleChange}
      className="paging"
    />
  );
}
