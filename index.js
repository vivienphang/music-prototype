// GLOBAL
let posts = [];
let isSortAscending = false;
let currentPage = 1;
let currentPagePosts = [];
const postsPerPage = 5;

window.onload = () => {
  const loadingIndicator = document.querySelector(".loader");
  loadingIndicator.style.display = "block";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      displayPosts(posts, 1);
      loadingIndicator.style.display = "none";
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      loadingIndicator.innerHTML = "Failed to load data";
    });
};

function displayPosts(posts, page) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = posts.slice(startIndex, endIndex);

  updatePageInfo(page, posts.length);
  renderPostCards(postsToShow);
  updatePagination();
}

// PAGINATION HANDLER
function updatePageInfo(page, totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  document.getElementById(
    "page-info"
  ).textContent = `Page ${page} of ${totalPages}`;
}

function goToPage(page) {
  // Check between filtered or full posts
  const activePosts = currentPagePosts.length > 0 ? currentPagePosts : posts;
  const totalPages = Math.ceil(activePosts.length / postsPerPage);

  if (page < 1 || page > totalPages) return;

  currentPage = page;
  displayPosts(activePosts, page);
}

function updatePagination() {
  const activePosts = currentPagePosts.length > 0 ? currentPagePosts : posts;
  const totalPages = Math.ceil(activePosts.length / postsPerPage);

  document.getElementById(
    "page-info"
  ).textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prev-button").disabled = currentPage <= 1;
  document.getElementById("next-button").disabled = currentPage >= totalPages;
}

// SORT AND FILTER HANDLER
function sortPosts() {
  let postsToSort = currentPagePosts.length ? currentPagePosts : posts;
  isSortAscending = !isSortAscending;

  if (isSortAscending) {
    postsToSort.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    postsToSort.sort((a, b) => b.title.localeCompare(a.title));
  }
  currentPage = 1;
  displayPosts(postsToSort, 1);
  updatePagination();
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

  currentPagePosts = filteredPosts;
  currentPage = 1;
  displayPosts(currentPagePosts, currentPage);
  updatePagination();
}

function clearFilter() {
  // Reset global variables
  currentPagePosts = [];
  currentPage = 1;
  isSortAscending = false;

  // Revert to default
  displayPosts(posts, currentPage);
  updatePagination();
  document.getElementById("userId").value = "";
}

// RENDER COMPONENT HANDLER
function renderPostCards(postsToShow) {
  const container = document.querySelector(".posts-container");
  container.innerHTML =
    postsToShow.length > 0
      ? postsToShow
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
