//server side
//This is a test 
//testestestest
//testestestest
//testestestest
//testestestest
//testestestest
//testestestest
//testestestest
//testestestest
//testestestest

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')



var Events = require("./../backend/models/events");
var History = require("./../backend/models/history")
var mongoose = require('mongoose');

var path = require("path")

//set the template engine
app.set('views', path.join(__dirname, '../components/pages'));
app.set('view engine', 'js');

// *********** Connect to Mongo  ***********
console.log('Attempting to connect to mongoose');

mongoose.connect('mongodb://admin:admin1@ds127015.mlab.com:27015/chatrooms')
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

//middleware
app.use(express.static('public'));
//routes

app.get('/mainroom',(req,res) =>{
    res.render("index");
    console.log("welcome to the main room.")
})

app.get('/games',(req, res)=>{
    res.render('games');
    console.log("Games area")
})

app.get('/sports', (req, res)=>{
    res.render('sports')
    console.log("sports area")
})

//  het all chate history
app.get('/api/history',(req,res) =>{ 
    History.find({})
    .exec(function(err,history){
        if(err){
            console.log("no history found")
        }else{res.json(history)}

    })
})


app.post('/api/roomhistory',(req,res, roomname) =>{
    res.send( "return json list of chat history by roomname")
})


//Get Events Logs 
app.get('/api/eventlog', function(req,res){
    console.log("get request for all events")
    Events.find({})
    .exec(function(err, events){
        if(err){
            console.log("Error no events found")

        }else{res.json(events)}
    })
})


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
//     })

server = app.listen(3000);

//socket.io instantiation

const io = require("socket.io")(server)

///MAIN ROOM NAMESPACE////////////////////////////////////////////////////////////////////////////////////
let main_room_list = new Array(100)  // will be used when the front end is made for user lists

io.of('/mainroom').on('connection',function(socket){
    
    //user joins main room
    socket.join('main room')
    socket.room = 'main room'
    console.log('new user connected to main room connection!!!!!!!')
   // console.log(main_room_list)
   
    //assign random user number to user name
    var randnum = Math.floor(Math.random() * Math.floor(10000))    // assign the user a random number username
    socket.username = "User " + randnum.toString()
    //main_room_list.push(socket.username)   
    

    socket.emit("main_welcome_message");

    //emit to users that new user joined
    socket.broadcast.emit('new_message', {message: " joined the room.", username: socket.username});

// add to DB new connection is made and what room is joined with a timestamp
var event = new Events({socket_id :socket.id, username:socket.username, room:socket.room,action:`new socket connection made`});
event.save(function (err, event) {
if (err) return console.error(err);
});

    //send new message
    socket.on('new_message',(data)=>{
        io.of('/mainroom').emit('new_message',{ message : data.message, username : socket.username})

        //Write chat history to DB for main room.
        var history = new History({socket_id :socket.id, username:socket.username, room:socket.room,message: data.message});
    history.save(function (err, history) {
    if (err) return console.error(err);
    });
    })
    //on disconnect event
    socket.on('disconnect', function(){
        console.log('user disconnected from main room')
        io.of('/mainroom').emit('new_message', {message: " Left the room.", username: socket.username});
        

        //write Event history to DB
        var event = new Events({socket_id :socket.id, username:socket.username, room:socket.room,action:`disconnect`});
    event.save(function (err, event) {
    if (err) return console.error(err);
    console.log("Disconnection Event");
  });

    })
    // Change name
    socket.on('change_username', (data) =>{
        io.of('/mainroom').emit('new_message', {message: "changed their name to " + data.username , username: socket.username})
        
        // to be implimented in next step for user list

        //let index_num = main_room_list.findIndex(un => un==socket.username)  to be implimented, current user list
         //console.log(socket.username)
        //onsole.log(index_num)
        
        // main_room_list[index_num] = data.username;
        socket.username = data.username     //saves sent username into the socket.username
       
        
    })
})

// GAMES NAMESPACE////////////////////////////////////////////////////////////////////////////////////////////
io.of('/games').on('connection',function(socket){
    
    //user joins game room
    socket.join('games')
    socket.room = 'game room'
    console.log('connected through games channel????')
   
    // assign user a random number
    var randnum = Math.floor(Math.random() * Math.floor(10000)) 
    socket.username = "User " + randnum.toString()
   
    socket.emit("game_welcome_message");
    socket.broadcast.emit('new_game_message', {message: " joined the room.", username: socket.username});

    // add to DB new connection is made and what room is joined with a timestamo
    var event = new Events({socket_id :socket.id, username:socket.username, room:socket.room,action:`new socket connection made`});
    event.save(function (err, event) {
    if (err) return console.error(err);
    });
    
    //send new message to room
    socket.on('new_game_message',(data)=>{
             io.of('/games').emit('new_game_message', {message : data.message, username : socket.username})


             // write message history to DB for game room.
             var history = new History({socket_id :socket.id, username:socket.username, room:socket.room,message: data.message});
             history.save(function (err, history) {
             if (err) return console.error(err);
             });
    })

    //on disconnect 
    socket.on('disconnect', function(){
        console.log('user disconnected from games room')
        io.of('/games').emit('new_game_message', {message: " Left the room.", username: socket.username});

        var event = new Events({socket_id :socket.id, username:socket.username, room:socket.room,action:`disconnect`});
        event.save(function (err, event) {
        if (err) return console.error(err);
        console.log("Disconnection Event");
      });

        
    })

    //change username 
    socket.on('change_game_username',(data)=>{
        io.of('/games').emit('new_game_message', {message: "changed their name to " + data.username , username: socket.username})
        socket.username = data.username     //saves sent username into the socket.username
    })

    
})