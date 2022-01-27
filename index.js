const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 9010});
let int = 0;
wss.on('connection', function connection(ws) {
  let plants = " ";
  console.log("New Connection");
  const fs = require('fs');
  //Sendet die Pflanzendaten an das Frontend
  fs.readFile('./pflanzenarten.plant', function read(err, data) {
    if (err) {throw err;}
    plants = data.toString();
    ws.send(plants);
  });
  let nopcounter = 1;
  ws.on('message', function incoming(message) {
    if(message === 'nop'){
      let pos;
      fs.readFile('./pos.rob', function read(err, data) {
        if (err) {throw err;}
        //console.log(data.toString());
        pos = data.toString();
        ws.send(pos);
      });
      //console.log(nopcounter);
      nopcounter++;
      return;
    }
    console.log(message.toString());
    int++;
    if(int > 7){
      int = 0;
    }
    console.log(new Date().toJSON().toString());
    fs.writeFile(int.toString() + '.control', message.toString(), function (err) {
    if (err) throw err;
    });
  });
});


