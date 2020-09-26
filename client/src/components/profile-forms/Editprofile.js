import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const Editprofile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Date_of_Birth: '',
    City: '',
    State: '',
    Country: '',
    Phone_Number: '',
    Cust_email_id: '',
    Nick_Name: '',
    Headline: '',
    Yelping_Since: '',
    Things_I_Love: '',
    My_Blog_Or_Website: '',
    Find_Me_In: '',
    My_Favourite_Movie: '',
    Current_Crush: '',
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      First_Name: loading || !profile.First_Name ? '' : profile.First_Name,
      Last_Name: loading || !profile.Last_Name ? '' : profile.Last_Name,
      Date_of_Birth:
        loading || !profile.Date_of_Birth ? '' : profile.Date_of_Birth,
      City: loading || !profile.City ? '' : profile.City,
      State: loading || !profile.State ? '' : profile.State,
      Country: loading || !profile.Country ? '' : profile.Country,
      Phone_Number:
        loading || !profile.Phone_Number ? '' : profile.Phone_Number,
      Cust_email_id:
        loading || !profile.Cust_email_id ? '' : profile.Cust_email_id,
      Nick_Name: loading || !profile.Nick_Name ? '' : profile.Nick_Name,
      Headline: loading || !profile.Headline ? '' : profile.Headline,
      Yelping_Since:
        loading || !profile.Yelping_Since ? '' : profile.Yelping_Since,
      Things_I_Love:
        loading || !profile.Things_I_Love ? '' : profile.Things_I_Love,
      My_Blog_Or_Website:
        loading || !profile.My_Blog_Or_Website
          ? ''
          : profile.My_Blog_Or_Website,
      Find_Me_In: loading || !profile.Find_Me_In ? '' : profile.Find_Me_In,
      My_Favourite_Movie:
        loading || !profile.My_Favourite_Movie
          ? ''
          : profile.My_Favourite_Movie,
      Current_Crush:
        loading || !profile.Current_Crush ? '' : profile.Current_Crush,
    });
  }, [loading]);

  const {
    First_Name,
    Last_Name,
    Date_of_Birth,
    City,
    State,
    Country,
    Phone_Number,
    Cust_email_id,
    Nick_Name,
    Headline,
    Yelping_Since,
    Things_I_Love,
    My_Blog_Or_Website,
    Find_Me_In,
    My_Favourite_Movie,
    Current_Crush,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-dark">Profile</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="First_Name">First name</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="First_Name"
            value={First_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Last_Name">Last name</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Last_Name"
            value={Last_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Nick_Name">Nickname</label>
          <br />
          <small className="form-text">
            The Boss, Calamity Jane, The Profilic Reviewer
          </small>
          <input
            type="text"
            name="Nick_Name"
            value={Nick_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <div className="form-group">
          <label for="Gender">Gender</label>
          <br />
          <input type="radio" id="Female" name="Gender" value="Female" />
          <label for="Female">Female</label>
          <br />
          <input type="radio" id="Male" name="Gender" value="Male" />
          <label for="Male">Male</label>
          <br />
          <input type="radio" id="Other" name="Gender" value="Other" />
          <label for="Other">Other</label>
        </div> */}
        <div className="form-group">
          <label for="Date_of_Birth">Date of Birth</label>
          <br />
          <small className="form-text">Date of Birth in MM/DD/YYY format</small>
          <input
            type="text"
            name="Date_of_Birth"
            value={Date_of_Birth}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="City">City</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="City"
            value={City}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="State">State</label>
          <br />
          <small className="form-text">
            State name like california, Arizona
          </small>
          <input
            type="text"
            name="State"
            value={State}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Country">Country</label>
          <br />
          <small className="form-text">Country name.</small>
          <input
            type="text"
            name="Country"
            value={Country}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Phone_Number">Phone Number</label>
          <br />
          <small className="form-text">
            Should be entered in 123-123-1234 format
          </small>
          <input
            type="tel"
            name="Phone_Number"
            value={Phone_Number}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Cust_email_id">Email Id</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Cust_email_id"
            value={Cust_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Headline">Your Headline</label>
          <br />
          <small className="form-text">
            Taco Tuesday Aficionado, The Globetrotting Reviewer.
          </small>
          <input
            type="text"
            name="Headline"
            value={Headline}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Find_Me_In">Find Me In</label>
          <br />
          <small className="form-text">
            Nob Hill, the newest brunch spot, a turtleneck
          </small>
          <input
            type="text"
            name="Find_Me_In"
            value={Find_Me_In}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="My_Blog_Or_Website">My Blog Or Website</label>
          <br />
          <small className="form-text">www.example.com/myawesomeblog</small>
          <input
            type="text"
            name="My_Blog_Or_Website"
            value={My_Blog_Or_Website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Yelping_Since">Yelping Since</label>
          <br />
          <small className="form-text">When did fall in love with yelp.</small>
          <input
            type="text"
            name="Yelping_Since"
            value={Yelping_Since}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Things_I_Love"> I Love...</label>
          <br />
          <small className="form-text">
            Comma separated phrases (e.g. sushi, Radiohead, puppies)
          </small>
          <textarea
            rows="4"
            cols="50"
            name="Things_I_Love"
            value={Things_I_Love}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="My_Favourite_Movie">My Favourite Movie</label>
          <br />
          <small className="form-text">
            Forest Gump, It’s a Wonderful Life, Spirited Away
          </small>
          <input
            type="text"
            name="My_Favourite_Movie"
            value={My_Favourite_Movie}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Current_Crush">Current Crush</label>
          <br />
          <small className="form-text">Orange, Brad Pitt, Angelina Jolie</small>
          <input
            type="text"
            name="Current_Crush"
            value={Current_Crush}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-dark my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
};

Editprofile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(Editprofile)
);
