import React, { useState, useEffect } from "react";
import { getuserinfo, updateuserinfo, deleteuserinfo } from "../../api/authApi";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { useNavigate } from "react-router";

export default function LoggedHome() {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState(null)
    const [updatedProfile, setUpdatedProfile] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const userToken = useContext(TokenContext)

    useEffect(() => {
        const profileInfo = async () => {
            console.log(`useEffect token: ${userToken}`)
            const data = await getuserinfo(userToken)
            
            setUserProfile(data)
            setUpdatedProfile(data.car_dealer_profile);  
        }
        profileInfo()
    }, [userToken])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value
        });
    };
    
    
    const handleUpdate = async (e) => {

        const context = {
            car_dealer_profile : {
                business_name: updatedProfile.business_name,
                state: updatedProfile.state, 
                street_name: updatedProfile.street_name,
                zip_code: updatedProfile.zip_code, 
                city: updatedProfile.city,
                phone_number: updatedProfile.phone_number,
                business_email: updatedProfile.business_email,
            }
        }
        console.log(updatedProfile)

        e.preventDefault();
        const response = await updateuserinfo(userToken, context);
        const updatedData = await getuserinfo(userToken);
        setUserProfile(updatedData);
        setUpdatedProfile(updatedData.car_dealer_profile);
       
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?")

        if (confirmation) {
            const response = await deleteuserinfo(userToken)
            alert('Your profile has been deleted')
        } else {
            alert('Profile deletion canceled')
        }
        setShowAlert(false)
    }
    

    return(
        <>
            {userProfile ? (
                <>
                    <div>
                        <h1>{userProfile.car_dealer_profile.business_name}</h1>
                        <ul>
                            <li>email: {userProfile.car_dealer_profile.business_email}</li>
                            <li>phone number: {userProfile.car_dealer_profile.phone_number}</li>
                            <li>
                            Street:    {userProfile.car_dealer_profile.street_name}<br></br>
                            City, State:    {userProfile.car_dealer_profile.city}, {userProfile.car_dealer_profile.state} <br></br>
                            Zip:    {userProfile.car_dealer_profile.zip_code} 
                            </li>
                        </ul>
                            <button onClick={() => handleDelete()}>Delete</button> 
                    </div>
                    
                    <form onSubmit={ handleUpdate } >
                    <div>
                        <label htmlFor="business_name">Business Name:</label>
                        <input
                            type="text"
                            id="business_name"
                            name="business_name"
                            value={ updatedProfile.business_name }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={ updatedProfile.state }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="street_name">Street:</label>
                        <input
                            type="text"
                            id="street_name"
                            name="street_name"
                            value={ updatedProfile.street_name }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="zip_code">Zip Code:</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            value={ updatedProfile.zip_code }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={ updatedProfile.city }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="phone_number">Phone Number:</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={ updatedProfile.phone_number }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="business_email">Business Email:</label>
                        <input
                            type="email"
                            id="business_email"
                            name="business_email"
                            value={ updatedProfile.business_email }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                        <button type="submit" style={{ display: "block", margin: "auto"}}> Submit </button> 
                </form>
                    <br></br>
                        <button onClick={() => navigate('/')}>Close</button>
                </>
                          ) : (
                <p>Loading user profile....</p>
            )}

        </>
       

    )
}