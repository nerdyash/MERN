import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }

        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.userName),
                        userName: res.data[0].userName
                    })
                }
            })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onChangeDate(date) {
        console.log(date)
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        console.log(exercise);

        window.location = '/';
    }
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.onChange}
                            name="userName">
                                {
                                    this.state.users.map((user) => {
                                        return <option key={user} value={user}>{user}</option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChange}
                            name="description" />
                    </div>
                    <div className="form-group">
                        <label>Duration: (in minutes) </label>
                        <input type="tel"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChange}
                            name="duration" />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            required
                            className="btn btn-primary"
                            value="Create Exercise Log"
                            />
                    </div>
                </form>
            </div>
        )
    }
}
