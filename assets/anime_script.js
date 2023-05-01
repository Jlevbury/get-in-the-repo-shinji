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
  
	// Get the results div element
	const resultsDiv = document.getElementById("animeResult");
  
	// Clear previous results
	resultsDiv.innerHTML = '';
  
	// Loop through the animeData array and create elements for each item
	animeData.forEach((item) => {
	  // Create a container div element for the item
	  const itemDiv = document.createElement("div");
	  itemDiv.className = "anime-item";
  
	  // Set the content of the item div with separate elements for each property
	  itemDiv.innerHTML = `
		<h3>${item.title}</h3>
		<img src="${item.picture_url}" alt="${item.title}">
		<p>Rank: ${item.rank}</p>
		<p>Type: ${item.type}</p>
		<p>Aired on: ${item.aired_on}</p>
	  `;
  
	  // Append the item div to the results div
	  resultsDiv.appendChild(itemDiv);
	});
  
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
  
	  // Slice the responseData array to get the first 5 items
	  const firstFiveItems = responseData.slice(0, 5);
  
	  return firstFiveItems;
	 
		} catch (error) {
	  // Handle network error
	  console.error("API request failed with network error", error);
	  return null;
	}
  }

  const settings = {
	async: true,
	crossDomain: true,
	url: 'https://myanimelist.p.rapidapi.com/anime/top/bypopularity',
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '35e91351f9msh6c0ad19b1337776p1fab34jsn871f70676154',
	  'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
	}
  };
  
  $.ajax(settings).done(function (response) {
	// Return only the first 5 items of the response array
	const top5Anime = response.slice(0, 5);
	console.log(top5Anime);
	// Get the results div element
	const popularDiv = document.getElementById("popular");
	// Clear previous results
	popularDiv.innerHTML = '';

	// Loop through the animeData array and create elements for each item
	top5Anime.forEach((item) => {
		// Create a container div element for the item
		const itemDiv = document.createElement("div");
		itemDiv.className = "anime-item";
	
		// Set the content of the item div with separate elements for each property
		itemDiv.innerHTML = `
		  <h3>${item.title}</h3>
		  <img src="${item.picture_url}" alt="${item.title}">
		  <p>Rank: ${item.rank}</p>
		  <p>Type: ${item.type}</p>
		  <p>Aired on: ${item.aired_on}</p>
		`;
	
		// Append the item div to the results div
		popularDiv.appendChild(itemDiv);
	  });


  });
  