import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

function App() {
    const [events, setEvents] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        axios.get('https://projecttool-ujef.onrender.com/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [isSuccess]);

    const [formData, setFormData] = useState({
        title: '',
        status: '',
        Manager: '',
        date: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://projecttool-ujef.onrender.com/events', formData)
            .then(response => {
                console.log('Event added successfully:', response.data);
                setFormData({
                    title: '',
                    status: '',
                    Manager: '',
                    date: ''
                });
                setIsSuccess(true);
            })
            .catch(error => {
                setIsSuccess(false);
                console.error('Error adding event:', error);
            });
    };
    

    const handleDelete = (id) => {
        axios.delete(`https://projecttool-ujef.onrender.com/events/${id}`)
            .then(response => {
                console.log('Event deleted successfully:', response.data);
                setIsSuccess(true);
            })
            .catch(error => {
                setIsSuccess(false);
                console.error('Error deleting event:', error);
            });
    };

    return (
        <div>
            <div className="">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container my-2">
                        <h4>Project Management</h4>
                        <div>
                            <button type="button"
                                className="btn btn-success mx-3" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                Add Project
                            </button>
                            <Link className="btn btn-primary ml-auto" to="/home">
                                Home
                            </Link>

                            <Link className="btn btn-primary mx-3" to="/">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <h5 className="text-center my-2">List of Projects</h5>
                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Deadline</th>
                                <th scope='col'>Manager</th>
                                <th scope="col">Status</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                            events.map(event => (
                                <tr key={event._id}>
                                    <th>{event.title}</th>
                                    <td>{event.date.slice(0,10)}</td>
                                    <td>{event.Manager}</td>
                                    <td>{event.status}</td>
                                    <td><Link className="btn btn-primary ml-auto" to={`/update/${event._id}`}>
                                        Update
                                    </Link></td>
                                    <td><button onClick={() => handleDelete(event._id)} className="btn btn-danger">
                                        Delete
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Title</label>
                                    <input onChange={handleInputChange}
                                        value={formData.title} type="text"
                                        className="form-control" name="title"
                                        id="inputAddress" placeholder="Event Title" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="inputAddress2">Status</label>
                                    <input onChange={handleInputChange}
                                        value={formData.status} type="text"
                                        className="form-control" name="status"
                                        value="Yet to Start"
                                        id="inputAddress2" placeholder="Enter Status" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="inputAddress2">Manager</label>
                                    <input onChange={handleInputChange}
                                        value={formData.Manager} type="text"
                                        className="form-control" name="Manager"
                                        id="inputAddress2" placeholder="Enter Manager Name" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="inputAddress2">Deadline</label>
                                    <input onChange={handleInputChange}
                                        value={formData.date} type="date"
                                        className="form-control" name="date"
                                        id="inputAddress2" placeholder="Enter Date" />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">
                                    Add Project
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
