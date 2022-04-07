import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    error: false,
    sms_error: '',
    bool_response: false,
  };

 handleSubmit(event){
    this.setState({ error: false });
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    let self=this

    if (email && password) {
        const body = {
          "username": email,
          "password": password,
        };
        axios
          .post(
            "https://three-points.herokuapp.com/api/login",
            body,
            {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
              "Content-Type": "application/json",
            },
          )
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", email);
                self.props.onLoginComplete(true);
            }
            else{
                self.setState({
                  bool_response: true,
                  sms_error: response.data.message,
                });
            }
          })
          .catch(function (error) {
            self.setState({
                bool_response: true,
                sms_error: error.response.data.message
            });
          });
    }
    else{
        this.setState({ error: true });
    }

  }

  render() {
    return (
      <div className="d-flex justify-content-center mt-5">
        <form
          className="form-login w-50"
          onSubmit={this.handleSubmit.bind(this)}
        >
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              Invalid email or password
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              login
            </button>
          </div>
          {this.state.bool_response && (
            <p className="text-danger mt-2">{this.state.sms_error}</p>
          )}
        </form>
      </div>
    );
  }
}
export default Login;
