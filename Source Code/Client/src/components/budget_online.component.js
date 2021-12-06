import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setBudgetOnline = this.setBudgetOnline.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      bonlines : [],
      currentBOnline: null,
      currentIndex: -1
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.retrieveBOnline();
  }
  setBudgetOnline(campaign, index) {
    this.setState({
      currentBOnline: campaign,
      currentIndex: index
    });
  }

  retrieveBOnline() {
    QueriesDataService.budget_online()
      .then(response => {
        this.setState({
          bonlines: response.data.result
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveBOnline();
    this.setState({
      currentBOnline: null,
      currentIndex: -1
    });
  }

  render() {
    const { bonlines, currentBOnline, currentIndex } = this.state;

    return (
        <div className="list row">
        <div className="col-md-6">
        <div>{bonlines.length == 0 &&
          <h4>No online budget</h4>
            }
          </div>
          <div>{bonlines.length > 0 &&
          <h4>List</h4>
            }
          </div>
          <ul className="list-group">
            {bonlines &&
              bonlines.map((campaign, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setBudgetOnline(campaign, index)}
                  key={index}
                >
                  {campaign.campaign_id}
                </li>
              ))}
          </ul>
          
        </div>

      
        <div className="col-md-6">
          {currentBOnline ? (
            <div>
              <h4>Budget of Online Campaign</h4>
              <div>
                <label>
                  <strong>ID :</strong>
                </label>{" "}
                {currentBOnline.campaign_id}

              </div>
              <div>
                <label>
                  <strong>Online Campaign Budget</strong>
                </label>{" "}
                {currentBOnline.campaign_budget}
              </div>

            </div>
      

       
            
          ) : (
            <div>
              <br />
              <p>Please click campaign ID </p>
            </div>
          )}
        </div>
      </div>
    );
    }
}