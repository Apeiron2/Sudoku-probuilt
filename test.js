const fs = require("fs");
const filePath = "./badwords.txt";
var badwords;
fs.readFile(filePath, "utf8", (err, data) => {
  badwords = data.split("\n");
});
