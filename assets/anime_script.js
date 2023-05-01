//Constants
const apiEndpoint = "https://api.myanimelist.net/v2/anime?q=one&limit=1000";
const accessToken =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc5ZWRkMzNhZWYxYjFjOTFjM2IxY2JhZTUzZWFkMjQ1MjI3YWE5MzliODVkNmVmNWJhNzA0ZTUxZjNjNzBkYWM1NmEwNGFmMjAxM2M5MTIwIn0.eyJhdWQiOiI4NzgxZDk1YjFlMGJmYWM3NGYyMWIxYTMzOWE1ZjBjYiIsImp0aSI6Ijc5ZWRkMzNhZWYxYjFjOTFjM2IxY2JhZTUzZWFkMjQ1MjI3YWE5MzliODVkNmVmNWJhNzA0ZTUxZjNjNzBkYWM1NmEwNGFmMjAxM2M5MTIwIiwiaWF0IjoxNjgyNjE3NDM1LCJuYmYiOjE2ODI2MTc0MzUsImV4cCI6MTY4NTIwOTQzNSwic3ViIjoiMTY2Mzg4NTciLCJzY29wZXMiOltdfQ.WhvhfOQ9_XjWel2NEU0IGBEqpWstPde69JR-no0-OVzmyJclfhpUnhffxsr1r8uxO0d23QMZS38JUAMRst3_Rl6q111sN1xSf5wvf0MddG5zmS-XLgMgBTP5R4xxamCiwUBr0EZpSIjxo49DZMQ9wV7omeqPe-a8ojW-X86LdDhrR0Ml9-16-GNpWPhNc7CFmG_CcudDSl2_HSXYiI1UyVtrNnCqw8KM9vfW0LWbprlyOyQe1WxzTmzG9wJAcZ_C6brzI4i2QWK15Ec73bOEXXfzYaYlXD9k8Lxmpm8N8AsBFMU16MmFH0lNnxALA9vJGv8tnrujNUO_76QeXLkOQQ";
//const refresh_token= 'def502001d251b2c6426b3ee78114e632ca61ddb0f7afa6f1f05d610064f7a84d005a43f231ba73ad7203dfa4e489fedb476b757f13f76e7cc7259cde235e3237ce51ae428fb24519f1de8d3eef6ad89c1ebb82828a9c4be87a962472f92cdf71980902b6cd8b8a3d962cced025734f1fe521bfe15e0285b8b7a15f488b96e0f5ad1ac0e3a70266000a52d05bfa2661f1729d3bdaa101b3f925ca62263811b198a02d59ca4172a1569ddce53ebbb6f2fbd29881066fb7d180a45c613a50de6e7f7fdf14e98d21b7c445b7fc53aad1f6860dc3a4055a4fa50495b91b482c6f61b9a16f715daac82c622d7c4d2a3803d6c9843c2455ad80c4142ec86a8d48d2517086a64bfdc2db292d0dd04f1e453061a7202fb168ce755d6c13e158ed84ae0bb95dc4d1bfbb09794933c264c563a5d4e70693f516d3206754f2e28901336083579b8e162474a2f402c4472e326445aa4e42aff23c854398cd3eff64ae4a2da22e4c55c675caf64ca011a2c452b01c3c0eed1746b63c1776a4502fe6499f68b645900f4c82b18f8f83f';
var animeList = [];

/// Function to fetch the anime data from the MyAnimeList API
/*async function fetchAnimeData() {
	try {
		const response = await fetch(apiEndpoint, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
fetchAnimeData();
// Function to generate a list of 10 random anime titles and descriptions
function generateRandomAnimeList(animeList) {
	const randomList = [];
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * animeList.length);
		const anime = animeList[randomIndex];
		randomList.push(`<b>${anime.title}</b>: ${anime.synopsis}`);
		console.log(`Added ${anime.title} to the list.`);
	}
	console.log("Random anime list generated:", randomList);
	return randomList;
}

// Event listener for button click
/*document.getElementById("anime-button").addEventListener("click", function () {
	fetchAnimeData()
		.then((animeList) => generateRandomAnimeList(animeList))
		.then(
			(randomList) =>
				(document.getElementById("anime-results").innerHTML =
					randomList.join("<br><br>"))
		)
		.catch((error) => console.error(error));
});*/
/* Get the submit button element
var animeBtn = document.getElementById("animeBtn");

// Add a click event listener to the submit button
animeBtn.addEventListener("click", function() {
  // Get the select element and its selected options
  var select = document.querySelector('select');
  var selectedOptions = Array.from(select.selectedOptions);

  // Map the selected options to their values
  var selectedValues = selectedOptions.map(option => option.value);

  // Log the selected values to the console
  console.log("click");
  console.log(selectedValues);
});

//function pickTitles(){
//	var apiURL=`https://api.myanimelist.net/v2/anime?q=${selectedValues}&limit=3`;
//}
async function queryAnimeRanking() {
	const apiUrl = "https://api.myanimelist.net/v2/anime/ranking";
  
	// Set up the headers for the API request
	const headers = new Headers();
	headers.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc5ZWRkMzNhZWYxYjFjOTFjM2IxY2JhZTUzZWFkMjQ1MjI3YWE5MzliODVkNmVmNWJhNzA0ZTUxZjNjNzBkYWM1NmEwNGFmMjAxM2M5MTIwIn0.eyJhdWQiOiI4NzgxZDk1YjFlMGJmYWM3NGYyMWIxYTMzOWE1ZjBjYiIsImp0aSI6Ijc5ZWRkMzNhZWYxYjFjOTFjM2IxY2JhZTUzZWFkMjQ1MjI3YWE5MzliODVkNmVmNWJhNzA0ZTUxZjNjNzBkYWM1NmEwNGFmMjAxM2M5MTIwIiwiaWF0IjoxNjgyNjE3NDM1LCJuYmYiOjE2ODI2MTc0MzUsImV4cCI6MTY4NTIwOTQzNSwic3ViIjoiMTY2Mzg4NTciLCJzY29wZXMiOltdfQ.WhvhfOQ9_XjWel2NEU0IGBEqpWstPde69JR-no0-OVzmyJclfhpUnhffxsr1r8uxO0d23QMZS38JUAMRst3_Rl6q111sN1xSf5wvf0MddG5zmS-XLgMgBTP5R4xxamCiwUBr0EZpSIjxo49DZMQ9wV7omeqPe-a8ojW-X86LdDhrR0Ml9-16-GNpWPhNc7CFmG_CcudDSl2_HSXYiI1UyVtrNnCqw8KM9vfW0LWbprlyOyQe1WxzTmzG9wJAcZ_C6brzI4i2QWK15Ec73bOEXXfzYaYlXD9k8Lxmpm8N8AsBFMU16MmFH0lNnxALA9vJGv8tnrujNUO_76QeXLkOQQ");
  
	// Build the query parameters for the API request
	const queryParameters = new URLSearchParams();
	queryParameters.append("ranking_type", "all");
	queryParameters.append("limit", "4");
  
	// Build the API URL with the query parameters
	const url = `${apiUrl}?${queryParameters.toString()}`;
  
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


  }*/
// Get the submit button element
var animeBtn = document.getElementById("animeBtn");

// Add a click event listener to the submit button
animeBtn.addEventListener("click", async function() {
  // Get the select element and its selected options
  var select = document.querySelector('select');
  var selectedOptions = Array.from(select.selectedOptions);

  // Map the selected options to their values
  var selectedValues = selectedOptions.map(option => option.value);

  // Log the selected values to the console
  console.log(selectedValues);

  // Call the API with the selected values
  const animeData = await queryAnimeRanking(selectedValues);
  console.log(animeData);
});

async function queryAnimeRanking(selectedValues) {
  const apiUrl = "https://api.myanimelist.net/v2/anime";

  // Set up the headers for the API request
  const headers = new Headers();
  headers.append("Authorization", "Bearer YOUR_TOKEN");

  // Build the query parameters for the API request
  const queryParameters = new URLSearchParams();
  queryParameters.append("q", selectedValues.join(","));
  queryParameters.append("limit", "3");

  // Build the API URL with the query parameters
  const url = `${apiUrl}?${queryParameters.toString()}`;

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


