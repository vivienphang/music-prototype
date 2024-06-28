// Global variables
let posts = [];

window.onload = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      displayPosts(posts);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
};

function displayPosts(posts) {
  const container = document.querySelector(".posts-container");
  container.innerHTML =
    posts.length > 0
      ? posts
          .map(
            (post) => `
            <div class="card" key="${post.id}">
              <div class="content">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
              </div>
            </div>`
          )
          .join("")
      : "<div class='no-posts'>No posts available</div>";
}
