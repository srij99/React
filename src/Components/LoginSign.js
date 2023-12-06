import { useState } from "react"
import {LoginNavbar} from "../Navbar";
import { useNavigate } from "react-router-dom";
import './../App.css'



export const Login = ()=> {
const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const userObjectString = localStorage.getItem('Userdata');
        const userObject = JSON.parse(userObjectString);

        if(userObject.email===loginData.email && userObject.password===loginData.password){
            console.log("Login Successful")
        
            navigate('/home') 
            
        }else{
            alert("Invalid credentials");
        }
        
    }


    return (
        <>
        <LoginNavbar/>
        <div className="logincard">
        <h2 className="title">Login</h2>
        <form className="form-data container" onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type = "email" placeholder="Enter E-mail" name="email" value={loginData.email} onChange={handleInputChange} required></input><br></br>
            <label>Password:</label>
            <input type = "password" placeholder="Enter Password" name="password" value={loginData.password} onChange={handleInputChange} required></input><br></br>
            <button type="submit">Login</button>
        </form>
        </div>
        
        </>
    )
}

export const Sign = () => {
    const [userData, setUserData] = useState({
      email: '',
      password: '',
      passwordConfirm: ''
    });

    const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

    
  const isPasswordValid = (password) => {
    
    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordValid(userData.password)) {
      alert("Password must be at least 8 characters and contain at least one special character.");
      return;
    }

    localStorage.setItem('Userdata', JSON.stringify(userData));
    alert("Sign-up successful");
    navigate('/');
  };

  return (
    <>
      <LoginNavbar />
      <div className="logincard">
        <h2 className="title">Sign-up</h2>
        <form className="form-data container" onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input type="email" placeholder="Enter E-mail" name="email" value={userData.email} onChange={handleInputChange} required />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="passwordConfirm">Password Confirm:</label>
          <input type="password" placeholder="Enter Password" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleInputChange} required />
          <br />

          {(userData.password && userData.passwordConfirm)?((userData.password===userData.passwordConfirm)?<button type="submit">Sign-up</button>:<h4>Password mismatch</h4>):''}
        </form>
      </div>
    </>
  );
};


