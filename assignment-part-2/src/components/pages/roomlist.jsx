import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class RoomList extends Component {
  render() {
    return (
    
<div className="btnBanner">

  <h1>Welcome to Room List</h1>

  <div>
  <Link to ="roomlist" ><button className="btnRoomList">Room List</button></Link>
  <Link to ="chathistory" ><button className="btnRoomList">Chat History</button></Link>
  <Link to ="eventhistory" ><button className="btnRoomList">Event History</button></Link>
  
  
   </div>


   <div>

   <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Room Name</th>
      <th scope="col">User Count</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Main Room</td>
      <td>User Count to be implimented</td>
      
    </tr>

    <tr>
      <th scope="row">2</th>
      <td>Game Room</td>
      <td>User Count to be implimented</td>
    </tr>
    
  </tbody>
</table>



   </div>
  </div>
 


    
    );
  }
}

export default RoomList;
