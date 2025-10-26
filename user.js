import fs from "fs";

const rawData = fs.readFileSync("user.json", "utf-8");
const userData = JSON.parse(rawData);

console.log(userData.name); // Hafiz Shabab
