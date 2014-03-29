/*
 * This module listen web sockeet and send it to rabbit and listen rabbit and send rabbit messages to
 * web sockets.
 */
module.exports = function(io, context, config) {
    
    var newFactorQueue = config.rabbitmq.queues.geodecisions_new_factor;
    var newProcessQueue = config.rabbitmq.queues.geodecisions_new_process;
    
    var encoding = config.rabbitmq.queues.encoding;

    io.sockets.on('connection', function(socket) {
        var newFactorPub = context.socket('PUB');
        var newProcessPub = context.socket('PUB');
        
        var newFactorSub = context.socket('SUB');
        var newProcessSub = context.socket('SUB');
        
        newFactorSub.setEncoding(encoding);
        newProcessSub.setEncoding(encoding);
        
        socket.on('client:newFactor', function(msg) {
            console.log("Got " + msg + ' from browser.');
            newFactorPub.connect(newFactorQueue, function() {
                console.log("Sending " + msg + ' to rabbit.');
                newFactorPub.write(JSON.stringify(msg), encoding);
            });
        });
        
        socket.on('client:newProcess', function(msg) {
            console.log("Got " + msg + ' from browser.');
            newProcessPub.connect(newProcessQueue, function() {
                console.log("Sending " + msg + ' to rabbit.newProcessQueue');
                newProcessPub.write(JSON.stringify(msg), encoding);
            });
        });
        
        newFactorSub.connect(newFactorQueue, function() {
            newFactorSub.on("data", function(data) {
                console.log(" [x] Received new_factor data: %s", data);
                socket.emit('server:newFactor', data);
                console.log("Sent " + data + ' to browser.');
            });
        });
        
        newProcessSub.connect(newProcessQueue, function() {
            newProcessSub.on("data", function(data) {
                console.log(" [x] Received newProcessQueue data: %s", data);
                socket.emit('server:newProcess', '' + data);
                console.log("Sent " + data + ' to browser.');
            });
        });
    });
    
};