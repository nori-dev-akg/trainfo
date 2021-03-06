const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const serverPort = 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * 音声ファイルを取得する
 */
app.get('/googlehome/:voiceFileName', (req, res) => {
  const voiceFileName = req.params.voiceFileName;
  if (!voiceFileName) {
    res.status(400).send('Invalid Parameters.');
}

  const file = fs.readFileSync('/home/pi/tarinfo/voice/' + voiceFileName, 'binary');
  res.setHeader('Content-Length', file.length);
  res.write(file, 'binary');
  res.end();
});

app.listen(serverPort, () => {
  console.log(`Start api-server. Port is ${serverPort}`);
})