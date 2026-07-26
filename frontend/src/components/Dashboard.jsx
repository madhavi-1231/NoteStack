// import { FiSearch } from "react-icons/fi";
// import { useState, useEffect } from "react";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [name, setName] = useState("");
//   const [notes, setNotes] = useState([]);

//   const token = localStorage.getItem("token");

//   // Fetch user
//   useEffect(() => {
//     fetch("http://localhost:3000/api/auth/dashboard", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("User:", data);
//         setName(data.user.name);
//       });
//   }, []);

//   // Fetch notes
//   const fetchNotes = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/notes", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       console.log("Notes:", data);

//       // Change this depending on your backend response
//       setNotes(data.notes || data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   // Add note
//   async function dashboardDetails(e) {
//     e.preventDefault();

//     const response = await fetch("http://localhost:3000/api/notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         title,
//         content,
//         tags,
//           userEmail: req.user.email

//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     // Refresh notes after adding
//     fetchNotes();

//     // Clear form
//     setTitle("");
//     setContent("");
//     setTags("");

//     setShowPopup(false);
//   }

//   return (
//     <div className="dashboardpage">
//       <div className="nav">
//         <h1>Dashboard</h1>

//         <div className="search-container">
//           <input type="text" placeholder="Search Notes" />
//           <FiSearch className="search-icon" />
//         </div>

//         <div className="profile">
//           <div className="avatar">
//             {name ? name.charAt(0).toUpperCase() : ""}
//           </div>

//           <div className="profile-info">
//             <h4>{name}</h4>
//             <p>Logout</p>
//           </div>
//         </div>
//       </div>

//       <hr />

//       <div className="notes-container">
//         {notes.length === 0 ? (
//           <h3>No Notes Found</h3>
//         ) : (
//           notes.map((note) => (
//             <div className="note-card" key={note._id}>
//               <h2>{note.title}</h2>
//               <p>{note.content}</p>
//               <h5>{note.tags}</h5>
//             </div>
//           ))
//         )}
//       </div>

//       <button className="Add" onClick={() => setShowPopup(true)}>
//         +
//       </button>

//       {showPopup && (
//         <div className="overlay">
//           <div className="popup">
//             <button className="btn" onClick={() => setShowPopup(false)}>
//               X
//             </button>

//             <h2>Add Note</h2>

//             <label>TITLE</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <label>CONTENT</label>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             ></textarea>

//             <label>TAGS</label>
//             <input
//               type="text"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />

//             <button onClick={dashboardDetails}>Add</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState([]);
  const [search,setSearch]=useState("")
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName(data.user.name);
        }
      });
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const dashboardDetails = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        tags,
      }),
    });

    const data = await response.json();

    if (data.success) {
      fetchNotes();

      setTitle("");
      setContent("");
      setTags("");

      setShowPopup(false);
    }
  };
  const deleteNote=async(id)=>{
    try{
      // const token=localStorage.getItem("token");
      const response=await fetch(`http://localhost:3000/api/notes/${id}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
      });
      const data=await response.json();
      if(response.ok){
      setNotes(notes.filter((note) => note._id !== id));
      }
      else{
        alert(data.message);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  const filteredNotes=notes.filter((note)=>{
      const searchText=search.toLowerCase();
      return(
        note.title.toLowerCase().includes(searchText) ||
        note.content.toLowerCase().includes(searchText)||
        note.tags && note.tags.toLowerCase().includes(searchText)
      )
  })
 
  return (
    <div className="dashboardpage">
      <div className="nav">
        <h1>Dashboard</h1>

        <div className="search-container">
          <input className="search" type="text" placeholder="Search Notes"value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <FiSearch className="search-icon" />
        </div>

        <div className="profile">
          <div className="avatar">
            {name ? name.charAt(0).toUpperCase() : ""}
          </div>

          <div className="profile-info">
            <h4>{name}</h4>
            <p>Logout</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <h3>No Notes Found</h3>
        ) : (
          filteredNotes.map((note) => (
            <div className="note-card" key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <h5>{note.tags}</h5>
              <button onClick={()=>deleteNote(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      <button className="Add" onClick={() => setShowPopup(true)}>
        +
      </button>

      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <button className="btn" onClick={() => setShowPopup(false)}>
              X
            </button>

            <h2>Add Note</h2>

            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <label>Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <button onClick={dashboardDetails}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}