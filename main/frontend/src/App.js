import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Ecom from "./screens/Ecom";
import Home from "./screens/Home";
import Prod_details from "./screens/Product";

function App(){

  return (
    <Router>
      <main className="app">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/store" component={Ecom}/>
          <Route exact path="/product/:id" component={Prod_details}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
