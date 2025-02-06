const http = require("http");
const https = require("https");
const fs = require("fs");

const homeFile = fs.readFileSync("home.html", "utf-8");

// Function to replace placeholders in the HTML template with actual weather data
const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%city%}", orgVal.name);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    // Make a GET request to the OpenWeatherMap API
    const api_url =
      "https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&units=metric&appid=070d1d6cb51433275fa33741f6caae74";

    https.get(api_url, (response) => {
      let data = "";

      // Listen for data chunks from the API response
      response.on("data", (chunk) => {
        data += chunk; // Concatenate chunks of data

        const obData = JSON.parse(data); // Parse the data as JSON
        const arrData = [obData]; // Convert the object to an array

        // Replace placeholders in the HTML with actual weather data
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");

        // Send the response back to the client (browser)
        res.write(realTimeData);
      });

      // Once all the data is received
      response.on("end", () => {
        res.end(); // End the response
      });
    });
    response.on("error", (err) => {
      console.log("Error fetching data: ", err.message);
    });
  }
});

// Start the server on port 2000
server.listen(2000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:2000");
});
