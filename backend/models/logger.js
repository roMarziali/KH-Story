const fs = require('fs');

logSegmentsConsultation = function (userWebAgent) {
  const file = fs.readFileSync('./data/consultations.log', 'utf8');
  const lines = file.split('\n');
  const dateTime = new Date().toISOString();
  const log = JSON.stringify({ dateTime, userWebAgent });
  lines.push(log);
  const newLines = lines.join('\n');
  fs.writeFileSync('./data/consultations.log', newLines);
}

module.exports = { logSegmentsConsultation };
