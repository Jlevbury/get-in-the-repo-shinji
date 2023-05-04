// Select elements from the DOM
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("resultDiv");
const searchForm = document.getElementById("searchForm");
const searchHistoryDropdown = document.getElementById("searchHistoryDropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const animeMangaDropdown = document.getElementById("anime-MangaDropdown");

// Initialize search history array from local storage or empty array
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Update search history in local storage and dropdown menu
const updateSearchHistory = () => {
    // Clear the dropdown menu
    dropdownContent.innerHTML = "";
    // Loop through the search history array and add each search term to the dropdown menu
    searchHistory.forEach((searchTerm) => {
      const dropdownItem = document.createElement("a");
      dropdownItem.classList.add("dropdown-item");
      dropdownItem.textContent = searchTerm;
      dropdownItem.addEventListener("click", () => {
        searchInput.value = searchTerm;
        searchButton.click();
      });
      dropdownContent.appendChild(dropdownItem);
    });
    // Save the updated search history array in local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  };
  
  // Add an event listener to the search form to capture search terms
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value;
    // Add the search term to the search history array if it's not already there
    if (!searchHistory.includes(searchTerm)) {
      searchHistory.push(searchTerm);
      updateSearchHistory();
    }
    // Submit the search form
    searchButton.click();
  });
  
  // Call updateSearchHistory on page load to display search history
  updateSearchHistory();
  
// Attach an event listener to the search button
searchButton.addEventListener("click", async () => {
  // Get the anime name from the search input
  const animeName = searchInput.value;

  // Set up the API URL and options
  const url = `https://myanimelist.p.rapidapi.com/anime/search/${animeName}/10`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cfc7111e6dmsh224ed1804628074p194dc8jsn8123165fc88e",
      "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
    },
  };
// Attach an event listener to the anime-MangaDropdown to capture user choice
animeMangaDropdown.addEventListener("change", () => {
    const animeMangaChoice = animeMangaDropdown.value;
    // Modify the API URL based on the anime-MangaDropdown choice
    const url = `https://myanimelist.p.rapidapi.com/${animeMangaChoice}/search/${animeName}/10`;
    // Call the API with the modified URL
    fetchAnime(url, options);
  });
  
  // Extract the API call to a separate function
  const fetchAnime = async (url, options) => {
    try {
      // Send a request to the API and get the response
      const response = await fetch(url, options);
      const result = await response.json();
  
      // ...rest of the code to generate HTML and display results...
    } catch (error) {
      console.error(error);
    }
  };
  
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

