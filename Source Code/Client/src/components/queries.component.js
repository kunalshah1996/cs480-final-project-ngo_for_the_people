import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";
import { Link } from "react-router-dom";
import '../employee.css';
import '../queries.css'
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
    this.active_causes = this.active_causes.bind(this);

    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }
  active_causes(){
    window.location="/active_causes"
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
  designation_pr(){
    window.location="/designation_pr"
  }  
  budget_online(){
    window.location="/budget_online"
  }
  trim_ename(){
    window.location="/trim_ename"
  }
  count_donation(){
    window.location="/count_donation"
  }
  joining_period(){
    window.location="/joining_period"
  }

  
  render() {
    return (
      <body id = "bg1">
      <div>
        <div id = 'complex'>
          <h3> Complex Queries : </h3>
        <div>
          <h4 id='query1'>Employees handling active Educational Causes</h4>
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
          <h4 id = "query1"> Donors whose donation has not been received yet </h4>
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
        <h4 id = 'query1'>Available donation items and their quantities</h4>
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
          <h4 id = 'query1'>Employees who are not handling any campaigns</h4>
          </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.free_employees}
      >
      Select
      </button>
      
      </div>

      
      <div id = 'aggregate'>
        <h3> Aggregate Queries : </h3>

      <div>
          <h4 id ='query1'>Budget of city</h4>
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
          <h4 id ='query1'>Total allocated funds</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.allocated_funds}
      >
      Select
      </button>
      <div>
          <h4 id='query1'>Remove the trailing spaces from the Employee name</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.trim_ename}
      >
      Select
      </button>
      <div>
          <h4 id='query1'>Count of each donation type greater than the input value</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.count_donation}
      >
      Select
      </button>

      </div>

      <div id ='simple'>
        <h3> Simple Queries :</h3>
      <div>
          <h4 id ='query1'>Active causes</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.active_causes}
      >
      Select
      </button>
      <div>
          <h4 id='query1'> Budget of online causes</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.budget_online}
      >
      Select
      </button>
      <div>
          <h4 id = 'query1'> Employee designations in Public Relations Department</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.designation_pr}
      >
      Select
      </button>
      
      
      <div>
          <h4 id = 'query1'> Employees who joined the organization between two user-defined dates</h4>
      </div>
      <button
          className="btn btn-outline-secondary"
          id="add_btn"
          type="button"
          onClick={this.joining_period}
      >
      Select
      </button>
      </div>
      </div>
      </body>
      
     
      

    );
    }
}