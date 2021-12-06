import React, { Component } from "react";
import HealthDataService from "../services/health.service";

export default class Health extends Component {
  constructor(props) {
    super(props);
    //this.onChangeEmployee_id = this.onChangeEmployee_id.bind(this);
    this.onChangeOrg_name = this.onChangeOrg_name.bind(this);
    this.onChangeNeed_type = this.onChangeNeed_type.bind(this);
    this.onChangeNeed_quantity = this.onChangeNeed_quantity.bind(this);
    this.onChangePoc_name = this.onChangePoc_name.bind(this);
    this.onChangePoc_contact = this.onChangePoc_contact.bind(this);
    
    this.getHealth = this.getHealth.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.deleteHealth = this.deleteHealth.bind(this);

    this.state = {
      currentHealth: {
        cause_id: "",
        org_name: "",
        need_type: "",
        need_quantity: "",
        poc_name: "",
        poc_contact: "",
        
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getHealth(this.props.match.params.id);
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

  onChangeOrg_name(e) {
    const org_name = e.target.value;
    
    this.setState(prevState => ({
      currentHealth: {
        ...prevState.currentHealth,
        org_name : org_name
      }
    }));
  }

  onChangeNeed_type(e) {
    const need_type = e.target.value;
    
    this.setState(prevState => ({
      currentHealth: {
        ...prevState.currentHealth,
        need_type: need_type
      }
    }));
  }

  onChangeNeed_quantity(e) {
    const need_quantity = e.target.value;
    
    this.setState(prevState => ({
      currentHealth: {
        ...prevState.currentHealth,
        need_quantity: need_quantity
      }
    }));
  }

  onChangePoc_name(e) {
    const poc_name = e.target.value;
    
    this.setState(prevState => ({
      currentHealth: {
        ...prevState.currentHealth,
        poc_name: poc_name
      }
    }));
  }

  onChangePoc_contact(e) {
    const poc_contact = e.target.value;
    
    this.setState(prevState => ({
      currentHealth: {
        ...prevState.currentHealth,
        poc_contact: poc_contact
      }
    }));
  }
 

  getHealth(id) {
    HealthDataService.get(id)
      .then(response => {
        this.setState({
          currentHealth: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateHealth() {
    HealthDataService.update(
      this.state.currentHealth.cause_id,
      this.state.currentHealth
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cause was updated successfully!"
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteHealth() {    
      console.log(this.state.currentHealth.cause_id)
    HealthDataService.delete(this.state.currentHealth.cause_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/healths')
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentHealth } = this.state;

    return (
      <body id = "bg">
      <div>
        {currentHealth ? (
          <div className="edit-form" id = "fifth">
            <h4 id ="fontc">Health</h4>
            <form>
              <div className="form-group">
                <label htmlFor="cause_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_id"
                  value={currentHealth.cause_id}
                  onChange={this.onChangeCause_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="org_name">Organisation Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="org_name"
                  value={currentHealth.org_name}
                  onChange={this.onChangeOrg_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="need_type">Need Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_type"
                  value={currentHealth.need_type}
                  onChange={this.onChangeNeed_type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="need_quantity">Need Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_quantity"
                  value={currentHealth.need_quantity}
                  onChange={this.onChangeNeed_quantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poc_name">Name (Point of Contact)</label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_name"
                  value={currentHealth.poc_name}
                  onChange={this.onChangePoc_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poc_contact">Contact (Point of Contact)</label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_contact"
                  value={currentHealth.poc_contact}
                  onChange={this.onChangePoc_contact}
                />
              </div>

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteHealth}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateHealth}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Health cause</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
