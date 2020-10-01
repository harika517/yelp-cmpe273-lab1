import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/createevent" className=" btn btn-dark">
        Create Event
      </Link>
      <Link to="/viewevents" className=" btn btn-dark">
        View Events
      </Link>
      <Link to="/participants" className=" btn btn-dark">
        View Attendees
      </Link>
    </div>
  );
};

export default RestaurantActions;
