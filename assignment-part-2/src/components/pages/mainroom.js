 import React, { Component } from 'react';
import $ from 'jquery'
 import io from 'socket.io-client'
 import openSocket from "socket.io-client";

 
 
 
 class MainRoom extends Component {
 
  componentDidMount(){

    $(function(){
      //make connection
      
      const socket = openSocket('http://localhost:3000/mainroom')
      var message = $("#message")
      var username = $("#username")
      var send_message = $("#send_message")
      var send_username = $("#send_username")
      var chatroom = $("#chatroom")
    
    
      
       //Emit message
       send_message.click(function(){    //button send_message is clicked and function fires
          
          socket.emit('new_message', {message : message.val()}) //emits new_message
          $('#message').val(''); // Clear text field.
        })
    
      //emit a username
      send_username.click(function(){
          
          socket.emit('change_username', {username : username.val()});
          console.log("BTN CLICK")
          $('#username').val(''); //Clear text field.
        
      })
    
    
      //listen on new message
      socket.on("new_message", (data) =>{    //listens for new_message
          console.log(data)
          chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>") //appends to chat whe3n new_message is heard
          
      })
    
     
    
      socket.on("main_welcome_message", (data) =>{    //listens for welcome
          console.log(data)
          chatroom.append("<p class='message'>" + "You have joined the Main room" + "</p>") // emits a message to current user when room is joined
      })
    
    });

   


  }

  componentWillUnmount(){
  
  }


  sendMessage() {
    console.log("send message clicked");
  }
  render() {


  
    return ( 
    
   
   <div>
 <head>
    <meta http-equiv="Content-Type" const="text/html;charset=UTF-8" />
    <link href="http://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="style.css" />
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <title>Simple Chat App</title>
   
  </head>

  <body>
    <header>
      <h1>Main Room</h1>  
      
    </header>

    <section>
      <div id="change_username">
	<input id="username" type="text" />
	<button id="send_username" onClick="test()">Change username</button>
      </div>
    </section>

    <section id="chatroom">
      <section id="feedback"></section>
    </section>
    <section id ="roomlist">
        <a href="mainroom"><button id="roombutton">Main Room</button></a> 
    <a href="games"><button id="roombutton">Games Room</button></a> 
    
    </section>
    

    <section id="input_zone"> 
      <input id="message" className="vertical-align" type="text" />
      <button id="send_message" className="vertical-align" type="button" onClick ={this.sendMessage.bind}>Send</button>
    </section>

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="mainroomchat.js"></script>
  </body>
  </div>

  


    
    );
  }
}





export default MainRoom; 
