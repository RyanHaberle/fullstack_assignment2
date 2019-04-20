import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class LoginPage extends Component {
  render() {
    return (
      <div class="col-md-6 login-form-1">
      <h3>Login Form 1</h3>
      
          <div class="form-group">
              <input type="text" className="form-control" placeholder="username"  />
          </div>
          <div class="form-group">
              <input type="password" className="form-control" placeholder="Your Password *"  />
          </div>
          <div class="form-group">
              <button className="btnSubmit" value="Login"><Link to ="roomlist" >Login</Link> </button>
          </div>
          <div class="form-group">
              <a href="#" className="btnForgetPwd">Forget Password?</a>
          </div>
      
  </div>
    );
  }
}

export default LoginPage;
