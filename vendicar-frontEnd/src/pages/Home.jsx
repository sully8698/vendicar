import React, { useState } from "react";
import { useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate();
        
    return(
        <>
        <h1>Sign up or Log In:</h1>
        <button onClick={() => navigate('/sign-up')}>Sign up</button>
        <button onClick={() => navigate('/login')}>Log in</button>
        
        </>
    )
}