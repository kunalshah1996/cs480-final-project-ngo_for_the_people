import React, { Component } from "react";
import HealthDataService from "../services/health.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeCause_id = this.onChangeCause_id.bind(this);
    this.onChangeOrg_name = this.onChangeOrg_name.bind(this);
    this.onChangeNeed_type = this.onChangeNeed_type.bind(this);
    this.onChangeNeed_quantity = this.onChangeNeed_quantity.bind(this);
    this.onChangePoc_name = this.onChangePoc_name.bind(this);
    this.onChangePoc_contact = this.onChangePoc_contact.bind(this);
    this.saveHealth = this.saveHealth.bind(this);
    this.newHealth = this.newHealth.bind(this);

    this.state = {
      id: null,
      cause_id:"",
      org_name:"",
      need_type: "",
      need_quantity:"",
      poc_name:"",
      poc_contact:"",
      submitted: false
    };
  }

  onChangeCause_id(e) {
    this.setState({
      cause_id: e.target.value
    });
  }

  onChangeOrg_name(e) {
    this.setState({
      org_name: e.target.value
    });
  }

  onChangeNeed_type(e) {
    this.setState({
      need_type: e.target.value
    });
  }

  onChangeNeed_quantity(e) {
    this.setState({
      need_quantity: e.target.value
    });
  }

  onChangePoc_name(e) {
    this.setState({
      poc_name: e.target.value
    });
  }

  onChangePoc_contact(e) {
    this.setState({
      poc_contact: e.target.value
    });
  }

  

  saveHealth() {
    var data = {
      cause_id: this.state.cause_id,
      org_name: this.state.org_name,
      need_type: this.state.need_type,
      need_quantity: this.state.need_quantity,
      poc_name: this.state.poc_name,
      poc_contact: this.state.poc_contact,
      
    };

    HealthDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          cause_id: response.data.cause_id,
          org_name: response.data.org_name,
          need_type: response.data.need_type,
          need_quantity: response.data.need_quantity,
          poc_name: response.data.poc_name,
          poc_contact: response.data.poc_contact,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  newHealth() {
    this.setState({
      id: null,
      cause_id: "",
      org_name: "",
      need_type: "",
      need_quantity:"",
      poc_name:"",
      poc_contact:"",
      submitted: false
    });
  }

  render() {
    return (
      <body id = "bg">
        <div className="submit-form" id = "second">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/healths'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Cause ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_id"
                  required
                  value={this.state.cause_id}
                  onChange={this.onChangeCause_id}
                  name="cause_id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Organisation Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="org_name"
                  required
                  value={this.state.org_name}
                  onChange={this.onChangeOrg_name}
                  name="org_name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Need Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_type"
                  required
                  value={this.state.need_type}
                  onChange={this.onChangeNeed_type}
                  name="need_type"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Need Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_quantity"
                  required
                  value={this.state.need_quantity}
                  onChange={this.onChangeNeed_quantity}
                  name="need_quantity"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Name (Point of Contact)</label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_name"
                  required
                  value={this.state.poc_name}
                  onChange={this.onChangePoc_name}
                  name="poc_name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Contact (point of contact) </label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_contact"
                  required
                  value={this.state.poc_contact}
                  onChange={this.onChangePoc_contact}
                  name="poc_contact"
                />
              </div>

             
  
              <button onClick={this.saveHealth} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
      );
  }
}