import React, { Component } from 'react';
import {Link} from 'react-router-dom';



class Header extends Component {
  render() {
    return (
     <header>


       
     

     <nav className="navbar navbar-expand-lg navbar-light bg-dark" >
  <a className="navbar-brand" href="#"><div className="navTextColor">Suprimo Chato</div></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="">
      <li className="nav-item active">
          <a href="/mainroom" className = "navTextColor">Main Room</a>
     </li>
      
      <li className="nav-item">
          <a  href="/games" className="navTextColor">Game Room</a>
      </li>
      
    </ul>
  </div>

  
 
 
  <div className = "btnAdmin">
     <button><Link  to="/AdminLogin" className="navTextColor">Admin Login</Link></button>
     </div>
</nav>

 
     </header>
    );
  }
}

export default Header;
