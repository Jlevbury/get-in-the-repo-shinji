// Select elements from the DOM
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultTable = document.getElementById("resultTable");
const searchForm = document.getElementById("searchForm");
const searchHistoryDropdown = document.getElementById("searchHistoryDropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const animeMangaDropdown = document.getElementById("anime-MangaDropdown");
const clearHistoryButton = document.getElementById("clearHistoryButton");

// Initialize search history array from local storage or empty array
const searchHistoryRaw = localStorage.getItem("searchHistory");
let searchHistory = searchHistoryRaw ? JSON.parse(searchHistoryRaw) : [];


const maxDescriptionLength = 100;
// Update search history in local storage and dropdown menu
const updateSearchHistory = () => {
  // Clear the dropdown menu
  dropdownContent.innerHTML = "";
  // Loop through the search history array and add each search term to the dropdown menu
  searchHistory.forEach((searchTermObj) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.textContent = searchTermObj.term;
    dropdownItem.addEventListener("click", () => {
      searchInput.value = searchTermObj.term;
      animeMangaDropdown.value = searchTermObj.type;
      searchButton.click();
    });
    dropdownContent.appendChild(dropdownItem);
  });
  // Save the updated search history array in local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};
// Call updateSearchHistory on page load to display search history
updateSearchHistory();

// Attach an event listener to the search button
searchButton.addEventListener("click", async () => {
  // Get the anime/manga name from the search input
  const animeName = searchInput.value;
  const animeMangaChoice = animeMangaDropdown.value;
// Add the search term and type to the search history array if it's not already there
  if (!searchHistory.some((item) => item.term === animeName && item.type === animeMangaChoice)) {
    searchHistory.push({ term: animeName, type: animeMangaChoice });
    updateSearchHistory();
  }
  // Set up the API URL and options
  const url = `https://myanimelist.p.rapidapi.com/${animeMangaChoice}/search/${animeName}/10`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cfc7111e6dmsh224ed1804628074p194dc8jsn8123165fc88e",
      "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
    },
  };
  const fetchAnime = async (url, options) => {
    try {
      // Check if the search term is not undefined before making the API call
      if (searchInput.value !== "undefined") {
        // Send a request to the API and get the response
        const response = await fetch(url, options);
        const result = await response.json();

    // Clear the previous search results
resultTable.innerHTML = "";

// Loop through the list of anime and generate HTML for each one
result.forEach((anime, index) => {
  // Truncate the description text if it's too long and add an ellipsis
  const truncatedDescription =
    anime.description.length > maxDescriptionLength
      ? anime.description.substring(0, maxDescriptionLength - 3) + "..."
      : anime.description;

  // Create a div element for the current anime
  //const animeDiv = document.createElement("div");
  //animeDiv.classList.add("column", "is-full", "is-one-third-tablet", "is-one-quarter-desktop", "is-one-fifth-widescreen");

  // Create a table row element
  const tableRow = document.createElement("tr");

  // Create a table cell element
  const tableCell = document.createElement("td");

  // Add the HTML for the current anime to the table cell
  tableCell.innerHTML = `
    <div class="column">
      <a href="https://www.youtube.com/results?search_query=${anime.title}+trailer" target="_blank">
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
  // Append the table cell to the table row
  tableRow.appendChild(tableCell);

  // Append the table row to the resultTable
  if (index % 2 === 0) {
    resultTable.appendChild(tableRow);
  } else {
    resultTable.lastChild.appendChild(tableCell);
  }
});
}
} catch (error) {
  console.error(error);
}
};
  fetchAnime(url, options);
});

// Attach an event listener to the Clear History button
clearHistoryButton.addEventListener("click", () => {
  // Clear local storage and search history array
  localStorage.removeItem("searchHistory");
  searchHistory = [];

  // Update search history dropdown
  updateSearchHistory();
});
