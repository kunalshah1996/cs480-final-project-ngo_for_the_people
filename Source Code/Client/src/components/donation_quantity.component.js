import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.show_donations = this.show_donations.bind(this);
    this.state = {
      donations: []
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    console.log("Did mount");
    this.show_donations();
  }

  show_donations() {
    console.log("Entered show funds");
    QueriesDataService.show_donations()
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
          <h4>List</h4>
        }
          <div>
            
          <div className="col-md-6">
              
                <label>
                  <strong>Total Donations Available</strong>
                </label>{" "}
                {donations.map( donations => <div>{donations.TOTAL_DONATIONS_AVAILABLE}</div>)}
            </div>
            
        </div>
    </div>
        </div>
      </div>
    );
    }
}
