import Request from "./Request";
const Api = {
  getUsers: () => {
    const subUrl = "users";
    return Request.get(subUrl);
  },
  getPosts: () => {
    const subUrl = "posts";
    return Request.get(subUrl);
  },
  getUserPosts: (id) => {
    const subUrl = `posts?userId=${id}`;
    return Request.get(subUrl);
  },
  commentsApi: (id) => {
    const subUrl = `posts/${id}/comments`;
    return Request.get(subUrl);
  },
  addCommentsApi: (id, data) => {
    const subUrl = `posts/${id}/comments`;
    return Request.post(subUrl, data);
  },
  getPostUser: (id) => {
    const subUrl = `users/${id}`;
    return Request.get(subUrl);
  },
  getPostDetailsApi: (id) => {
    const subUrl = `posts/${id}`;
    return Request.get(subUrl);
  },
  getDataPagination: (page, limit) => {
    const subUrl = `posts?_page=${page}&limit=${limit}`;
    return Request.get(subUrl);
  },
};
export default Api;
