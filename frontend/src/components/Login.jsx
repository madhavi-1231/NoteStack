import './Login.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
export default function Login(){
  const [email,setEmail]=useState(" ");
  const[password,setPassword]=useState("");
  const[error,setError]=useState(" ");
  const navigate=useNavigate();
  async function loginDetails(e){
    e.preventDefault();
    console.log(email);
    console.log(password);
    const user={email,password}
    const response=await fetch("http://localhost:3000/api/auth/login",{
       method:"post",
       headers: {
  "Content-Type": "application/json",
},
       body: JSON.stringify(user),
    });
    const data=await response.json();
    console.log(data);
    if(!response.ok){
      setError(data.message);
    }
    if(response.ok){
          localStorage.setItem("token", data.token);
             setError("");
            navigate('/dashboard')
    }
   
  }

    return(<>
            <div className="LoginPage">
        <h1>NoteStack</h1>

      <div className="buttons">

        <p>Don't have an account</p>
        <a href="http://localhost:5173/register"><button>Sign Up</button></a>
      </div>
    </div>
        <div className="login">
            <form action="" method="" onSubmit={loginDetails}>
                   <h1>Login to NoteStack</h1>
        <p>Welcome back!Please enter your details</p>
        <input type="email" name="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
        <input type="password" name="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br>
        {error && <p className="error">{error}</p>}
        <button>Login</button><br></br>
<p>
  Don't have an account?{" "}
  <a href="http://localhost:5173/register" className="register-link">
    Create an Account
  </a>
</p>            </form>
        </div>
        </>)
}