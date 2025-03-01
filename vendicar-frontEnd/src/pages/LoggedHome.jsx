import React, { useState, useEffect } from "react";
import { getuserinfo } from "../../api/authApi";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";

export default function LoggedHome() {
    const [userProfile, setUserProfile] = useState(null)
    
    const userToken = useContext(TokenContext)

    useEffect(() => {
        const profileInfo = async () => {
            
            const data = await getuserinfo(userToken)
            setUserProfile(data)
            console.log(data)
        }
        profileInfo()
    }, [userToken])

    return(
        <>
            {userProfile ? (
                <div>
                    <h1>{userProfile.car_dealer_profile.business_name}</h1>
                    <ul>
                        <li>{userProfile.car_dealer_profile.business_email}</li>
                        <li>{userProfile.car_dealer_profile.phone_number}</li>
                        <li>
                            {userProfile.car_dealer_profile.street_name}<br></br>
                            {userProfile.car_dealer_profile.city} {userProfile.car_dealer_profile.state} <br></br>
                            {userProfile.car_dealer_profile.zip_code} 
                        </li>
                    </ul>
                </div>
            ) : (
                <p>Loading user profile....</p>
            )}
        </>
       

    )
}