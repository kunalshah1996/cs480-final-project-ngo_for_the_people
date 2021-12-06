import React, { Component } from "react"
import InitializeDataService from "../services/initialize.service";

export default class Home extends Component {
 
  Initializedb() {
    InitializeDataService.start()
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }



  render() {
    return (
      <div>
            <button
              type="submit"
              className="btn btn-success m-3" 
              onClick={this.Initializedb}
            >
              Initialize db
            </button>
        </div>
        
    );
  }

  }
