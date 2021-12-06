import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";
import { Link } from "react-router-dom";


export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate1 = this.onChangeDate1.bind(this);
    this.onChangeDate2 = this.onChangeDate2.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);

    this.state = {
    date1:null,
    date2:null,
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      submitted:false
    };
  }
  employee={
      employee_name:null,
      employee_id:null,
      employee_doj:null
  }

  componentDidMount() {
    this.retrieveEmployees();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeDate1(e) {
    const date1 = e.target.value;

    this.setState({
      date1: date1
    });
  }

  onChangeDate2(e) {
    const date2 = e.target.value;

    this.setState({
      date2: date2
    });
  }

  retrieveEmployees() {
      var data={
        date1:this.state.date1,
        date2:this.state.date2
      }
    QueriesDataService. joining_period(data)
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

  setActiveEmployee(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index
    });
  }


  render() {
    const {employees, currentEmployee, currentIndex,submitted,date1,date2 } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Start Date"
              value={this.state.date1}
              onChange={this.onChangeDate1}
            />
            <input
              type="text"
              className="form-control"
              placeholder="End Date"
              value={this.state.date2}
              onChange={this.onChangeDate2}
            />
             <div className="input-group-append">
               <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveEmployees}
              >
                Search
              </button>
             </div>
          </div>
           </div>
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
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEmployee.employee_name}
              </div>
              <div>
                <label>
                  <strong>Date of joining</strong>
                </label>{" "}
                {currentEmployee.employee_doj.slice(0,10)}
              </div>
              <div>
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