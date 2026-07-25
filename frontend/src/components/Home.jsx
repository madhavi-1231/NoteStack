import './Home.css'
import notebook from "../assets/notebook.png";
export default function Home() {
  return (
    <>
    <div className="home">
        <h1>NoteStack</h1>

      <div className="buttons">

        <a href="http://localhost:5173/register"><button>Register</button></a>
        <a href="http://localhost:5173/login"><button>Login</button></a>
      </div>
     
    </div>
    <div className="main-content">
      <div className="content">
         <h1 style={{fontSize:"50px", marginLeft:"10px"}} className="hero-title">Effortless Note-Taking,<br></br>Perfectly Organized</h1>
        <p style={{fontSize:"25px", marginLeft:"10px"}} className="notes-title" > NoteStack is your personal digital notebook.Capture idead <br></br>organize your thoughts with tags,and access your notes from anywhere.<br></br>Simple,fast and secure</p>
        <br></br>
        <a href="http://localhost:5173/register"><button style={{fontSize:"20px", marginLeft:"10px"}}>Get Started for Free</button></a>
      </div>
        <img src={notebook}/>
      </div>
    </>
  );
}