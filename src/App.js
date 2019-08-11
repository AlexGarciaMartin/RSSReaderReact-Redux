import React, { Component } from "react";
import { Switch, Route} from "react-router";

import ProductList from "./components/views/ProductList";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={ProductList} />
                </Switch>
        )
    }
}


export default App;
