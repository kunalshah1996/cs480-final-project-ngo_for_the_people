import React, { Component } from "react";
import ReceiverDataService from "../services/receiver.service";
import '../receiver.css';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeCause_id = this.onChangeCause_id.bind(this);
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
      cause_id:"",
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


  onChangeCause_id(e) {
    this.setState({
      cause_id: e.target.value
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
      cause_id: this.state.cause_id,
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
          cause_id: response.data.cause_id,
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
        alert(e);
      });
  }

  newReceiver() {
    this.setState({
      id: null,
      cause_id: "",
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
      <body id = "bg">
        <div className="submit-form" id ="second"> 
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/receivers'}>
                Close
              </button>
            </div>
          ) : (
            <div>
  
              <div className="form-group" id ="form">
                <label htmlFor="description">Cause ID</label>
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

  
              <button onClick={this.saveReceiver} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}