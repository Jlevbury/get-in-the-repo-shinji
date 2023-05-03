// Select elements from the DOM
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("resultDiv");
const searchHistoryDropdown = document.getElementById("searchHistoryDropdown");
const animeOrMangaDropdown = document.getElementById("animeOrMangaDropdown");

// Get search history from local storage
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Update the search history dropdown with saved search history
function updateSearchHistoryDropdown() {
  searchHistoryDropdown.innerHTML = "";
  searchHistory.forEach((searchTerm) => {
    const option = document.createElement("option");
    option.value = searchTerm;
    searchHistoryDropdown.appendChild(option);
  });
}

// Add a search term to the search history array and update local storage and dropdown
function addSearchTermToHistory(searchTerm) {
    if (!searchHistory.includes(searchTerm)) {
      searchHistory.push(searchTerm);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      updateSearchHistoryDropdown();
    }
}

// Attach an event listener to the search button
searchButton.addEventListener("click", async () => {
  // Get the anime/manga name from the search input
  const animeOrManga = animeOrMangaDropdown.value;
  const animeOrMangaPath = (animeOrManga === "anime") ? "anime" : "manga";
  const animeOrMangaDisplayName = (animeOrManga === "anime") ? "Anime" : "Manga";
  const searchTerm = searchInput.value;
  // Add the search term to the search history and update the dropdown
  addSearchTermToHistory(searchTerm);  
  // Set up the API URL and options
  const url = `https://myanimelist.p.rapidapi.com/anime/search/${animeName}/10`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cfc7111e6dmsh224ed1804628074p194dc8jsn8123165fc88e",
      "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
    },
  };
 // Fetch data from the API
  try {
    // Send a request to the API and get the response
    const response = await fetch(url, options);
    const result = await response.json();

    // Initialize an empty string to hold the HTML for the anime list
    let animeList = "";

    // Set a limit for the maximum length of the description text
    const maxDescriptionLength = 100;

    // Loop through the list of anime and generate HTML for each one
    result.forEach((anime) => {
      // Truncate the description text if it's too long and add an ellipsis
      const truncatedDescription =
        anime.description.length > maxDescriptionLength
          ? anime.description.substring(0, maxDescriptionLength - 3) + "..."
          : anime.description;

      // Add the HTML for the current anime to the list
      animeList += `
        <div>
          <a href=${anime.myanimelist_url} target="_blank">
            <img src=${anime.picture_url} alt=${anime.title} />
          </a>
          <h3 class="has-text-weight-bold">${anime.title}</h3>
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Description</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <p>${truncatedDescription}</p>
                  <a href="${anime.myanimelist_url}" target="_blank" class="button is-small is-outlined is-dark">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Add the HTML for the anime list to the result div
    resultDiv.innerHTML = animeList;
  } catch (error) {
    console.error(error);
  }
});
