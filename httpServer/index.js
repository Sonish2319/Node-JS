// The http.createServer) method includes request and response parameters which is supplied by Node.js.

// The request(req) object can be used to get information about the current HTTP request
// e.g., url, request header, and data.
// The response(res) object can be used to send a response for a current HTTP request.
// If the response from the HTTP server is supposed to be displayed as HTML,
// you should include an HTTP header with the correct content type:

const http = require("http");
const fs = require("fs");

// create server
// http.createServer((req, res) this format should be same

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Hello from the other side sonish");
  } else if (req.url == "/about") {
    res.write("Hello welcome to about section");
    res.end();
  } else if (req.url == "/contact") {
    res.end("Welcome to contact section");
  } else if (req.url == "/userApi") {
    fs.readFile(`${__dirname}/userApi/userApi.json`, "utf-8", (err, data) => {
      // console.log(data);
      const objData = JSON.parse(data);
      res.end(objData[1].first_name);
      console.log(objData[1].first_name);
    });
  } else {
    res.writeHead(404);
    res.end("<h1>404 Error. Page does not exist</h1>");
  }
});

//the .end() method is part of the http.ServerResponse object, which is used to send the final response back to the client and signal that the response is complete.

//note:
//The .end() method is necessary in Node.js to signal that the server has finished sending the response to the client. Without calling .end(), the response will remain open, and the client will continue waiting for the data, causing the request to hang indefinitely.

// 127.0.0.1 is local host port number
server.listen(8000, "127.0.0.1", () => {
  console.log("The server is listing at port number 3000");
});
