import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
import '../employee.css';
// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEmployee_id = this.onChangeSearchEmployee_id.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.searchEmployee_id = this.searchEmployee_id.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchEmployee: ""
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchEmployee_id(e) {
    const searchEmployee_id = e.target.value;

    this.setState({
      searchEmployee_id: searchEmployee_id
    });
  }

  retrieveEmployees() {
    EmployeeDataService.getAll()
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
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

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }

  removeAllEmployees() {
    EmployeeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        alert(e);
      });
  }

  searchEmployee_id() {
    EmployeeDataService.findById(this.state.searchEmployee_id)
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }
  addEmployee() {
    window.location="/addemployee"
  }

  render() {
    const { searchEmployee_id, employees, currentEmployee, currentIndex } = this.state;

    return (
      <body>
      <div className="list row" id = "first">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id= "search_btn"
              placeholder="Search by the ID of the employee"
              value={searchEmployee_id}
              onChange={this.onChangeSearchEmployee_id}
            />
            <div className="input-group-append" id = "search">
              
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchEmployee_id}
              >
                SEARCH 
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addEmployee}
              >
              ADD
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "employee1" >
          <h4>List of Employees</h4>

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

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentEmployee ? (
            <div>
              <h4>Details of the employee:</h4>
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
              <div>
                <label>
                  <strong>Contact:</strong>
                </label>{" "}
                {currentEmployee.employee_contact}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentEmployee.employee_address}
              </div>
              <div>
                <label>
                  <strong>Designation:</strong>
                </label>{" "}
                {currentEmployee.employee_designation}
              </div>
              <div>
                <label>
                  <strong>Department:</strong>
                </label>{" "}
                {currentEmployee.employee_department}
              </div>
              <div>
                <label>
                  <strong>Availability:</strong>
                </label>{" "}
                {currentEmployee.employee_availability}
              </div>

              <Link
                to={"/employees/" + currentEmployee.employee_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Employee!</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}