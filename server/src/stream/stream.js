/*
 * Serve content over a socket
 */
module.exports = function(io, context, config) {
    
    var queue = config.rabbitmq.queues.geodecisions_stream;
    var newProcessQueue = 'geodecisions_new_process';
    
    var encoding = config.rabbitmq.queues.encoding;

    io.sockets.on('connection', function(connection) {
        var pub = context.socket('PUB');
        var pub2 = context.socket('PUB');
        
        var sub = context.socket('SUB');
        var sub2 = context.socket('SUB');
        
        sub.setEncoding('utf8');
        
        connection.on('client:newFactor', function(msg) {
            console.log("Got " + msg + ' from browser.');
            pub.connect(queue, function() {
                console.log("Sending " + msg + ' to rabbit.');
                pub.write(JSON.stringify(msg), encoding);
            });
        });
        
        connection.on('client:newProcess', function(msg) {
            console.log("Got " + msg + ' from browser.');
            pub2.connect(newProcessQueue, function() {
                console.log("Sending " + msg + ' to rabbit.newProcessQueue');
                pub2.write(JSON.stringify(msg), encoding);
            });
        });
        
        sub.connect(queue, function() {
            sub.on("data", function(data) {
                console.log(" [x] Received new_factor data: %s", data);
                connection.emit('server:newFactor', data);
                console.log("Sent " + data + ' to browser.');
            });
        });
        
        sub2.connect(newProcessQueue, function() {
            sub2.on("data", function(data) {
                console.log(" [x] Received newProcessQueue data: %s", data);
                connection.emit('server:newProcess', '' + data);
                console.log("Sent " + data + ' to browser.');
            });
        });
    });
    
};