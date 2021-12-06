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
    this.retrieveEmployees();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }
  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }

  retrieveEmployees() {
    QueriesDataService.employees_education()
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
          <h4>Employees List</h4>

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
                  {employee.employee_name}
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
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEmployee.employee_name}
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