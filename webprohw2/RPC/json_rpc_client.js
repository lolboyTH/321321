const jayson = require('jayson');
const client = jayson.client.http({ port: 3000 });

console.log("--- Starting Polling (Standard RPC) ---");

client.request('toggleSmartLight', {roomName: "Bedroom", brightness: 50}, (err, response) => {
    if(err) return console.log(err);

    if (response.error) {
        console.error(`[RPC ${response.error.code}] ${response.error.message}`);
        return null;
    }

    console.log(response.result);
})