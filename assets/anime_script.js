// Constants
const apiUrl = "https://myanimelist.p.rapidapi.com/anime/top";
const headers = new Headers({
  "X-RapidAPI-Key": "35e91351f9msh6c0ad19b1337776p1fab34jsn871f70676154",
  "X-RapidAPI-Host": "myanimelist.p.rapidapi.com"
});

// Get the submit button element
var animeBtn = document.getElementById("animeBtn");

// Add a click event listener to the submit button
animeBtn.addEventListener("click", async function () {
  // Get the select element and its selected options
  var select = document.querySelector("select");
  var selectedOptions = Array.from(select.selectedOptions);

  // Map the selected options to their values
  var selectedValues = selectedOptions.map((option) => option.value);

  // Log the selected values to the console
  console.log(selectedValues);

  // Call the API with the selected values
  const animeData = await fetchAnimeData(selectedValues, apiUrl, headers);
  console.log(animeData);
});

async function fetchAnimeData(selectedValues, apiUrl, headers) {
	// Concatenate the selected values into a single string
	const selectedValuesString = selectedValues.join("/");
  
	// Build the API URL with the selected values
	const url = `${apiUrl}/${selectedValuesString}`;
  
	try {
	  // Make the API request using fetch
	  const response = await fetch(url, { headers });
  
	  if (!response.ok) {
		// Handle error response
		console.error(`API request failed with status code ${response.status}`);
		return null;
	  }
  
	  // Parse the JSON response
	  const responseData = await response.json();
	  return responseData;
	} catch (error) {
	  // Handle network error
	  console.error("API request failed with network error", error);
	  return null;
	}
  }
  