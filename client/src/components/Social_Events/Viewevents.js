import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  return (
    <Fragment>
      {loading ? (
        ' '
      ) : (
        <Fragment>
          <h3 className="text-dark"> Events</h3>
          <div className="card">
            {result.length > 0 ? (
              result.map((item) => <EventItem key={item.id} events={item} />)
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
