import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/profile';
import { getReviewsByRestId } from '../../actions/review';
import { insertRestImage } from '../../actions/uploadimages';
import RestaurantActions from './RestaurantActions';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';
import { json } from 'body-parser';

const RestaurantDashboard = ({
    match,
    getCurrentRestProfile,
    getReviewsByRestId,
    auth,
    //profile: { profile, loading },
    restprofile: { rest_profile, loading },
    review: { reviews },
    insertRestImage,
}) => {
    console.log('before ', rest_profile);
    if (rest_profile) {
        console.log('match RestName', rest_profile.Rest_Id_signup);
    }
    //const { Rest_Name, Rest_email_id, Rest_location, Description } = profile;
    console.log('Match criteria', match.params);
    console.log('calling useeffect');
    // useEffect(() => {
    //   if (profile) {
    //     //console.log('Inside profile', profile.Rest_Name);
    //     getReviewsByRestName(profile.Rest_Name);
    //   }
    // }, [getReviewsByRestName]);

    const [image, setImage] = useState({
        file: '',
        fileText: '',
    });

    useEffect(() => {
        console.log('inside useEffect');
        getCurrentRestProfile();
        setImage({
            file: loading || !rest_profile.Rest_ProfilePic ?
                '' :
                rest_profile.Rest_ProfilePic,
            fileText: 'Choose Image..',
        });
    }, [loading]);
    useEffect(() => {
        //console.log('inside useeffect');
        // const restname = profile.Rest_Name;
        //getCurrentRestProfile();
        if (rest_profile) {
            getReviewsByRestId(rest_profile.Rest_Id_signup);
        }
    }, [loading]);

    // if (review) {
    //   console.log('after useeffect', review);
    // } else {
    //   let review = '';
    // }

    // let {
    //   review, Date
    // } = review ? review.result[0] : { ...null };

    const onImageChange = (e) => {
        console.log('Inside On Image Change');
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        setImage({ file: e.target.files[0], fileText: e.target.files[0].name });
    };
    const onUpload = (e) => {
        e.preventDefault();
        insertRestImage(image.file, rest_profile.Rest_ProfilePic);
        window.location.reload(false);
    };

    let backendimageserver = `http://54.215.250.62:3001/restaurant/getphoto/restaurant/`;

    console.log('restdash profile values are', rest_profile);
    let revs = reviews.result;
    console.log('restdash reviews are ', revs);
    if (rest_profile) {
        return ( <
            Fragment >
            <
            div className = "container_2columns" >
            <
            div className = "column1" > { /* <img src={rest_profile.Image} alt="Profile Picture" /> */ } <
            img src = {
                image.file ?
                `${backendimageserver}${image.file}` :
                    `${backendimageserver}image`
            }
            alt = "Profile Picture" /
            >

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
            h1 className = "x-large text-dark" > { rest_profile.Rest_Name } < /h1> <
            h4 >
            <
            i className = "fas fa-map-marker-alt" > < /i>{' '} { rest_profile.Rest_location } <
            /h4> <
            h4 >
            <
            i className = "far fa-clock" > < /i> {rest_profile.Timings} <
            /h4> <
            h4 > { rest_profile.Description } < /h4> { /* <br></br> */ } <
            h4 ClassName = "lead text-dark" > Available < /h4> {
                rest_profile.Curbside_PickUp === 'yes' ? ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / > CurbSide PickUp <
                    /h4>
                ) : ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / >
                    CurbSide PickUp option is temporarily unavailable <
                    /h4>
                )
            } {
                rest_profile.Dine_In === 'yes' ? ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / > Dine In <
                    /h4>
                ) : ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / >
                    Dine In option is temporarily unavailable <
                    /h4>
                )
            } {
                rest_profile.Yelp_Delivery === 'yes' ? ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / > Yelp Delivery <
                    /h4>
                ) : ( <
                    h4 className = "lead text-dark" >
                    <
                    i className = "fas fa-map-marker" / >
                    Yelp Delivery is temporarily unavailable <
                    /h4>
                )
            } <
            hr > < /hr> <
            Link to = "/createevent"
            className = " btn btn-dark" >
            Create Event <
            /Link> <
            Link to = "/restaurantevents"
            className = " btn btn-dark" >
            Events <
            /Link> <
            Link to = "/restaurantprofile"
            className = " btn btn-dark" >
            Create New Profile <
            /Link> {
                /* <Link to="#!" className=" btn btn-primary">
                              <i className="fas fa-camera"></i> Add Photo
                            </Link> */
            } <
            h3 className = "bold text-dark" > Reviews < /h3> {
                revs
                    ?
                    revs.map((item) => ( <
                        h4 > { item.Date } <
                        br > < /br> { item.review } <
                        hr / >
                        <
                        /h4>
                    )) :
                    'none'
            } <
            /div> <
            div className = "column2" >
            <
            Link to = { `/restaurant/editmenu/${rest_profile.Rest_Id_signup}` }
            className = "btn btn-dark" >
            Add Menu <
            /Link> <
            Link to = "/restaurant/menu"
            className = "btn btn-dark" >
            <
            i className = "fas fa-utensils" > < /i>
            View Menu <
            /Link> <
            br / >
            <
            br / >
            <
            Link to = { `/restaurant/orders/${rest_profile.Rest_Name}` }
            className = "btn btn-dark" >
            <
            i className = "fas fa-binoculars" > < /i>
            View Orders <
            /Link> <
            br > < /br> <
            br > < /br> <
            Link to = "/editrestaurantprofile"
            className = "lead text-dark" >
            <
            i className = "fas fa-id-card" > < /i> Edit Profile <
            /Link> <
            h4 className = " lead text-dark" >
            <
            i className = "fas fa-phone-alt" / > Contact <
            /h4> <
            h5 > { rest_profile.Contact } < /h5> <
            h4 className = " lead text-dark" >
            <
            i className = "fas fa-edit" / > Write to Us <
            /h4> <
            h5 > { rest_profile.Rest_email_id } < /h5> <
            /div> <
            /div> <
            /Fragment>
        );
    } else {
        return <p > Profile not defined < /p>;
    }
};

RestaurantDashboard.propTypes = {
    getCurrentRestProfile: PropTypes.func.isRequired,
    getReviewsByRestId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //profile: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    insertRestImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    restprofile: state.restprofile,
    // rest_profile: state.rest_profile,
    review: state.review,
});

export default connect(mapStateToProps, {
    getCurrentRestProfile,
    getReviewsByRestId,
    insertRestImage,
})(RestaurantDashboard);