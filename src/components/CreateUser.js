import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userName: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            userName: this.state.userName
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))

        this.setState({
            userName: ""
        });

    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.onChange}
                            name="userName" />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            required
                            className="btn btn-primary"
                            value="Create User!"
                            />
                    </div>
                </form>
            </div>
        )
    }
}
