import React, { Component } from 'react'
import axios from 'axios';
import Exercise from './Exercise';

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }

        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                console.log(res.data)
                this.setState({exercises: res.data})
            })
            .catch(err => console.log(err)); 
    }
    onDelete(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }
    exerciseList() {
        return this.state.exercises.map(exercise => {
            return <Exercise exercise={exercise} onDelete={this.onDelete} key={exercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
