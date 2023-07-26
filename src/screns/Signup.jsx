import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [userData, setuserData] = useState({ name: "", email: "", passward: "", geolocation: "" })
    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log('submit button')
        const response = await fetch("http://localhost:500/api/createUser",{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name : userData.name , email : userData.email,passward:userData.passward,location:userData.geolocation})
        })
    }
    const onChange = (e)=>{
        setuserData({...userData,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" aria-describedby="emailHelp" name='name' value={userData.name} onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={userData.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='passward' autoComplete='on' value={userData.passward}  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
                    <input type="text" className="form-control" id="geolocation" name='geolocation' value={userData.geolocation} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-success'>Already a user</Link>
            </form>

        </div>
    )
}

export default Signup
