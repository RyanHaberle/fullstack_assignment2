import React, { Component } from 'react';
import openSocket from "socket.io-client";
import { EventEmitter } from 'events';
import $ from 'jquery'

const myEmitter = new EventEmitter();


class GameRoom extends Component {
  

  componentDidMount(){
    $(function(){
      //make connection
      var gamesocket = openSocket('http://localhost:3000/games')
      var message = $("#game_message")
      var username = $("#username")
      var send_message = $("#send_game_message")
      var send_username = $("#send_game_username")
      var chatroom = $("#chatroom")
    
      //emit a username
    
      send_username.click(function(){
          console.log(username.val())
          console.log('Conn game')
          gamesocket.emit('change_game_username', {username : username.val()})
          $('#username').val(''); // clear test field
      })
    
       //Emit message
       send_message.click(function(){    //button send_message is clicked and function fires
          
          gamesocket.emit('new_game_message', {message : message.val()}) //emits new_message
          $('#game_message').val('');//clear text field
        })
    
      //listen on new message
      gamesocket.on("new_game_message", (data) =>{    //listens for new_message
          console.log(data)
          chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>") //appends to chat whe3n new_message is heard
      })
    
      gamesocket.on("game_welcome_message", (data) =>{    //listens for welcome
          console.log(data)
          chatroom.append("<p class='message'>" + "You have joined the Games room" + "</p>") // emits a message to current user when room is joined
      })
    });
    
  
  }

  componentWillUnmount() {
 
   }
   
  render() {

    
    return (
        <div>
<body>
        <h1>Welcome to game room</h1>


       <div>

       <section>
      <div id="change_username">
	<input id="username" type="text" />
	<button id="send_game_username" type="button" onClick={this.changeUsername}>change username</button>
      </div>
    </section>

    <section id="chatroom">
      <section id="feedback"></section>
    </section>
    <section id ="roomlist">
   
    </section>
    

    <section id="input_zone"> 
      <input id="game_message" class="vertical-align" type="text" />
      <button id="send_game_message" onClick={this.sendMessage}  >send message</button>
    </section>

       </div>
       <script src="http://code.jquery.com/jquery-latest.min.js"></script>
       <script src="gameroomchat.js"></script>
       </body>
        </div>
    );
  }
}

export default GameRoom;
