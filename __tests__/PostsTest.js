import Api from "../src/Apis/Api";

describe("Posts Test", () => {
  test("can fetch posts successfully", async () => {
    let response = await Api.getPosts();
    let posts = response.data;
    posts.forEach((post) => {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    });
  });

  test("can fetch user posts successfully", async () => {
    let response = await Api.getUserPosts(1);
    let user_posts = response.data;
    user_posts.forEach((userPost) => {
      expect(userPost).toHaveProperty("userId", 1);
    });
  });
});
