import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class EventHistory extends Component {

  state = {event : []}


 componentDidMount(){
   fetch('/api/eventlog')
   .then(res => res.json())
   .then(event => this.setState({event}))
 }

  render() {
    return (
    
<div>

  <h1>Welcome to EventHistory</h1>

  <div>
  <Link to ="roomlist" ><button className="btnRoomList">Room List</button></Link>
  <Link to ="chathistory" ><button className="btnRoomList">Chat History</button></Link>
  <Link to ="eventhistory" ><button className="btnRoomList">Event History</button></Link>
  
  
   </div>
<div>


<table class="table">
  <thead class="thead-dark">
    <tr>
    
      <th scope="col">User name</th>
      <th scope="col">Action</th>
      <th scope="col">Time</th>
      <th scope="col">Room</th>
    </tr>
  </thead>
  {this.state.event.map(event=>
    <tbody>
    <tr>
      
      <td>{event.username}</td>
      <td>{event.action}</td>
      <td>{event.time}</td>
      <td>{event.room}</td>
    </tr>
  </tbody>
)}
</table>



</div>
  </div>


    
    );
  }
}

export default EventHistory;
