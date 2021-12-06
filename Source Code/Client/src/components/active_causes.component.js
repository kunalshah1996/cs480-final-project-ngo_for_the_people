import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setActiveCause = this.setActiveCause.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      causes: [],
      currentCause: null,
      currentIndex: -1
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.retrieveCause();
  }
  setActiveCause(cause, index) {
    this.setState({
      currentCause: cause,
      currentIndex: index
    });
  }

  retrieveCause() {
    QueriesDataService.active_causes()
      .then(response => {
        this.setState({
          causes: response.data.result
        });
      })
      .catch(e => {
        console.log(e);
        alert(e);
      });
  }

  refreshList() {
    this.retrieveCause();
    this.setState({
      currentCause: null,
      currentIndex: -1
    });
  }

  render() {
    const { causes, currentCause, currentIndex } = this.state;

    return (
        <div className="list row">
        <div className="col-md-6">
        <div>{causes.length == 0 &&
          <h4>No Active Causes</h4>
            }
          </div>
          <div>{causes.length > 0 &&
          <h4>List</h4>
            }
          </div>
          <ul className="list-group">
            {causes &&
              causes.map((cause, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCause(cause, index)}
                  key={index}
                >
                  {cause.cause_id}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentCause ? (
            <div>
              <h4>Cause</h4>
              <div>
                <label>
                  <strong>ID :</strong>
                </label>{" "}
                {currentCause.cause_id}
              </div>
              <div>
                <label>
                  <strong>Cause Type :</strong>
                </label>{" "}
                {currentCause.cause_type}
              </div>

            </div>
            
          ) : (
            <div>
              <br />
              <p>Please click on Cause ID</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}