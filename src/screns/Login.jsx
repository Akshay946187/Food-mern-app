import React,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'


const Login = () => {
  
  const [userData, setuserData] = useState({ email: "", passward: ""})
  let navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log('submit button')
    const response = await fetch("http://localhost:500/api/createUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: userData.email, passward: userData.passward })
    });
    const json = await response.json()
    console.log(json)
   
    if(json.succes){
      localStorage.setItem("userEmail",userData.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
     navigate("/")
    }

  }
  const onChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
            <form onSubmit={handlesubmit}>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={userData.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='passward' autoComplete='on' value={userData.passward}  onChange={onChange}/>
                </div>
            

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-success'>New user</Link>
            </form>

        </div>
  )
}

export default Login
