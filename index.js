
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const searchInput = document.getElementById("search");
  const languageFilter = document.getElementById("language-filter");

  const languages = ["English", "Kannada", "Hindi", "Telugu", "Tamil", "Malayalam"];

  
  fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => {
          data.forEach(post => createCard(post));
      });

  
  function getRandomLikes() {
      return Math.floor(Math.random() * 1000) + 1;
  }

  
  function getRandomLanguage() {
      return languages[Math.floor(Math.random() * languages.length)];
  }

  
  function createCard(post) {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.title = post.title.toLowerCase();
      card.dataset.language = getRandomLanguage();

      card.innerHTML = `
          <h2>${post.title}</h2>
          <p>Likes: ${getRandomLikes()}</p>
          <p>Language: ${card.dataset.language}</p>
          <button class="delete-btn">Delete</button>
      `;

      card.querySelector(".delete-btn").addEventListener("click", () => {
          cardContainer.removeChild(card);
      });

      cardContainer.appendChild(card);
  }

  
  searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filterCards(query, languageFilter.value);
  });

  
  languageFilter.addEventListener("change", (e) => {
      const language = e.target.value;
      filterCards(searchInput.value.toLowerCase(), language);
  });

  function filterCards(query, language) {
      const cards = cardContainer.getElementsByClassName("card");
      Array.from(cards).forEach(card => {
          const matchesQuery = card.dataset.title.includes(query);
          const matchesLanguage = !language || card.dataset.language === language;
          card.style.display = matchesQuery && matchesLanguage ? "block" : "none";
      });
  }
});