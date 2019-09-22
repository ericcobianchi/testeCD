const fileSystem = require('fs');

const logFilePath = __dirname + '/../../assets/games.log';
const logFile = readLogFile(logFilePath);

let games = [];
let playing = false;
let currentGame = {};
let ranking = {};

function generateLogGame() {
  resetRanking();
  logFile.forEach(line => {
    if (processIfGameIsStarting(line)) return;
    if (processIfGameIsFinishig(line)) return;
    if (processIfThereIsANewPlayer(line)) return;
    if (processIfthereIsADeath(line)) return;
  });

  const processedLog = {
    games,
    ranking
  };
  return processedLog;
}

function processIfGameIsStarting(line) {
  if (line.includes('InitGame') && !playing) {
    resetCurrentGame();
    startGame();
    return true;
  }
}

function processIfGameIsFinishig(line) {
  if ((line.includes('shutdownGame') || line.includes('InitGame')) && playing) {
    finishGame();
    games.push(currentGame);
    resetCurrentGame();
    return true;
  }
}

function resetRanking() {
  ranking = {};
}

function processIfThereIsANewPlayer(line) {
  if (line.includes('n\\')) {
    player = identifyPlayer(line);
    if (!currentGame.players.includes(player)) {
      currentGame.players.push(player);
    }
    if (!currentGame.kills[player]) {
      currentGame.kills[player] = 0;
    }
    return true;
  }
}

function processIfthereIsADeath(line) {
  if (line.includes('killed')) {
    currentGame.total_kills++;
    let playerWhoKilled = identifyKiller(line);
    let playerWhoDied = identifyKilled(line);
    let deathCause = identifyDeathCause(line);

    if (processIfWasKilledByTheWorld(playerWhoKilled, playerWhoDied)) {
      return true;
    }

    processDeathCause(deathCause);
    addDeathToTheCurrentGame(playerWhoKilled);
    addDeathToTheRanking(playerWhoKilled);
    return true;
  }
}

function processIfWasKilledByTheWorld(playerWhoKilled, playerWhoDied) {
  if (playerWhoKilled === '<world>') {
    if (currentGame.kills[playerWhoDied] && ranking[playerWhoDied]) {
      currentGame.kills[playerWhoDied]--;
      ranking[playerWhoDied]--;
    }
    return true;
  }
}

function processDeathCause(deathCause) {
  if (currentGame.death_cause[deathCause]) {
    currentGame.death_cause[deathCause]++;
  } else {
    currentGame.death_cause[deathCause] = 1;
  }
}

function addDeathToTheCurrentGame(playerWhoKilled) {
  if (currentGame.kills[playerWhoKilled]) {
    currentGame.kills[playerWhoKilled]++;
  } else {
    currentGame.kills[playerWhoKilled] = 1;
  }
}

function addDeathToTheRanking(playerWhoKilled) {
  if (ranking[playerWhoKilled]) {
    ranking[playerWhoKilled]++;
  } else {
    ranking[playerWhoKilled] = 1;
  }
}

function resetCurrentGame() {
  currentGame = currentGame = {
    total_kills: 0,
    players: [],
    kills: {},
    death_cause: {}
  };
}

function readLogFile(filePath) {
  return fileSystem.readFileSync(logFilePath, 'utf-8').split('\n');
}

function identifyKiller(logLine) {
  let regexKiller = /(?<=[0-9]:\s)(.*?)(?=\skilled)/;
  let killer = logLine.match(regexKiller)[0];
  return killer;
}

function identifyKilled(logLine) {
  let regexKilled = /(?<=killed\s)(.*?)(?=\sby)/;
  let killed = logLine.match(regexKilled)[0];
  return killed;
}

function identifyDeathCause(logLine) {
  let regexDeathCause = /(?<=by\s).*$/;
  let deathCause = logLine.match(regexDeathCause)[0];
  return deathCause;
}

function identifyPlayer(logLine) {
  let regexPlayerIdentification = /(?<=n\\)(.*?)(?=\\t)/;
  let playerIdentification = logLine.match(regexPlayerIdentification)[0];
  return playerIdentification;
}

function startGame() {
  playing = true;
}

function finishGame() {
  playing = false;
}

module.exports = {
  generateLogGame,
  identifyKiller,
  identifyKilled,
  identifyDeathCause,
  identifyPlayer
};
