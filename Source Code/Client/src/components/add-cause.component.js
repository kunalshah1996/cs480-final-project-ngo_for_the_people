import React, { Component } from "react";
import CauseDataService from "../services/cause.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeCause_id = this.onChangeCause_id.bind(this);
    this.onChangeCause_type = this.onChangeCause_type.bind(this);
    this.onChangeCause_status = this.onChangeCause_status.bind(this);
    this.onChangeApprover_id = this.onChangeApprover_id.bind(this);
    
    this.saveCause = this.saveCause.bind(this);
    this.newCause = this.newCause.bind(this);

    this.state = {
      id: null,
      cause_type:"",
      cause_status:"",
      approver_id: "",
      
      submitted: false
    };
  }

  onChangeCause_id(e) {
    this.setState({
      cause_id: e.target.value
    });
  }

  onChangeCause_type(e) {
    this.setState({
      cause_type: e.target.value
    });
  }

  onChangeCause_status(e) {
    this.setState({
      cause_status: e.target.value
    });
  }

  onChangeApprover_id(e) {
    this.setState({
      approver_id: e.target.value
    });
  }

  
  saveCause() {
    var data = {
      cause_id: this.state.cause_id,
      cause_type: this.state.cause_type,
      cause_status: this.state.cause_status,
      approver_id : this.state.approver_id,
      
    };

    CauseDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          cause_id: response.data.cause_id,
          cause_type: response.data.cause_type,
          cause_status: response.data.cause_status,
          approver_id: response.data.approver_id,
          
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  newCause() {
    this.setState({
      id: null,
      cause_id: "",
      cause_type: "",
      cause_status: "",
      approver_id:"",
      
      submitted: false
    });
  }

  render() {
    return (
      <body id ="bg">
        <div className="submit-form" id = "second">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/causes'}>
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
                <label htmlFor="description">Cause Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_type"
                  required
                  value={this.state.cause_type}
                  onChange={this.onChangeCause_type}
                  name="cause_type"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Cause Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_status"
                  required
                  value={this.state.cause_status}
                  onChange={this.onChangeCause_status}
                  name="cause_status"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Approver ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="approver_id"
                  required
                  value={this.state.approver_id}
                  onChange={this.onChangeApprover_id}
                  name="approver_id"
                />
              </div>

              
  
              <button onClick={this.saveCause} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
      );
  }
}