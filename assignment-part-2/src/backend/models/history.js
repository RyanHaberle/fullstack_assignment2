const mongoose = require('mongoose');

// Chat history
const historySchema = mongoose.Schema({
    socket_id: {type: String, required: true},
    username: {type: String, required: true},
    message: {type: String, required: true},
    time : { type : Date, default: Date.now },
    room: {type: String, required: true},
})

module.exports = mongoose.model('History', historySchema);