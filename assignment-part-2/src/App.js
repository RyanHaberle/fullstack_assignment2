//testestestest
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, link
}from 'react-router-dom';
import './App.css';

//components
import Header from './components/HeaderComponent/header';
import Footer from './components/FooterComponent/footer';

import MainRoom from './components/pages/mainroom';
import GameRoom from './components/pages/games';
import LoginPage from './components/pages/loginpage';
import EventHistory from './components/pages/eventhistory';
import ChatHistory from './components/pages/chathistory';
import RoomList from './components/pages/roomlist'
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
     <Header />
      To Begin, choose a chat room above     {/* Change when other parts work */}
     
      <Route exact path='/mainroom' component = {MainRoom} />
      <Route exact path='/games' component = {GameRoom} />
      <Route exact path='/adminLogin' component = {LoginPage}/>
      <Route exact path='/roomlist' component = {RoomList}/>
      <Route exact path='/chathistory' component = {ChatHistory}/>
      <Route exact path='/eventhistory' component = {EventHistory}/>

      <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
