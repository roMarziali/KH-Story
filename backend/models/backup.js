const fs = require("fs");
const backupDir = "./backup";
const dataDir = "./data";
const crypto = require('crypto');
const { has } = require("config");

exports.backup = async function () {
  const filesToBakcup = ["annotations", "story"]
  for (const fileName of filesToBakcup) {
    backupFile(fileName);
  }
};

function backupFile(fileName) {
  const file = `${dataDir}/${fileName}.json`;
  const backupFolder = `${backupDir}/${fileName}`;
  if (existsAnIdenticalBackup(file, backupFolder)) return;
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }
  const todayIso = new Date().toISOString().split('T')[0];
  const backupFile = `${backupFolder}/${fileName}_${todayIso}.json`;
  fs.copyFileSync(file, backupFile);
}

function existsAnIdenticalBackup(file, backupFolder) {
  if (!fs.existsSync
    (backupFolder) || fs.readdirSync(backupFolder).length === 0) {
    return false;
  }

  const fileBuffer = fs.readFileSync(file);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const fileHash = hashSum.digest('hex');

  const files = fs.readdirSync(backupFolder);
  const lastBackup = files[files.length - 1];

  const lastBackupBuffer = fs.readFileSync(`${backupFolder}/${lastBackup}`);
  const hashSumBackup = crypto.createHash('sha256');
  hashSumBackup.update(lastBackupBuffer);
  const lastBackupHash = hashSumBackup.digest('hex');

  return (fileHash === lastBackupHash);

}
