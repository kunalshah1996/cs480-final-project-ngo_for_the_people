import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class BudgetCity extends Component {
  constructor(props) {
    super(props);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.showBudget = this.showBudget.bind(this);
    
    this.state = {
      city_budget: [],
      submitted: false,
      city: null
    };
    console.log(typeof this.state) 
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
    //console.log(this.state)
  }

  showBudget() {
    var data = {
        city: this.state.city,
      };
    this.setState({
        submitted: true
      });
      
    QueriesDataService.budget_city(data)
      .then(response => {
        this.setState({
          city_budget: response.data.result[0],
          submitted:true
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { city_budget,submitted} = this.state;
    console.log(city_budget)
    return (
        <div>

              <div className="form-group">
                <label htmlFor="title">Enter City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  required
                  value={this.state.city}
                  onChange={this.onChangeCity}
                  name="city"
                />
              </div>
              <button onClick={this.showBudget} className="mt-3 btn btn-success">
                Submit
              </button>
              <div>{submitted &&
            <div>
          <div className="col-md-6">
                <label>
                  <strong>Budget: </strong>
                </label>{" "}
                {city_budget.TOTAL_BUDGET}
              </div>
            </div>
            }</div>
          </div>
            
    );
    }
}