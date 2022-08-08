import React, { Component } from "react";
import "../Css/passwordstrengthmeter.css";

class PasswordStrengthMeter extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      password: "",
    };
  }
  updatePasswordvalue = (ev) => {
    this.setState({
      password: ev.target.value,
    });
    this.changeMeterValue();
    console.log("Update pw");
  };
  changeMeterValue = () => {
    const StrongPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const MediumPassword = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (this.state.password.length === 1) {
      this.setState({
        value: 0,
      });
    } else {
      if (StrongPassword.test(this.state.password)) {
        this.setState({
          value: 100,
        });
      } else {
        if (MediumPassword.test(this.state.password)) {
          this.setState({
            value: 50,
          });
        } else {
          this.setState({
            value: 10,
          });
        }
      }
    }
  };
  createPasswordLabel = (testedResult) => {
    switch (testedResult) {
      case 0:
        return "Weak";
      case 5:
        return "Weak";
      case 10:
        return "Fair";
      case 50:
        return "Good";
      case 100:
        return "Strong";
      default:
        return "Weak";
    }
  };
  render() {
    // const { password } = this.props;
    var testedResult = this.state.value;
    return (
      <>
        <input
          type="password"
          onChange={this.updatePasswordvalue}
          className="password"
        />
        <div className="password-strength-meter input-field">
          <progress
            className={`password-strength-meter-progress strength-${this.createPasswordLabel(
              testedResult
            )}`}
            value={this.state.value}
            max="100"
          />
          <br />
          <label className="password-strength-meter-label">
            <>
              <strong>Password strength:</strong>{" "}
              {this.createPasswordLabel(testedResult)}
            </>
          </label>
        </div>
      </>
    );
  }
}

export default PasswordStrengthMeter;
