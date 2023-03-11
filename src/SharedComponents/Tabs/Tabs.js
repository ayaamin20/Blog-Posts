import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Box,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Api from "../../Apis/Api";
import PostsSection from "../../Components/PostsSection/PostsSection";
import ShowAlert from "../../Components/Alert/Alert";
import "./Tabs.css";
function Tabs() {
  const navigate = useNavigate();
  let [value, setValue] = useState("1");
  let [allPosts, setAllPosts] = useState([]);
  let [paging, setPaging] = useState(null);
  let [postsCount, setPostsCount] = useState(null);
  let [users, setusers] = useState();
  let [page, setPage] = useState(1);
  let [userId, setUserId] = useState(0);
  let [userName, setUserName] = useState(null);
  let [alertdata, setAlertData] = useState({});

  function handleSelectUserChange(id) {
    setUserId(id);
    if (id == 0) {
      setUserName(null);
      getPosts();
      navigate(`/`);
    } else {
      setUserName(users[id - 1].name);
      getUserPosts(id);
      navigate(`/user/${id}`);
    }
  }
  function getUserPosts(id) {
    Api.getUserPosts(id)
      .then((res) => {
        setAllPosts(res.data);
        setPostsCount(res.data.length);
        setAlertData({
          type: "success",
          message: "Get user posts successfully",
        });
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get user posts",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }

  useEffect(() => {
    getDataFromApi();
  }, [paging]);

  function getUsers() {
    Api.getUsers()
      .then((res) => {
        setusers(res.data);
        setAlertData({
          type: "success",
          message: "Get users successfully",
        });
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get users",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function getPosts() {
    Api.getPosts()
      .then((res) => {
        if (res.data.length >= 20) {
          setPostsCount(res.data.length);
          setPaging(true);
          getDataPagination(page);
        } else {
          setAllPosts(res.data);
        }
        setAlertData({
          type: "success",
          message: "Get posts successfully",
        });
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get posts",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function getDataFromApi() {
    getUsers();
    getPosts();
  }
  function getDataPagination() {
    Api.getDataPagination(page + 1, 20)
      .then((res) => {
        setAllPosts(res.data);
        setAlertData({
          type: "success",
          message: "Get posts successfully",
        });
      })
      .catch(() => {
        setAlertData({
          type: "error",
          message: "Failed to get posts paging",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertData({});
        }, 3000);
      });
  }
  function handleChangePaging(event, value) {
    setPage(value);
    getDataPagination(value);
  }
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <div>
      {alertdata?.type ? (
        <ShowAlert type={alertdata.type} message={alertdata.message} />
      ) : (
        ""
      )}

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="tab">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={userName ? `${userName}' Posts` : "Posts"} value="1" />
          </TabList>
        </Box>

        <TabPanel value="1" className="tab-panal">
          <FormControl className="form-select">
            <InputLabel className="label-user" id="demo-simple-select-label">
              Select User:
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userId}
              onChange={(e) => {
                handleSelectUserChange(e.target.value);
              }}
            >
              <MenuItem value={0}>Select All</MenuItem>
              {users?.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id} name={user.name}>
                    {user.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {allPosts.length > 0 && (
            <PostsSection
              allPosts={allPosts}
              paging={paging}
              postsCount={postsCount}
              page={page}
              handleChangePaging={handleChangePaging}
            />
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
}
export default Tabs;
