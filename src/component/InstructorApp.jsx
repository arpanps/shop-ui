import React, { Component } from 'react';
import ListPackagesComponent from './ListPackagesComponent';
import PackageComponent from './PackageComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class InstructorApp extends Component {
    render() {
        return (
	 		<Router>
                <>
                    <h1>Shop Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListPackagesComponent} />
                        <Route path="/packages" exact component={ListPackagesComponent} />
                        <Route path="/packages/:id" component={PackageComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}



export default InstructorApp