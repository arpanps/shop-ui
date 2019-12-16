import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PackageService from '../service/PackageService';

class PackageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
			name: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    componentDidMount() {
        console.log(this.state.id)
        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }
        PackageService.retrievePackage(this.state.id)
            .then(response => this.setState({
	            name: response.data.name,
                description: response.data.description,
				currencyCode:response.data.currencyCode
            }))
    }
    validate(values) {
		console.log(values)
        let errors = {}
		if (!values.name) {
            errors.name = 'Enter a Name'
        } else if (values.name.length < 1) {
            errors.name = 'Enter atleast 1 Characters in Name'
        }
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }
        return errors
    }
    onSubmit(values) {
        console.log(values);

        let shopPackage = {
            id: this.state.id,
            name: values.name,
            description: values.description,
			currencyCode: values.currencyCode
        }
        if (this.state.id === -1) {
            PackageService.createPackage(shopPackage)
                .then(() => this.props.history.push('/packages'))
				.catch(error => {console.log(error.response.data.errorMessage)})
        } else {
            PackageService.updatePackage(this.state.id, shopPackage)
                .then(() => this.props.history.push('/packages'))				
				.catch(error => {console.log(error.response.data.errorMessage)})
        }
    }
    render() {
		console.log(this.state)
        let { description, name,id, currencyCode} = this.state
		if(id == -1){
			id = ""
		}
        return (
            <div>
                <h3>Package</h3>
                <div className="container">
                    <Formik
                        initialValues={{ name:name, id:id, description:description, currencyCode:currencyCode}}
						onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
									<ErrorMessage name="name" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
 									<fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Currency</label>
                                        <Field className="form-control" type="text" name="currencyCode" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
export default PackageComponent