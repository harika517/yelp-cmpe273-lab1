import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomersRegistered } from '../../actions/eventregistration';
import { getCustomerProfileByName } from '../../actions/profile';

//getCustomersRegistered
//getCustomerProfileByName
const ViewAttendees = ({
  getCustomersRegistered,
  getCustomerProfileByName,
  eventregister: { customersreg },
  match,
}) => {
  useEffect(() => {
    getCustomersRegistered(match.params.Event_Name);
  }, []);
  console.log('Customer Registered', customersreg);
  //   useEffect(() => {
  //     // if (customersreg) {
  //     //   getCustomerProfileByName();
  //     // }
  //   });
  let arrobj = customersreg
    ? customersreg.result
      ? customersreg.result
      : null
    : null;
  console.log('array object is ', arrobj);
  if (arrobj) {
    return (
      <div>
        <Link to="/restaurantevents" className="btn btn-dark">
          Go Back{' '}
        </Link>
        {arrobj
          ? arrobj.map((item) => (
              <Fragment>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <h2 class="card-title text-dark bold">
                          {item.Cust_Name}
                        </h2>
                        <h4 class="card-text lead ">{item.Event_Name}</h4>
                        {console.log(
                          'before redirecting, ',
                          item.Event_Name.split(' ').join('%20'),
                          item.Cust_Name
                        )}
                        <Link
                          to={`/viewattendees/${item.Event_Name}/${item.Cust_Name}`}
                          class="text-primary lead"
                        >
                          Get Customer Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <p>{item.Cust_Name}</p> */}
              </Fragment>
            ))
          : 'fail'}
      </div>
    );
  } else {
    return null;
  }
};

ViewAttendees.propTypes = {
  getCustomersRegistered: PropTypes.func.isRequired,
  eventregister: PropTypes.object.isRequired,
  getCustomerProfileByName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  eventregister: state.eventregister,
});
export default connect(mapStateToProps, { getCustomersRegistered })(
  ViewAttendees
);
