const mongoose = require('mongoose');

//socket events log
const eventSchema = mongoose.Schema({
    socket_id: {type: String, required: true},
    username: {type: String, required: true},
    action: {type: String, required: true},
    time : { type : Date, default: Date.now },
    room: {type: String, required: true},
})

module.exports = mongoose.model('Events', eventSchema)