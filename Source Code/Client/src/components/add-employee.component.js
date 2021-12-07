import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../employee.css';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmployee_id = this.onChangeEmployee_id.bind(this);
    this.onChangeEmployee_name = this.onChangeEmployee_name.bind(this);
    this.onChangeEmployee_contact = this.onChangeEmployee_contact.bind(this);
    this.onChangeEmployee_address = this.onChangeEmployee_address.bind(this);
    this.onChangeEmployee_designation = this.onChangeEmployee_designation.bind(this);
    this.onChangeEmployee_department = this.onChangeEmployee_department.bind(this);
    this.onChangeEmployee_availability = this.onChangeEmployee_availability.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      employee_id:"",
      employee_name:"",
      employee_contact: "",
      employee_address:"",
      employee_designation:"",
      employee_department:"",
      employee_availability:"",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeEmployee_id(e) {
    this.setState({
      employee_id: e.target.value
    });
  }

  onChangeEmployee_name(e) {
    this.setState({
      employee_name: e.target.value
    });
  }

  onChangeEmployee_contact(e) {
    this.setState({
      employee_contact: e.target.value
    });
  }

  onChangeEmployee_address(e) {
    this.setState({
      employee_address: e.target.value
    });
  }

  onChangeEmployee_designation(e) {
    this.setState({
      employee_designation: e.target.value
    });
  }

  onChangeEmployee_department(e) {
    this.setState({
      employee_department: e.target.value
    });
  }

  onChangeEmployee_availability(e) {
    this.setState({
      employee_availability: e.target.value
    });
  }

  saveEmployee() {
    var data = {
      employee_id: this.state.employee_id,
      employee_name: this.state.employee_name,
      employee_contact: this.state.employee_contact,
      employee_address: this.state.employee_address,
      employee_designation: this.state.employee_designation,
      employee_department: this.state.employee_department,
      employee_availability: this.state.employee_availability
    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          employee_id: response.data.employee_id,
          employee_name: response.data.employee_name,
          employee_contact: response.data.employee_contact,
          employee_address: response.data.employee_address,
          employee_designation: response.data.employee_designation,
          employee_department: response.data.employee_department,
          employee_availability: response.data.employee_availability,
          submitted: true
        });
        alert("Submitted successfully")
      })
      .catch(e => {
        alert(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      employee_id: "",
      employee_name: "",
      employee_contact: "",
      employee_address:"",
      employee_designation:"",
      employee_department:"",
      employee_availability:"",
      submitted: false
    });
  }

  render() {

    return (
      <body id = "bg">
        <div className="submit-form" id ="second"> 
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/employees'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_id"
                  required
                  value={this.state.employee_id}
                  onChange={this.onChangeEmployee_id}
                  name="employee_id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_name"
                  required
                  value={this.state.employee_name}
                  onChange={this.onChangeEmployee_name}
                  name="employee_name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_contact"
                  required
                  value={this.state.employee_contact}
                  onChange={this.onChangeEmployee_contact}
                  name="employee_contact"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_address"
                  required
                  value={this.state.employee_address}
                  onChange={this.onChangeEmployee_address}
                  name="employee_address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_designation"
                  required
                  value={this.state.employee_designation}
                  onChange={this.onChangeEmployee_designation}
                  name="employee_designation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_department"
                  required
                  value={this.state.employee_department}
                  onChange={this.onChangeEmployee_department}
                  name="employee_department"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee Availability</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_availability"
                  required
                  value={this.state.employee_availability}
                  onChange={this.onChangeEmployee_availability}
                  name="employee_availability"
                />
              </div>
  
              <button onClick={this.saveEmployee} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}