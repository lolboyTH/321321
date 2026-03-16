const jayson = require('jayson');

const server = jayson.server({
    getCurrentTemperature: function(args, callback) {
        const temp = (Math.random() * (30 - 20) + 20).toFixed(2);

        callback(null, {
            value: temp,
            unit: "Celsius",
            timestamp: new Date().toLocaleTimeString()
        });
    },

    toggleSmartLight: function(args, callback) {
        const { roomName, brightness } = args;

        if (roomName === undefined) {
            return callback({
                code: -32602,
                message: "roomName is required"
            });
        }

        if (brightness === undefined) {
            return callback({
                code: -32602,
                message: "brightness is required"
            });
        }

        if (brightness < 0 || brightness > 100) {
            return callback({
                code: -32001,
                message: "Brightness must be between 0 and 100"
            });
        }

        const respondMessage = `Light in ${roomName} set to ${brightness}%`;

        callback(null, respondMessage);
    }

});

server.http().listen(3000, () => {
    console.log("JSON-RPC Server running on port 3000");
});
