// GLOBAL
let posts = [];
let isSortAscending = false;

window.onload = () => {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block";
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      displayPosts(posts);
      loadingIndicator.style.display = "none";
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      loadingIndicator.innerHTML = "Failed to load data";
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

// SORT AND FILTER FUNCTIONS
function sortPosts() {
  if (!posts || !posts.length) {
    console.error("Posts are not loaded or are empty");
    return;
  }

  if (isSortAscending) {
    posts.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    posts.sort((a, b) => b.title.localeCompare(a.title));
  }
  isSortAscending = !isSortAscending;
  displayPosts(posts);
}

function groupByUserId() {
  const userId = parseInt(document.getElementById("userId").value, 10);
  if (!userId) {
    alert("Please enter a valid User ID.");
    return;
  }

  const filteredPosts = posts.filter((post) => post.userId === userId);
  if (!filteredPosts.length) {
    alert("No posts found for this User ID.");
    return;
  }
  displayPosts(filteredPosts);
}

function clearFilter() {
  // Reset global variables
  currentPagePosts = [];
  currentPage = 1;
  isSortAscending = false;

  // Revert to default
  displayPosts(posts);
  document.getElementById("userId").value = "";
}
