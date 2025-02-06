// JSON stands for JavaScript Object Notation.
// JSON is a lightweight
// format for storing and transporting data.
// JSON is often
// used when data is sent from a server to a web page.

// const bioData = {
//   name: "sonish",
//   age: 26,
//   channel: "eric eagle",
// };
// // this is JSON data of above object
// // {"name":"sonish","age":26,"channel":"eric eagle"}

// // convert object to JSON
// // stringfy() method is used when we need to convert object to JSON data
// const jsonData = JSON.stringify(bioData);
// console.log(jsonData);

// // convert object to JSON
// // parse() method is used when we need to convert JSON to object data
// const objdata = JSON.parse(jsonData);
// console.log(objdata);

const fs = require("fs");

//Task
const bioData = {
  name: "sonish",
  age: 26,
  channel: "eric eagle",
};

//convert object to JSON format
const jsonData = JSON.stringify(bioData);

// save that json data to new .json file

// fs.writeFile("data.json", jsonData, (err) => {
//   console.log(err);
// });

// read data.json file

// fs.readFile("data.json", "utf-8", (err, data) => {
//   console.log(data);
// });

//convert that json data to object

fs.readFile("data.json", "utf-8", (err, data) => {
  console.log(data);
  const orgData = JSON.parse(data);
  console.log(orgData);
//   fs.appendFile("data.json", JSON.stringify(orgData), (err) => {
//     console.log(err);
//   });
});

