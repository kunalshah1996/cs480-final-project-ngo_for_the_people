import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeDonation_id = this.onChangeDonation_id.bind(this);
    this.onChangeItem_type = this.onChangeItem_type.bind(this);
    this.onChangeItem_quantity = this.onChangeItem_quantity.bind(this);
    this.onChangeItem_status = this.onChangeItem_status.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem= this.deleteItem.bind(this);

    this.state = {
      currentItem: {
        donation_id: "",
        item_type: "",
        item_quantity: "",
        item_status: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeDonation_id(e) {
    const donation_id = e.target.value;

    this.setState(prevState => ({
        currentItem: {
          ...prevState.currentItem,
          donation_id: donation_id
        }
    }));
  }

  onChangeItem_type(e) {
    const item_type = e.target.value;
    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        item_type: item_type
      }
    }));
  }

  onChangeItem_quantity(e) {
    const item_quantity = e.target.value;
    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        item_quantity: item_quantity
      }
    }));
  }

  onChangeItem_status(e) {
    const item_status = e.target.value;
    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        item_status: item_status
      }
    }));
  }

  
  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateItem() {
    ItemDataService.update(
      this.state.currentItem.donation_id,
      this.state.currentItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The item was updated successfully!"
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteItem() {    
      console.log(this.state.currentItem.donation_id)
      ItemDataService.delete(this.state.currentItem.donation_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/items')
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      <body id = "bg">
      <div>
        {currentItem ? (
          <div className="edit-form" id = "fifth">
            <h4 id = "fontc">Item</h4>
            <form>
              <div className="form-group">
                <label htmlFor="donation_id">Donation ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_id"
                  value={currentItem.donation_id}
                  onChange={this.onChangeDonation_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_type">Item type</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_type"
                  value={currentItem.item_type}
                  onChange={this.onChangeItem_type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_quantity">Item Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_quantity"
                  value={currentItem.item_quantity}
                  onChange={this.onChangeItem_quantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="item_status">Item Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="item_status"
                  value={currentItem.item_status}
                  onChange={this.onChangeItem_status}
                />
              </div>
              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Item</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
