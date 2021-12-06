import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";
import '../item.css';
// export default ItemList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDonation_id = this.onChangeSearchDonation_id.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.searchDonation_id = this.searchDonation_id.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchItem: ""
    };
  }

  componentDidMount() {
    this.retrieveItems();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchDonation_id(e) {
    const searchDonation_id = e.target.value;

    this.setState({
      searchDonation_id: searchDonation_id
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index
    });
  }

  removeAllItems() {
    ItemDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        alert(e);
      });
  }

  searchDonation_id() {
    ItemDataService.findById(this.state.searchDonation_id)
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }
  addItem() {
    window.location="/additem"
  }

  render() {
    const { searchDonation_id, items, currentItem, currentIndex } = this.state;

    return (
      <body id = "bg">
      <div className="list row" id ="first">
        <div className="col-md-8" id= "third">
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by the ID of Donation"
              value={searchDonation_id}
              id = "fourth"
              onChange={this.onChangeSearchDonation_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchDonation_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addItem}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "item1">
          <h4>Items List</h4>

          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  {item.donation_id}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentItem.donation_id}
              </div>
              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentItem.item_type}
              </div>
              <div>
                <label>
                  <strong>Quantity:</strong>
                </label>{" "}
                {currentItem.item_quantity}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentItem.item_status}
              </div>
            

              <Link
                to={"/items/" + currentItem.donation_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Item</p>
            </div>
          )}
        </div>
      </div>
      </body>
    );
    }
}