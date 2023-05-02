//Constants

const apiUrl = "https://myanimelist.p.rapidapi.com/manga/top";

const headers = new Headers({
	'X-RapidAPI-Key': '2a8860bed8mshb5bc10768805e3dp1aad13jsn412b7483e58a',
    'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
});

var mangaBtn = document.getElementById("mangaBtn");

mangaBtn.addEventListener("click", async function () {
	// Get the select element and its selected options
	var select = document.querySelector("select");
	var selectedOptions = Array.from(select.selectedOptions);

  
	// Map the selected options to their values
	var selectedValues = selectedOptions.map((option) => option.value);
  
	// Log the selected values to the console
	console.log(selectedValues);
  
	// Call the API with the selected values
	const mangaData = await fetchMangaData(selectedValues, apiUrl, headers);
  
	// Get the results div element
	const resultsDiv = document.getElementById("mangaResults");
  
	// Clear previous results
	resultsDiv.innerHTML = '';
  
	// Loop through the mangaData array and create elements for each item
	mangaData.forEach((item) => {
	  // Create a container div element for the item
	  const itemDiv = document.createElement("div");
	  itemDiv.className = "manga-item";
  
	  // Set the content of the item div with separate elements for each property
	  itemDiv.innerHTML = `
		<h3>${item.title}</h3>
		<img src="${item.picture_url}" alt="${item.title}">
		<p>Rank: ${item.rank}</p>
		<p>Type: ${item.type}</p>
		<p>published: ${item.aired_on}</p>
	  `;
  
	  // Append the item div to the results div
	  resultsDiv.appendChild(itemDiv);
	});
  
	console.log(mangaData);
  });
  
  


async function fetchMangaData(selectedValues, apiUrl, headers) {
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


  