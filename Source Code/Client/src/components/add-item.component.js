import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import '../item.css';

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeDonation_id = this.onChangeDonation_id.bind(this);
    this.onChangeItem_type = this.onChangeItem_type.bind(this);
    this.onChangeItem_quantity = this.onChangeItem_quantity.bind(this);
    this.onChangeItem_status = this.onChangeItem_status.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      donation_id:"",
      item_type:"",
      item_quantity: "",
      item_status:"",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeDonation_id(e) {
    this.setState({
      donation_id: e.target.value
    });
  }

  onChangeItem_type(e) {
    this.setState({
      item_type: e.target.value
    });
  }

  onChangeItem_quantity(e) {
    this.setState({
      item_quantity: e.target.value
    });
  }

  onChangeItem_status(e) {
    this.setState({
      item_status: e.target.value
    });
  }

  saveItem() {
    var data = {
      donation_id: this.state.donation_id,
      item_type: this.state.item_type,
      item_quantity: this.state.item_quantity,
      item_status: this.state.item_status
    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          donation_id: response.data.donation_id,
          item_type: response.data.item_type,
          item_quantity: response.data.item_quantity,
          item_status: response.data.item_status,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      donation_id: "",
      item_type: "",
      item_quantity: "",
      item_status:"",
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
              <button className="btn btn-success" onClick={window.location.href = '/items'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Donation ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_id"
                  required
                  value={this.state.donation_id}
                  onChange={this.onChangeDonation_id}
                  name="donation_id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Item Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_type"
                  required
                  value={this.state.item_type}
                  onChange={this.onChangeItem_type}
                  name="item_type"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Item Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_quantity"
                  required
                  value={this.state.item_quantity}
                  onChange={this.onChangeItem_quantity}
                  name="item_quantity"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Item Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_status"
                  required
                  value={this.state.item_status}
                  onChange={this.onChangeItem_status}
                  name="item_status"
                />
              </div>


  
              <button onClick={this.saveItem} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}