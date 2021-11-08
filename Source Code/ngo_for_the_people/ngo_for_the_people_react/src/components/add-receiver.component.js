import React, { Component } from "react";
import ReceiverDataService from "../services/receiver.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeReceiver_id = this.onChangeReceiver_id.bind(this);
    this.onChangeReceiver_cause_id = this.onChangeReceiver_cause_id.bind(this);
    this.onChangeReceiver_ssn = this.onChangeReceiver_ssn.bind(this);
    this.onChangeReceiver_name = this.onChangeReceiver_name.bind(this);
    this.onChangeReceiver_contact = this.onChangeReceiver_contact.bind(this);
    this.onChangeReceiver_income = this.onChangeReceiver_income.bind(this);
    this.onChangeReceiver_family = this.onChangeReceiver_family.bind(this);
    this.onChangeReceiver_location = this.onChangeReceiver_location.bind(this);
    this.saveReceiver = this.saveReceiver.bind(this);
    this.newReceiver = this.newReceiver.bind(this);

    this.state = {
      id: null,
      receiver_id:"",
      receiver_cause_id:"",
      receiver_ssn: "",
      receiver_name:"",
      receiver_contact:"",
      receiver_income:"",
      receiver_family:"",
      receiver_location:"",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeReceiver_id(e) {
    this.setState({
      receiver_id: e.target.value
    });
  }

  onChangeReceiver_cause_id(e) {
    this.setState({
      receiver_cause_id: e.target.value
    });
  }

  onChangeReceiver_ssn(e) {
    this.setState({
      receiver_ssn: e.target.value
    });
  }

  onChangeReceiver_name(e) {
    this.setState({
      receiver_name: e.target.value
    });
  }

  onChangeReceiver_contact(e) {
    this.setState({
      receiver_contact: e.target.value
    });
  }

  onChangeReceiver_income(e) {
    this.setState({
      receiver_income: e.target.value
    });
  }

    onChangeReceiver_family(e) {
      this.setState({
        receiver_family: e.target.value
    });
  }

      onChangeReceiver_location(e) {
        this.setState({
          receiver_location: e.target.value
    });
  }


  saveReceiver() {
    var data = {
      receiver_id: this.state.receiver_id,
      receiver_cause_id: this.state.receiver_cause_id,
      receiver_ssn: this.state.receiver_ssn,
      receiver_name: this.state.receiver_name,
      receiver_contact: this.state.receiver_contact,
      receiver_income: this.state.receiver_income,
      receiver_family: this.state.receiver_family,
      receiver_location: this.state.receiver_location
    };

    ReceiverDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          receiver_id: response.data.receiver_id,
          receiver_cause_id: response.data.receiver_cause_id,
          receiver_ssn: response.data.receiver_ssn,
          receiver_name: response.data.receiver_name,
          receiver_contact: response.data.receiver_contact,
          receiver_income: response.data.receiver_income,
          receiver_family: response.data.receiver_family,
          receiver_location: response.data.receiver_location,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newReceiver() {
    this.setState({
      id: null,
      receiver_id: "",
      receiver_cause_id: "",
      receiver_ssn: "",
      receiver_name:"",
      receiver_contact:"",
      receiver_income:"",
      receiver_family:"",
      receiver_location:"",
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/receivers'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Receiver ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_id"
                  required
                  value={this.state.receiver_id}
                  onChange={this.onChangeReceiver_id}
                  name="receiver_id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Receiver Cause ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_cause_id"
                  required
                  value={this.state.receiver_cause_id}
                  onChange={this.onChangeReceiver_cause_id}
                  name="receiver_cause_id"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver SSN</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_ssn"
                  required
                  value={this.state.receiver_ssn}
                  onChange={this.onChangeReceiver_ssn}
                  name="receiver_ssn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_name"
                  required
                  value={this.state.receiver_name}
                  onChange={this.onChangeReceiver_name}
                  name="receiver_name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_contact"
                  required
                  value={this.state.receiver_contact}
                  onChange={this.onChangeReceiver_contact}
                  name="receiver_contact"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver Income</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_income"
                  required
                  value={this.state.receiver_income}
                  onChange={this.onChangeReceiver_income}
                  name="receiver_income"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver Family</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_family"
                  required
                  value={this.state.receiver_family}
                  onChange={this.onChangeReceiver_family}
                  name="receiver_family"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Receiver Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_location"
                  required
                  value={this.state.receiver_location}
                  onChange={this.onChangeReceiver_location}
                  name="receiver_location"
                />
              </div>

  
              <button onClick={this.saveReceiver} className="mt-3 btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
          
      );
  }
}