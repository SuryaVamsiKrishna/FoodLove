//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prods : [],
        item : ""
      }
  };
  changeHandler = (event) => {
    this.setState({item: event.target.value})
  }
  componentDidMount = async() =>{
  await axios.get('http://localhost:8080/store').then((response) => {
            console.log(response.data)
            let data = [];
            console.log(response.data)
            for(var i =0; i < response.data.length; i++){
                data.push(response.data[i])
            }
            this.setState({prods: data})
        })
        .catch((error)=> console.log(error));
      };
  render() {
  return (
    <div>
      helo
      <table><tbody>
        {this.state.prods.map((prod, index) =>
        <tr key={index}>
        <td><h1 name="prods" value={prod._id}/>{prod.name}</td>
        </tr>)}
      </tbody></table>
    
      
    </div>
  );
}
}

export default App;
