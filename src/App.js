import React, { Component } from "react";
import { Switch, Route} from "react-router";
import main from "./components/views/main";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={main} />
                </Switch>
        )
    }
}


export default App;
