import React, { Component } from "react";
import QueriesDataService from "../services/queries.service";

export default class extends Component {
  constructor(props) {
    super(props);
    this.setTrimName = this.setTrimName.bind(this);
    this.state = {
        result:null 
    };
    
  }

  componentDidMount() {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
    this.setTrimName();
  }
  setTrimName() {
    QueriesDataService.trim_ename()
      .then(response => {
        this.setState({
          result: response.data.result
        });
        // console.log(response.data.result)
      })
      .catch(e => {
        alert(e);
      });
  }


  render() {
    const { result} = this.state;
    console.log(result)
    return (
        <div>{this.state.result!= null &&
        <div className="col-md-6">
            <div>{result.changedRows>0 &&
              <h4>Updated {result.changedRows} records</h4>
             }</div>
            <div>{result.changedRows<=0 &&
                 <h4>No records updated</h4>
                
                }</div>
        </div>
        }</div>
    );
    }
}