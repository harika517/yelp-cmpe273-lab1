import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerDetailEvent } from '../../actions/eventregistration';

const CustomerDetailRegistration = ({
  match,
  getCustomerDetailEvent,
  custdetail: { customer_profile },
}) => {
  console.log('match params customer', match.params);
  let { Event_Name, Cust_Name } = match.params;
  useEffect(() => {
    getCustomerDetailEvent(Event_Name, Cust_Name);
  }, []);
  return (
    <Fragment>
      {customer_profile ? (
        <Fragment>
          {/* <Link to={`/viewevents/${Event_Name}`} className="btn btn-dark">
            Go Back
          </Link> */}
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title text-dark bold">
                    {customer_profile.First_Name} {customer_profile.Last_Name}
                  </h2>
                  <h4 class="card-text lead ">
                    <i className="fas fa-envelope-open-text text-dark"></i>
                    {customer_profile.Cust_email_id}
                  </h4>

                  <h4 class="card-text lead ">
                    <i className="fas fa-phone-alt text-dark"></i>
                    {customer_profile.Phone_Number}
                  </h4>
                  <h4 class="card-text lead ">
                    <i className="fas fa-home text-dark"></i>
                    {customer_profile.City}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        'none'
      )}
    </Fragment>
  );
};

CustomerDetailRegistration.propTypes = {
  getCustomerDetailEvent: PropTypes.func.isRequired,
  custdetail: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  custdetail: state.custdetail,
});
export default connect(mapStateToProps, { getCustomerDetailEvent })(
  CustomerDetailRegistration
);
