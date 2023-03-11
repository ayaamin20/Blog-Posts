import Paging from "../../SharedComponents/Paging/Paging";
import AllPosts from "../../Components/AllPosts/AllPosts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../../SharedComponents/Tabs/Tabs.css";
export default function PostsSection({
  allPosts,
  paging,
  postsCount,
  page,
  handleChangePaging,
}) {
  return (
    <>
      {allPosts.length > 0 ? (
        <AllPosts posts={allPosts} postCount={allPosts.length || 0} />
      ) : (
        <Box sx={{ display: "flex", width: "100%" }}>
          <CircularProgress style={{ margin: "auto", padding: "5%" }} />
        </Box>
      )}
      {paging && postsCount > 20 && (
        <Paging
          postCount={postsCount || 0}
          page={page}
          handleChange={handleChangePaging}
        />
      )}
    </>
  );
}
