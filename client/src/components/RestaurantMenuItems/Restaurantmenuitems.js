import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentRestMenu } from '../../actions/restmenu';
import { getCurrentRestProfile } from '../../actions/profile';
import { insertItemImage } from '../../actions/uploadimages';
import auth from '../../reducers/auth';
//action getCurrentRestMenu
//RestaurantEventsDashboard= Restaurantmenuitems

const Restaurantmenuitems = ({
    getCurrentRestProfile,
    auth,
    getCurrentRestMenu,
    insertItemImage,
    // profile: { profile },
    restprofile: { rest_profile },
    menu: { allmenuitems, loading },
}) => {
    const [image, setImage] = useState({
        file: '',
        fileText: '',
        id: '',
    });

    useEffect(() => {
        getCurrentRestMenu();
        getCurrentRestProfile();
        setImage({
            file: loading || !allmenuitems[0].item_image ?
                '' :
                allmenuitems[0].item_image,
            fileText: 'Choose Image..',
            id: loading || !allmenuitems[0].item_id ? 0 : allmenuitems[0].item_id,
        });
    }, []);

    //if (profile) {
    // console.log('viewrestaurantmenu', profile.Rest_Id_signup);
    //}

    const onImageChange = (e) => {
        console.log('Inside On Image Change');
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('inside on image change, file is,', e.target.files[0]);
        console.log('inside on image change, id is', e.target.id);
        setImage({
            file: e.target.files[0],
            fileText: e.target.files[0].name,
            id: e.target.id,
        });
    };
    const onUpload = (e) => {
        e.preventDefault();
        console.log('onUpload, image is,\n', image.file);
        console.log('inside onUpload, id is', image.id);
        insertItemImage(image.file, image.id);
        window.location.reload(false);
    };
    let item_id = null;
    let backendimageserver = `http://54.215.250.62:3001/item/getphoto/dishitem/`;

    console.log(
        'inside rest menu items, all menu items ' + JSON.stringify(allmenuitems)
    );
    let uniqCategories = allmenuitems.map((item) => item.item_category);
    uniqCategories = [...new Set(uniqCategories)];
    let newobj = {};
    uniqCategories.map((it) => {
        newobj[it] = allmenuitems.filter((el) => el.item_category === it);
    });
    console.log('inside rest menu items, new obj is ', newobj);
    console.log('inside rest menu items, unique categories, ', uniqCategories);
    return ( <
        div >
        <
        Fragment >
        <
        h1 className = "text-dark" > { rest_profile ? rest_profile.Rest_Name : ' ' } { ' ' } <
        /h1> <
        Link to = "/restaurantdashboard"
        className = "lead text-primary" > { ' ' }
        Return to Restaurant Page <
        /Link> <
        br / >
        <
        br / >
        <
        Link to = { `/restaurant/editmenu/${
            rest_profile ? rest_profile.Rest_Id_signup : 'RestaurantDashboard'
          }` }
        className = "btn btn-dark" >
        Add Menu <
        /Link> <
        hr > < /hr> {
            /* {allmenuitems
                      ? allmenuitems.map((item) => (
                          <p>
                            {item.item_name} | {item.item_description} |{' '}
                            {item.item_category} |{item.item_ingredients} |{' '}
                            {item.item_price}
                          </p>
                        ))
                      : 'none'} */
        } {
            newobj
                ?
                Object.keys(newobj).map((k, idx) => {
                    return ( <
                        div >
                        <
                        h3 > { k } < /h3> {
                            newobj[k].map((indi) => ( <
                                fragment > {
                                    /* <p>
                                                            this is the image file{' '}
                                                            {indi.item_image ? indi.item_image : 'None'}
                                                          </p> */
                                } <
                                div className = "card mb-3" >
                                <
                                div className = "row no-gutters" >
                                <
                                div className = "col-md-4" > {
                                    /* <img
                                                                  className="menu_image"
                                                                  src={indi.item_image}
                                                                  className="card-img"
                                                                  alt="Item Picture"
                                                                /> */
                                }

                                <
                                img src = {
                                    indi.item_image ?
                                    `${backendimageserver}${indi.item_image}` :
                                        `${backendimageserver}image`
                                }
                                alt = "Item Picture" /
                                >
                                <
                                /div> <
                                div class = "col-md-8" >
                                <
                                div class = "card-body" >
                                <
                                h4 className = "text-dark bold" > { indi.item_name } <
                                /h4> <
                                p className = "medium" > { indi.item_description } < /p> <
                                p className = "medium" >
                                Ingrediants: { indi.item_ingredients } <
                                /p> <
                                p className = "medium" > $ { indi.item_price } < /p> <
                                /div> <
                                div >
                                <
                                Link to = { `/restaurant/menu/item/${indi.Rest_Id_signup}/${indi.item_id}` }
                                className = "btn btn-dark small" >
                                { ' ' }
                                Edit <
                                /Link> <
                                /div> {
                                    /* {(item_id = indi.item_id)}
                                                                {console.log(
                                                                  'before onupload, item_id is,',
                                                                  item_id
                                                                )} */
                                } <
                                form onSubmit = {
                                    (e) => onUpload(e) } >
                                <
                                br / >
                                <
                                div className = "custom-file"
                                style = {
                                    { width: '100%' } } >
                                <
                                input type = "file"
                                className = "custom-file-input"
                                name = "image"
                                accept = "image/*"
                                id = { indi.item_id }
                                onChange = {
                                    (e) => onImageChange(e) }
                                /> <
                                label className = "custom-file-label"
                                htmlFor = "image" >
                                <
                                p > { image.fileText } < /p> <
                                button type = "submit"
                                className = "btn btn-dark" >
                                Upload <
                                /button> <
                                /label> <
                                /div> <
                                /form> <
                                /div> <
                                /div> <
                                /div> <
                                br / >
                                <
                                /fragment>
                            ))
                        } <
                        /div>
                    );
                }) :
                'none'
        } <
        /Fragment> <
        /div>
    );
};

Restaurantmenuitems.propTypes = {
    getCurrentRestMenu: PropTypes.func.isRequired,
    getCurrentRestProfile: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    insertItemImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    // profile: state.profile,
    restprofile: state.restprofile,
    menu: state.menu,
});

export default connect(mapStateToProps, {
    getCurrentRestMenu,
    getCurrentRestProfile,
    insertItemImage,
})(Restaurantmenuitems);