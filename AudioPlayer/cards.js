export default function cardRenderer(container, postsToShow) {
  const cardsContainer = document.querySelector(container);
  cardsContainer.innerHTML =
    postsToShow.length > 0
      ? postsToShow
          .map(
            (post, index) => `
            <div class="card" key="${post.id}" data-index="${index}">
              <div class="content"> 
              <h3>${post.title}</h3>
              <button>▶</button>
              </div>
            </div>`
          )
          .join("")
      : "<div class='no-posts'>No songs available</div>";

  const cards = cardsContainer.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (!isNaN(index)) {
        document.dispatchEvent(
          new CustomEvent("playSong", { detail: { index } })
        );
      } else {
        console.error("Invalid index found:", this.getAttribute("data-index"));
      }
    });
  });
}
