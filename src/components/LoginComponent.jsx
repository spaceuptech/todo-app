import React from 'react'

class LoginComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userName: '', pass: '', errors: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.userName.length === 0 || this.state.pass.length === 0) {
      this.setState({ errors: true })
      return
    }
    console.log("Login: ", this.state.userName, this.state.pass)
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <span className="login-form-logo">
              <i className="material-icons logo">landscape</i>
            </span>
            <span className="login-form-title">LOG IN</span>
            <div className="login-wrap-input validate-input alert-validate" data-validate="Enter Username">
              <input className="login-form-input" type="text" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
              <span className="login-focus-input" ><i className="material-icons form-icon">person</i></span>
            </div>
            {this.state.errors && this.state.userName.length === 0 && <p className="login-form-error">Username is required</p>}
            <div className="login-wrap-input validate-input alert-validate" data-validate="Enter Password">
              <input className="login-form-input" type="password" name="pass" placeholder="Password" onChange={this.handleChange} value={this.state.pass} />
              <span className="login-focus-input" ><i className="material-icons form-icon">lock</i></span>
            </div>

            {this.state.errors && this.state.pass.length === 0 && <p className="login-form-error">Password is required</p>}
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={this.handleSubmit}>
                Login
						</button>
            </div>
            <div className="login-card-bottom-text">
              <a className="txt1" href="/signup">
                New to TodoApp? SignUp.
						</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent