import React, { useState } from "react";
// import { signup } from "../api/authApi";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        business_user_name: "",
        password: "",
        business_name: "",
        street_name: "",
        city: "",
        phone_number: "",
        business_email: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const context = {
            business_user_name: formData.business_user_name,
            password: formData.password,
            business_name: formData.business_name,
            street_name: formData.street_name,
            city: formData.city,
            phone_number: formData.phone_number,
            business_email: formData.business_email,
         }
        
        //  const response = await signup(context)
         
        setFormData({
            business_user_name: "",
            password: "",
            business_name: "",
            street_name: "",
            city: "",
            phone_number: "",
            business_email: "",
        }); 
    }
               
        // console.log("form Data:", formData) //change ---- to send to api
        
        


    return (
        <>
                <form onSubmit={ handleSubmit } >
                    <div>
                        <label htmlFor="business_user_name">Username for business:</label>
                        <input
                            type="text"
                            id="business_user_name"
                            name="business_user_name"
                            value={ formData.business_user_name }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={ formData.password }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                    <div>
                        <label htmlFor="business_name">Business Name:</label>
                        <input
                            type="text"
                            id="business_name"
                            name="business_name"
                            value={ formData.business_name }
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
                            value={ formData.street_name }
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
                            value={ formData.city }
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
                            value={ formData.phone_number }
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
                            value={ formData.business_email }
                            onChange={ handleChange }
                            required
                            />  
                    </div>
                        <button type="submit" style={{ display: "block", margin: "auto"}}> Submit </button>
                </form>
        </>
       
    )
}