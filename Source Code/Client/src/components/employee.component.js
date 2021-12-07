import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import '../employee.css';
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
export default class Employee extends Component {
  constructor(props) {
    super(props);
    //this.onChangeEmployee_id = this.onChangeEmployee_id.bind(this);
    this.onChangeEmployee_name = this.onChangeEmployee_name.bind(this);
    this.onChangeEmployee_contact = this.onChangeEmployee_contact.bind(this);
    this.onChangeEmployee_address = this.onChangeEmployee_address.bind(this);
    this.onChangeEmployee_designation = this.onChangeEmployee_designation.bind(this);
    this.onChangeEmployee_department = this.onChangeEmployee_department.bind(this);
    this.onChangeEmployee_availability = this.onChangeEmployee_availability.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        employee_id: "",
        employee_name: "",
        employee_contact: "",
        employee_address: "",
        employee_designation: "",
        employee_department: "",
        employee_availability: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

//   onChangeEmployee_id(e) {
//     const employee_id = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentEmployee: {
//           ...prevState.currentEmployee,
//           employee_id: employee_id
//         }
//       };
//     });
//   }

  onChangeEmployee_name(e) {
    const employee_name = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_name: employee_name
      }
    }));
  }

  onChangeEmployee_contact(e) {
    const employee_contact = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_contact: employee_contact
      }
    }));
  }

  onChangeEmployee_address(e) {
    const employee_address = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_address: employee_address
      }
    }));
  }

  onChangeEmployee_department(e) {
    const employee_department = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_department: employee_department
      }
    }));
  }

  onChangeEmployee_designation(e) {
    const employee_designation = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_designation: employee_designation
      }
    }));
  }
  onChangeEmployee_availability(e) {
    const employee_availability = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        employee_availability: employee_availability
      }
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.employee_id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Employee was updated successfully!"
        });
        alert("Updated successfully");
        window.location.href = '/employees'
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteEmployee() {    
      console.log(this.state.currentEmployee.employee_id)
    EmployeeDataService.delete(this.state.currentEmployee.employee_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/employees')
        alert("Deleted successfully");
        window.location.href = '/employees'
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <body id ="bg">
      <div>
        {currentEmployee ? (
          <div className="edit-form" id = "fifth">
            <h4 id ="fontc">Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="employee_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_id"
                  value={currentEmployee.employee_id}
                  onChange={this.onChangeEmployee_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employee_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_name"
                  value={currentEmployee.employee_name}
                  onChange={this.onChangeEmployee_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employee_contact">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_contact"
                  value={currentEmployee.employee_contact}
                  onChange={this.onChangeEmployee_contact}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employee_address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_address"
                  value={currentEmployee.employee_address}
                  onChange={this.onChangeEmployee_address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employee_designation">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="employee_designation"
                  value={currentEmployee.employee_designation}
                  onChange={this.onChangeEmployee_designation}
                />
              </div>

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
