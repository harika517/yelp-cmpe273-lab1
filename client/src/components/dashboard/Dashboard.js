import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading ? (
    ''
  ) : (
    <Fragment>
      <div>
        {/* {console.log('ThisOne', profile.Cust_Name)} */}
        <img src={profile.Cust_ProfilePic} alt="Profile Picture" />
        <h3 className="large text-primary">
          {' '}
          <i className="fas fa-user" />
          {profile.Cust_Name}
        </h3>
      </div>
      <Fragment>
        <Link to="/createprofile" className="btn btn-dark my-1">
          Create Profile
        </Link>
        <Link to="/createprofile" className="btn btn-dark my-1">
          Edit Profile
        </Link>
      </Fragment>
    </Fragment>
  );

  // console.log('dashboard', profile.profile);
  // return (
  //   <Fragment>
  //     <div>
  //       {/* //{console.log('ThisOne', profile.Cust_Name)} */}
  //       {/* <img src={profile.Cust_ProfilePic} alt="Profile Picture" /> */}
  //       <h1 className="large text-dark">
  //         {' '}
  //         <i className="fas fa-user" />
  //         Profile Overview
  //       </h1>
  //     </div>
  //     <Fragment>
  //       <Link to="/createprofile" className="btn btn-dark my-1">
  //         Update Profile
  //       </Link>
  //     </Fragment>
  //     {/* {profile !== null ? (
  //       <Fragment>
  //         <Link to="/createprofile" className="btn btn-dark my-1">
  //           Update Profile
  //         </Link>
  //       </Fragment>
  //     ) : (
  //       <Fragment>
  //         <h4>Recent Activity</h4>
  //         <p> We dont have any recent activity from you.</p>
  //         <h4>Profile Overview</h4>
  //         <p> You have not set your profile yet.</p>
  //         <Link to="/createprofile" className="btn btn-dark my-1">
  //           Create Profile
  //         </Link>
  //       </Fragment>
  //     )}*/}
  //   </Fragment>
  // );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
