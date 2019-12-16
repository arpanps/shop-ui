import React, { Component } from 'react';

import PackageService from '../service/PackageService';

class ListPackagesComponent extends Component {
  constructor(props) {
        super(props)
 		this.state = {
            packages: [],
            message: null
        }
        this.refreshPackages = this.refreshPackages.bind(this)
		this.deletePackageClicked = this.deletePackageClicked.bind(this)
		this.updatePackageClicked = this.updatePackageClicked.bind(this)
		this.addPackageClicked = this.addPackageClicked.bind(this)

    }
    componentDidMount() {
        this.refreshPackages();
    }
    refreshPackages() {
        PackageService.retrieveAllPackages()
            .then(
                response => {
					console.log("Here");
                    console.log(response);
                    this.setState({ packages: response.data })
                }
            )
    }

	deletePackageClicked(id) {
	    PackageService.deletePackage(id)
	        .then(
	            response => {
	                this.setState({ message: `Delete of package ${id} Successful` })
	                this.refreshPackages()
	            }
	        )
	}

	updatePackageClicked(id) {
	    console.log('update ' + id)
	    this.props.history.push(`/packages/${id}`)
	}
	
	addPackageClicked() {
	    this.props.history.push(`/packages/-1`)
	}
	
    render() {
        return (
            <div className="container">
                <h3>All Packages</h3>
				{this.state.message && <div className="alert alert-success">{this.state.message}</div>}

                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
								<th>Name</th>
                                <th>Description</th>
								<th>Update</th>
								<th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.packages.map(
                                    shopPackage =>
                                        <tr key={shopPackage.id}>
                                            <td>{shopPackage.id}</td>
                                            <td>{shopPackage.name}</td>
                                            <td>{shopPackage.description}</td>

											<td><button className="btn btn-success" onClick={() => this.updatePackageClicked(shopPackage.id)}>Update</button></td>

											<td><button className="btn btn-warning" onClick={() => this.deletePackageClicked(shopPackage.id)}>Delete</button></td>

                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

				<div className="row">
				    <button className="btn btn-success" onClick={this.addPackageClicked}>Add</button>
				</div>
            </div>
        )
    }
}
export default ListPackagesComponent