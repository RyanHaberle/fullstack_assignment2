import React, { Component } from 'react';
import {Link} from 'react-router-dom';


//var {history} = require('./../../backend/models/history')

//import history from "./../../backend/models/history"
class ChatHistory extends Component {

    state = {history : []}

    componentDidMount(){
      fetch('/api/history')
      .then(res => res.json())
      .then(history => this.setState({history}));
    }
render() {
  
    return (
   
<div>

  <h1>Welcome to ChatHistory</h1>


  <div>
  <Link to ="roomlist" ><button className="btnRoomList">Room List</button></Link>
  <Link to ="chathistory" ><button className="btnRoomList">Chat History</button></Link>
  <Link to ="eventhistory" ><button className="btnRoomList">Event History</button></Link>
  </div>



 
<div>
<table class="table">
  <thead class="thead-dark">
    <tr>
    
      <th scope="col">user Name</th>
      <th scope="col">History</th>
      <th scope="col">Time</th>
      <th scope="col">Room</th>
    </tr>
  </thead>

  {this.state.history.map(history=>
    <tbody>
    <tr>
      
      <td>{history.username}</td>
      <td>{history.message}</td>
      <td>{history.time}</td>
      <td>{history.room}</td>
    </tr>
  </tbody>
)}
  
</table>


</div>

  </div>


    
    );
  }
}

export default ChatHistory;
