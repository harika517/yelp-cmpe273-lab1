import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllEvents } from '../../actions/events';
import events from '../../reducers/events';
import EventItem from './EventItem';

const Viewevents = ({
  getAllEvents,
  events: {
    allevents: { result },
    loading,
  },
}) => {
  useEffect(() => {
    getAllEvents();
  }, []);

  const [formData, setFormData] = useState({
    search: '',
  });

  const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      {loading ? (
        ' '
      ) : (
        <Fragment>
          <Link to="/dashboard" className="btn btn-dark">
            {' '}
            Go Back{' '}
          </Link>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label for="search">Search Events</label>
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => onChange(e)}
              />
            </div>
            <Link to={`/viewevent/${search}`} className="btn btn-dark">
              Go
            </Link>
          </form>
          <hr></hr>
          <h3 className="text-dark"> Events</h3>

          <div className="card">
            {result.length > 0 ? (
              result.map((item) => (
                <Fragment>
                  <EventItem key={item.id} events={item} />
                </Fragment>
              ))
            ) : (
              <h4> No Events Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Viewevents.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getAllEvents })(Viewevents);
