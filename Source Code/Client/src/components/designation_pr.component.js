import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setDesignationPR = this.setDesignationPR.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      desginations_pr: [],
      currentdesginationpr: [],
      currentIndex: -1
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.retrieveDesginationPR();
  }
  setDesignationPR(employee, index) {

    this.setState({
     currentdesginationpr: employee,
      currentIndex: index
    });
    console.log(this.state);
  }

  retrieveDesginationPR() {
    QueriesDataService.desgination_pr()
      .then(response => {
        this.setState({
          desginations_pr: response.data.result
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveDesginationPR();
    this.setState({
      currentDesginationPR: null,
      currentIndex: -1
    });
  }

  render() {
    const { desginations_pr, currentdesginationpr, currentIndex } = this.state;
    console.log(currentdesginationpr)
    return (
        <div className="list row">
        <div className="col-md-6">
        <div>{desginations_pr.length == 0 &&
          <h4>No employee designations</h4>
            }
          </div>
          <div>{desginations_pr.length > 0 &&
          <h4>List</h4>
            }
          </div>
          <ul className="list-group">
            {desginations_pr &&
              desginations_pr.map((employee, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setDesignationPR(employee, index)}
                  key={index}
                >
                  {employee.employee_id}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIndex>=0 ? (
            <div>
              <h4>Designation</h4>
              <div>
                <label>
                  <strong>ID :</strong>
                </label>{" "}
                {currentdesginationpr.employee_id}
              </div>
              <div>
                <label>
                  <strong>Designation:</strong>
                </label>{" "}
                {currentdesginationpr.employee_designation}
              </div>

            </div>
            
          ) : (
            <div>
              <br />
              <p>Please click on Employee ID</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}