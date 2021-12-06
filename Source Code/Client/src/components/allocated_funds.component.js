import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.show_funds = this.show_funds.bind(this);
    this.state = {
      donations: []
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    console.log("Did mount");
    this.show_funds();
  }

  show_funds() {
    console.log("Entered show funds");
    QueriesDataService.show_funds()
      .then(response => {
        this.setState({
          donations: response.data.result
        });
      })
      .catch(e => {
        alert(e);
      });
  }


  render() {
    const { donations,submitted} = this.state;
    console.log(donations);
    return (
        
        <div className="list row">
        <div className="col-md-6">
        {/* <div>{donations.length == 0 &&
          <h4>No funds allocated</h4>
            }
          </div> */}
          <div>{donations.length > 0 &&
          <div>
          <div className="col-md-6">
              
                <label>
                  <strong>Allocated Funds</strong>
                </label>{" "}
                {donations[0].TOTAL_FUNDS_COLLECTED}
            </div>
            
        </div>
   } </div>
        </div>
      </div>
    );
    }
}