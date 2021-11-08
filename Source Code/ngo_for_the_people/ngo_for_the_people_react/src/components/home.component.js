
import React, { Component } from "react";

export default class Home extends Component {
 
  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }


  render() {

    return (
        <h1>Welcome to NGO for the Poeple</h1>
    );
  }

  }
