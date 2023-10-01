import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function OutsideApp() {
    const [flag, setFlag] = useState(true);

    let handleToggle = () => {
        setFlag(!flag);
    }

    let Component = flag ? Login : Signup;
    
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='outerContainer'>
                <div className='container'>
                    <div className='toggle-outer'>
                        <div id="btn" style={{ left: flag ? '0%' : '50%' }} ></div>
                        <button type="button" className='toggle-btn' onClick={handleToggle} style={{ color: flag ? 'green' : 'red' }} >Login</button>
                        <button type="button" className='toggle-btn' onClick={handleToggle} style={{ color: flag ? 'red' : 'green' }} >Sign Up</button>
                    </div>
                </div>
                <div className='ContentBox'>
                    <div className='formContent'>
                        <Component setFlag={setFlag} />
                    </div>
                </div>
            </div>
        </div>
    );
}
