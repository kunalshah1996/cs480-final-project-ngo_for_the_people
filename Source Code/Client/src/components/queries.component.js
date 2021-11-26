import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";
import { Link } from "react-router-dom";
//import '../employee.css';
// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.employees_education = this.employees_education.bind(this);
    this.incomplete_donation = this.incomplete_donation.bind(this);
    this.free_employees = this.free_employees.bind(this);
    this.donation_quantity = this.donation_quantity.bind(this);
    this.budget_city=this.budget_city.bind(this);
    this.allocated_funds=this.allocated_funds.bind(this);

    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  allocated_funds(){
    window.location="/allocated_funds"
  }

  incomplete_donation() {
    window.location="/incomplete_donation"
  }

  free_employees() {
    window.location="/free_employees"
  }

  donation_quantity() {
    window.location="/donation_quantity"
    
  }
  employees_education() {
    window.location="/employees_education"
  }

  budget_city() {
    window.location="/budget_city"
  }

  
  render() {
    return (
      <div>
        <div>
          <h4>Employees in ascending order of their names which are employed for active Educational cause</h4>
          </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.employees_education}
      >
      Select
      </button>
      <div>
          <h4>Selecting the employees who are not handling any campaigns.</h4>
          </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.free_employees}
      >
      Select
      </button>
      <div>
          <h4>Retrieve the donor ID and name whose donation has not been received yet.</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.incomplete_donation}
      >
      Select
      </button>
      <div>
          <h4>Selecting all the donation items with their quantities that are available</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.donation_quantity}
      >
      Select
      </button>
      <div>
          <h4>Find budget of city</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.budget_city}
      >
      Select
      </button>
      <div>
          <h4>Find total allocated funds</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.allocated_funds}
      >
      Select
      </button>
      </div>
    );
    }
}