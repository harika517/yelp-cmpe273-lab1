import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';
import { insertImage } from '../../actions/uploadimages';

const Dashboard = ({
    getCurrentProfile,
    auth,
    profile: { profile, loading },
    insertImage,
}) => {
    const [image, setImage] = useState({
        file: '',
        fileText: '',
    });
    useEffect(() => {
        getCurrentProfile();
        setImage({
            file: loading || !profile.Cust_ProfilePic ? '' : profile.Cust_ProfilePic,
            fileText: 'Choose Image..',
        });
    }, [loading]);

    // const { Cust_ProfilePic } = formData;

    const onImageChange = (e) => {
        console.log('Inside On Image Change');
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        setImage({ file: e.target.files[0], fileText: e.target.files[0].name });
    };
    const onUpload = (e) => {
        e.preventDefault();
        insertImage(image.file, profile.Cust_email_id);
        window.location.reload(false);
    };

    // if (profile) {
    //   console.log('before get req', profile.Cust_ProfilePic);
    //   profile.Cust_ProfilePic = `http://54.215.250.62:3001/customer/addphoto/${profile.Cust_ProfilePic}`;
    // }

    if (profile) {
        console.log('ProfilePicture', profile.Cust_ProfilePic);
    }

    let backendimageserver = `http://54.215.250.62:3001/customer/getphoto/user/`;

    return loading ? (
        ''
    ) : ( <
        Fragment >
        <
        div className = "container_3columns" > { /* <div className="columns"> */ } <
        div className = "column_1" > {
            /* {console.log(
                        'inside fragment, profile.Cust_ProfilePic is',
                        profile.Cust_ProfilePic
                      )} */
        } <
        img src = {
            image.file ?
            `${backendimageserver}${image.file}` :
                `${backendimageserver}image`
        }
        alt = "Profile Picture" /
        > {
            /* {console.log(
                        'inside fragment, 2 profile.Cust_ProfilePic is',
                        profile.Cust_ProfilePic
                      )} */
        } <
        h3 className = "lead" > { ' ' } <
        i className = "fas fa-user" / > { profile.Cust_Name }
        's profile <
        /h3> <
        hr > < /hr>

        <
        form onSubmit = {
            (e) => onUpload(e) } >
        <
        br / >
        <
        div className = "custom-file"
        style = {
            { width: '80%' } } >
        <
        input type = "file"
        className = "custom-file-input"
        name = "image"
        accept = "image/*"
        onChange = {
            (e) => onImageChange(e) }
        /> <
        label className = "custom-file-label"
        htmlFor = "image" > { image.fileText } <
        /label> <
        /div> <
        br / >
        <
        button type = "submit"
        className = "btn btn-dark" >
        Upload <
        /button> <
        /form> <
        br / >
        <
        hr / >

        <
        Link to = "/viewrestaurants"
        className = "text-dark medium" > { ' ' } <
        i className = "fas fa-utensils" > < /i>
        Restaurants { ' ' } <
        /Link> <
        hr > < /hr> <
        Link to = { `/ordersplaced/${profile.Cust_Name}` }
        className = "text-dark medium" >
        <
        i className = "fas fa-tag" > < /i> Order History{' '} <
        /Link> <
        hr > < /hr> <
        Link to = { `/viewregisteredevents/${profile.Cust_Name}` }
        className = "text-dark medium" >
        { ' ' } <
        i className = "fas fa-users" > < /i> Events Attending{' '} <
        /Link> <
        hr > < /hr> <
        /div> { /* </div> */ } { /* <div className="columns"> */ } <
        div className = "column_2" >
        <
        h2 > { profile.Cust_Name } < /h2> <
        p className = "lead" >
        <
        i className = "fas fa-home" > < /i> { profile.City } { profile.State } { profile.Country } <
        /p> <
        hr / >
        <
        p className = "lead text-dark" > Recent Activity < /p> <
        /div> { /* </div> */ } { /* <div className="columns"> */ }

        <
        div className = "column_3" >
        <
        DashboardActions / >
        <
        hr / >
        <
        p className = "bold text-dark medium" > About { profile.Cust_Name }... < /p> {
            Object.keys(profile).map(
                (key) => {
                    if (
                        profile[key] !== '' && [
                            'Nick_Name',
                            'Headline',
                            'Yelping_Since',
                            'Things_I_Love',
                            'My_Blog_Or_Website',
                            'Find_Me_In',
                            'My_Favourite_Movie',
                            'Current_Crush',
                        ].includes(key)
                    ) {
                        return ( <
                            div >
                            <
                            p className = "lead" > { key.replaceAll('_', ' ') } < /p> <
                            h5 > { profile[key] } < /h5> <
                            /div>
                        );
                    }
                }
                // console.log(key + ' : ' + profile[key])
            )
        } <
        /div> { /* </div> */ } <
        /div> {
            /* <div className="row">
                    <div className="column"> */
        } {
            /* <img src={profile.Cust_ProfilePic} alt="Profile Picture" />
                  <h3 className="lead">
                    {' '}
                    <i className="fas fa-user" />
                    {profile.Cust_Name}'s profile
                  </h3> */
        } {
            /* </div>
                    <div className="column"> */
        } {
            /* <h2>{profile.Cust_Name}</h2>
                  <p className="lead">
                    {profile.City} {profile.State} {profile.Country}
                  </p> */
        } {
            /* <Link to="/createprofile" className="btn btn-dark my-1">
                        Create Profile
                      </Link> */
        }

        { /* <p className="lead text-dark"> Recent Activity</p> */ } {
            /* </div>
                    <div clasNames="column"> */
        } {
            /* <DashboardActions />

                  <p className="lead">About {profile.Cust_Name}</p>

                  {Object.keys(profile).map(
                    (key) => {
                      if (
                        profile[key] !== '' &&
                        [
                          'Nick_Name',
                          'Headline',
                          'Yelping_Since',
                          'Things_I_Love',
                          'My_Blog_Or_Website',
                          'Find_Me_In',
                          'My_Favourite_Movie',
                          'Current_Crush',
                        ].includes(key)
                      ) {
                        return (
                          <div>
                            <p className="lead">{key.replaceAll('_', ' ')}</p>
                            <h5>{profile[key]}</h5>
                          </div>
                        );
                      }
                    }
                    // console.log(key + ' : ' + profile[key])
                  )} */
        } {
            /* </div>
                  </div> */
        } <
        /Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    insertImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, insertImage })(
    Dashboard
);