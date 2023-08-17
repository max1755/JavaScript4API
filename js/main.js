//NASA API

const apiKey = "gX15BQeqyJeQX14Xtw9RjbeLxpCrcesEiGi5jYoC";
const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// Fetch data from APOD
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    if (data.media_type === "image") {
      document.getElementById("apodImage").src = data.url;
      console.log(data.explanation);
    } else {
      console.warn("Today is not an image type media");
    }
  })
  .catch((error) => console.error("Error fetching APOD:", error));

const epicEndpoint = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`;

fetch(epicEndpoint)
  .then((response) => response.json())
  .then((data) => {
    if (data && data.length > 0) {
      const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${data[0].date.slice(
        0,
        4
      )}/${data[0].date.slice(5, 7)}/${data[0].date.slice(8, 10)}/png/${
        data[0].image
      }.png`;
      document.getElementById("epicImage").src = imageUrl;
    }
  })
  .catch((error) => console.error("Error fetching EPIC data:", error));

const roverEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

// Fetch data from Mars Rover Photos endpoint
fetch(roverEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const roverDiv = document.getElementById("roverData");

    if (data.photos.length === 0) {
      roverDiv.innerHTML = "<p>No photos available for the specified Sol.</p>";
      return;
    }

    let content = "<ul>";
    for (let photo of data.photos) {
      content += `<li><img src="${photo.img_src}" alt="Rover photo taken on ${photo.earth_date}" width="200"></li>`;
    }
    content += "</ul>";

    roverDiv.innerHTML = content;

    //open an image in a new tab
    const list = document.querySelector("ul");
    list.addEventListener("click", (e) => {
      if (e.target && e.target.nodeName === "IMG") {
        let imgURL = e.target.getAttribute("src");
        window.open(imgURL, "_blank");
      }
    });
  })
  .catch((error) => console.error("Error fetching Mars Rover Photos:", error));

// SpaceX API
const spaceXApiEndpoint = `https://api.spacexdata.com/v5/launches/latest`;

fetch(spaceXApiEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const newsDiv = document.getElementById("newapiData");
    const youtube_id = data.links.youtube_id;
    const content = `
      <h3>${data.name}</h3>
      <p>Date: ${new Date(data.date_utc).toLocaleDateString()}</p>
      <p>Watch:<br><iframe width = "420" height = "315" src = "https://www.youtube.com/embed/${youtube_id}"></iframe></p>
      <img src="${data.links.patch.small}" alt="${data.name} Patch">
    `;
    newsDiv.innerHTML = content;
  })
  .catch((error) => console.error("Error fetching SpaceX data:", error));