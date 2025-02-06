const http = require("http");
const fs = require("fs");

// this is one way to render html file into our server using routing
// const homeFile = fs.readFileSync("home.html", "utf-8");

// const server = http.createServer((req, res) => {
//   if (req.url == "/") {
//     res.write(homeFile);
//     res.end();
//   }
// });

// server.listen(2000, "127.0.0.1");





// there is another way that is using npm package "request"
//first create package.json file by npm init
// then insatll request package from npmjs.com (https://www.npmjs.com/package/requests)

const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8"); // "utf-8" skipping buffer data

const replaceVal = (tempVal, orgVal) => {
  // tempVal represents the HTML template string.
  // tempVal are those placeholder in the html file and orgVal are the value which will replace tempVal
  let tempo = tempVal; /// tempo stores all the template {%%} variable
  tempo = tempo.replace("{%tempval%}", orgVal.main.temp);
  tempo = tempo.replace("{%tempmin%}", orgVal.main.temp_min);
  tempo = tempo.replace("{%tempmax%}", orgVal.main.temp_max);
  tempo = tempo.replace("{%country%}", orgVal.sys.country);
  tempo = tempo.replace("{%city%}", orgVal.name);

  return tempo;
};

const server = http.createServer((req, res) => {
  // now create a url for home

  if (req.url == "/") { // route for /
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=${req.}&units=metric&appid=070d1d6cb51433275fa33741f6caae74" // &units=metric convets F to C
      // 
    ) // This sends a request to our API
      .on("data", (chunk) => {
        // .on sets an event listener for the data event
        const obData = JSON.parse(chunk); // json to object
        const arrData = [obData]; // object to array of an object
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join(""); // homeFile this is my html file and val is the current value of map array

        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);

        console.log("end");
        res.end();
      });
  }
});

server.listen(2000, "127.0.0.1");
