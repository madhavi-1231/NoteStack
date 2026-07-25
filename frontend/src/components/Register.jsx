import './Register.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState("");
   const navigate=useNavigate();

 async function submitDetails(e){
    e.preventDefault();
    console.log(name+" "+email+" "+password);
      const user={
        name,
        email,
        password
      };
     const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
});
      const data=await response.json();
      console.log(data);
      if (response.ok) {
        setError(" ")
        navigate("/login");
    } else {
      setError(data.message);
    }
  }
    return(<>
            <div className="RegisterPage">
        <h1>NoteStack</h1>

      <div className="buttons">

        <p>Don't have an account</p>
        <a href="http://localhost:5173/register"><button>Sign Up</button></a>
      </div>
    </div>
        <div className="register">
            <form action="" method="" onSubmit={submitDetails}>
                   <h1>Create an Account</h1>
        <p>Join Note Stack today.It's free</p>
        <input type="text" name="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/><br></br>
        <input type="email" name="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
        <input type="password" name="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br></br>
        {/* <input type="submit" value="Create Account"/><br></br> */}
                {error && <p className="error">{error}</p>}
        <button>Create an Account</button><br></br>
           <p>Already have an account?<a href="http://localhost:5173/login" style={{color:"blue" ,textDecoration:"none"}}>Login</a></p>
            </form>
        </div>
        </>)
}