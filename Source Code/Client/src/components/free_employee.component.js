import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.retrieveEmployees();
  }
  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }

  retrieveEmployees() {
    QueriesDataService.free_employees()
      .then(response => {
        this.setState({
          employees: response.data.result
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1
    });
  }

  render() {
    const { employees, currentEmployee, currentIndex } = this.state;

    return (
        <div className="list row">
        <div className="col-md-6">
        <div>{employees.length==0 &&
          <h4>No free employees</h4>
            }
          </div>
          <div>{employees.length>0 &&
          <h4>Employees List</h4>
            }
          </div>
          <ul className="list-group">
            {employees &&
              employees.map((employee, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEmployee(employee, index)}
                  key={index}
                >
                  {employee.employee_id}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentEmployee ? (
            <div>
              <h4>Employee</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentEmployee.employee_id}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Employee</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}