
const express = require('express');
const shell = require('shelljs');
const publicDir = require('path').join(__dirname,'/public');

const server = express();
server.use(express.static(publicDir));
server.set('view engine', 'ejs');

// REST API for different cases 
server.post('/api/:num/:state', (req, res) => {
    let state = req.params.state;
    let num = req.params.num;
    let data = {
        state,
        num
    };
    shell.exec(`/home/pi/mynode/scripts/${num}${state}.sh`);
    console.log(`Plug ${num} turned ${state} at: ${new Date().toISOString()}`);
    res.send(data);
});

server.post('/ir/:dev/:key', (req,res) => {
    let device = req.params.dev;
    let key = req.params.key;
    let result = `Device: ${device} pressed key: ${key}`;
    shell.exec(`/home/pi/mynode/scripts/${device}_${key}.sh`);
    console.log(result);
    res.send(result);

})

// listens to port with console log
let port = 8080;
server.listen(port, () => console.log(`Server is running on  ${port}!`));

