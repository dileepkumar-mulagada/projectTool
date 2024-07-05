// client/src/Update.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Update() {
    const { id } = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://projecttool-ujef.onrender.com/events/${id}`)
            .then(response => {
                setEvent(response.data);
                setIsLoading(false);
                console.log(response.data);

            })
            .catch(error => {
                // Handle error
                alert('Error fetching event:', error);
            });
    }, [id]);


    const [updatedTitle, setUpdatedTitle] = useState(event ? event.title : '');
    const [updatedStatus, setUpdatedStatus] = useState(event ? event.status : '');
    const [updatedManager, setUpdatedManager] = useState(event ? event.Manager : '');
    const [updatedDate, setUpdatedDate] = useState(event ? event.dat : '');

    const handleUpdate = e => {
        e.preventDefault();

        const updatedEvent = {
            title: updatedTitle,
            status: updatedStatus,
            Manager: updatedManager,
            date: updatedDate
        };

        axios
            .put(`https://projecttool-ujef.onrender.com/events/${id}`, updatedEvent)
            .then(() => {
                // Handle successful update
                alert('Event updated successfully!');
            })
            .catch(error => {
                // Handle error
                alert('Error updating event:', error);
            });
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container my-2">
                    <h4>GFG Event</h4>
                    <Link className="btn btn-primary ml-auto" to="/dashboard">
                        Dashboard
                    </Link>
                </div>
            </nav>
            <div className="row my-3">
                <div className="col-lg-4">
                    {isLoading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="inputAddress"
                                    placeholder="Event Title"
                                    defaultValue={event.title}
                                    onChange={e => setUpdatedTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="inputAddress2">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    id="inputAddress2"
                                    placeholder="Enter Status"
                                    defaultValue={event.status}
                                    onChange={e => setUpdatedStatus(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="inputAddress2">Manager</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Manager"
                                    id="inputAddress2"
                                    placeholder="Enter Manager Name"
                                    defaultValue={event.Manager}
                                    onChange={e => setUpdatedManager(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="inputAddress2">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    id="inputAddress2"
                                    placeholder="Enter Date"
                                    defaultValue={event.date}
                                    onChange={e => setUpdatedDate(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Update;
