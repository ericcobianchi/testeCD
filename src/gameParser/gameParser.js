const fileSystem = require("fs");

const logFilePath = __dirname + "/../../assets/games.log";
const logFile = readLogFile(logFilePath);

function logParsed() {
  return logFile;
}

function readLogFile(filePath) {
  return fileSystem.readFileSync(logFilePath, "utf-8").split("\n");
}

module.exports = { logParsed };
