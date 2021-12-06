import React, { Component } from "react";
import ReceiverDataService from "../services/receiver.service";

export default class Receiver extends Component {
  constructor(props) {
    super(props);
    this.onChangeCause_id = this.onChangeCause_id.bind(this);
    this.onChangeReceiver_ssn = this.onChangeReceiver_ssn.bind(this);
    this.onChangeReceiver_name = this.onChangeReceiver_name.bind(this);
    this.onChangeReceiver_contact = this.onChangeReceiver_contact.bind(this);
    this.onChangeReceiver_income = this.onChangeReceiver_income.bind(this);
    this.onChangeReceiver_family = this.onChangeReceiver_family.bind(this);
    this.onChangeReceiver_location = this.onChangeReceiver_location.bind(this);
    this.getReceiver = this.getReceiver.bind(this);
    this.updateReceiver = this.updateReceiver.bind(this);
    this.deleteReceiver= this.deleteReceiver.bind(this);

    this.state = {
      currentReceiver: {
        cause_id: "",
        receiver_ssn: "",
        receiver_name: "",
        receiver_contact: "",
        receiver_income: "",
        receiver_family: "",
        receiver_location: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getReceiver(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }


  onChangeCause_id(e) {
    const cause_id = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        cause_id: cause_id
      }
    }));
  }

  onChangeReceiver_ssn(e) {
    const receiver_ssn = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_ssn: receiver_ssn
      }
    }));
  }

  onChangeReceiver_name(e) {
    const receiver_name = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_name: receiver_name
      }
    }));
  }

  onChangeReceiver_contact(e) {
    const receiver_contact = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_contact: receiver_contact
      }
    }));
  }

  onChangeReceiver_income(e) {
    const receiver_income = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_income: receiver_income
      }
    }));
  }
  onChangeReceiver_family(e) {
    const receiver_family = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_family: receiver_family
      }
    }));
  }

  onChangeReceiver_location(e) {
    const receiver_location = e.target.value;
    
    this.setState(prevState => ({
      currentReceiver: {
        ...prevState.currentReceiver,
        receiver_location: receiver_location
      }
    }));
  }

  getReceiver(id) {
    ReceiverDataService.get(id)
      .then(response => {
        this.setState({
          currentReceiver: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateReceiver() {
    ReceiverDataService.update(
      this.state.currentReceiver.cause_id,
      this.state.currentReceiver
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The receiver was updated successfully!"
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteReceiver() {    
      console.log(this.state.currentReceiver.cause_id)
    ReceiverDataService.delete(this.state.currentReceiver.cause_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/receivers')
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentReceiver } = this.state;

    return (
      <body id ="bg">
      <div>
      
        {currentReceiver ? (
          <div className="edit-form" id = "fifth">
            <h4 id = "fontc">Receiver</h4>
            <form>
              <div className="form-group">
                <label htmlFor="cause_id">Cause ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_id"
                  value={currentReceiver.cause_id}
                  onChange={this.onChangeCause_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiver_ssn">Receiver SSN</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_ssn"
                  value={currentReceiver.receiver_ssn}
                  onChange={this.onChangeReceiver_ssn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiver_name">Receiver Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_name"
                  value={currentReceiver.receiver_name}
                  onChange={this.onChangeReceiver_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiver_contact">Receiver Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_contact"
                  value={currentReceiver.receiver_contact}
                  onChange={this.onChangeReceiver_contact}
                />
              </div>

              <div className="form-group">
                <label htmlFor="receiver_income">Receiver Income</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_income"
                  value={currentReceiver.receiver_income}
                  onChange={this.onChangeReceiver_income}
                />
              </div>

              <div className="form-group">
                <label htmlFor="receiver_family">Receiver Family</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_family"
                  value={currentReceiver.receiver_family}
                  onChange={this.onChangeReceiver_family}
                />
              </div>

              <div className="form-group">
                <label htmlFor="receiver_location">Receiver Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_location"
                  value={currentReceiver.receiver_location}
                  onChange={this.onChangeReceiver_location}
                />
              </div>

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteReceiver}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateReceiver}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Receiver</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
