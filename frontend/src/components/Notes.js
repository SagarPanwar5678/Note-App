// import { useState, useEffect } from "react";
// import API from "../utils/api";

// export default function Notes({ user }) {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState(""); // new state for content
//   const [message, setMessage] = useState("");
//   const [creating, setCreating] = useState(false);
//   const [viewNote, setViewNote] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await API.get("/api/notes/fetch", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotes(res.data.notes);
//       } catch (err) {
//         console.log(err.response?.data || err.message);
//       }
//     };
//     fetchNotes();
//   }, [token]);

//   const startCreate = () => {
//     setCreating(true)
// };

//   const cancelCreate = () => {
//     setCreating(false);
//     setTitle("");
//     setContent("");
//   };

//   const createNote = async () => {
//     if (!title || !content) {
//       setMessage("Both title and content are required");
//       return;
//     }
//     try {
//       const res = await API.post(
//         "api/notes/create",
//         { title, content }, // now sending both title & content
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNotes([res.data.note, ...notes]);
//       setTitle("");
//       setContent("");
//       setCreating(false);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error creating note");
//     }
//   };

//   const deleteNote = async (id) => {
//     try {
//       await API.delete(`api/notes/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotes(notes.filter((note) => note._id !== id));
//       setViewNote(null);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error deleting note");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "20px auto" }}>
//       {creating ? (
//         <div>
//           <h3>Create Note</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ display: "block", width: "100%", marginBottom: "10px" }}
//           />
//           <textarea
//             placeholder="Content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             style={{ display: "block", width: "100%", marginBottom: "10px" }}
//             rows={5}
//           />
//           <button onClick={createNote}>Save Note</button>
//           <button onClick={cancelCreate} style={{ marginLeft: "10px" }}>
//             Cancel
//           </button>
//         </div>
//       ) : viewNote ? (
//         <div>
//           <h3>{viewNote.title}</h3>
//           <p>{viewNote.content}</p>
//           <button onClick={() => deleteNote(viewNote._id)}>Delete Note</button>
//           <button onClick={() => setViewNote(null)} style={{ marginLeft: "10px" }}>
//             Back
//           </button>
//         </div>
//       ) : (
//         <div>
//           <button onClick={startCreate}>Create Note</button>
//           <h3>Your Notes</h3>
//           {notes.length === 0 && <p>No notes yet</p>}
//           {notes.map((note) => (
//             <div
//               key={note._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//               onClick={() => setViewNote(note)}
//             >
//               <h3>{note.title}</h3>
//               <p
//                 style={{
//                   color: "#555",
//                   fontSize: "14px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {note.content}
//               </p>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   deleteNote(note._id);
//                 }}
//               >
//                 Delete Note
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <p>{message}</p>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import API from "../utils/api";
import "../CSS_folder/Dashboard.css"

function CreateNoteForm({ title, setTitle, content, setContent, createNote, cancelCreate }) {
  return (
    <div className="create-note-form">
      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
      />
      <textarea
        placeholder="Enter note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
      ></textarea>
      <div className="note-form-buttons">
        <button onClick={createNote} className="note-save-btn">Save</button>
        <button onClick={cancelCreate} className="note-cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

function ViewNote({ viewNote, setViewNote, deleteNote }) {
  if (!viewNote) return null;

  return (
    <div className="viewnote-overlay">
      <div className="viewnote-card">
        {/* Header */}
        <div className="viewnote-header">
          <h2>{viewNote.title}</h2>
          <button
            className="close-btn"
            onClick={() => setViewNote(null)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="viewnote-body">
          <p>{viewNote.content}</p>
        </div>

        {/* Footer Actions */}
        <div className="viewnote-footer">
          <button
            className="delete-btn"
            onClick={() => deleteNote(viewNote._id)}
          >
            🗑 Delete
          </button>
          <button
            className="close-btn-footer"
            onClick={() => setViewNote(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



export default function Notes({ user,setToken }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // new state for content
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [viewNote, setViewNote] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/api/notes/fetch", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.notes);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchNotes();
  }, [token]);

  const startCreate = () => {
    setCreating(true)
};

  const cancelCreate = () => {
    setCreating(false);
    setTitle("");
    setContent("");
  };

  const createNote = async () => {
    if (!title || !content) {
      setMessage("Both title and content are required");
      return;
    }
    try {
      const res = await API.post(
        "api/notes/create",
        { title, content }, // now sending both title & content
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data.note, ...notes]);
      setTitle("");
      setContent("");
      setCreating(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating note");
    }
  };

  const deleteNote = async (id) => {

    try {
      await API.delete(`api/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      setViewNote(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error deleting note");
    }
  };

  return (
    <>
    <div className="dashboard-main-container">

      <div className="dashboard-header">
        <div className="dashboard-logo">
          <img src="/icon.png" alt="Logo" className="dashboard-logo" />
        </div>
        <h2>Dashboard</h2>
        <p onClick={()=>{
          localStorage.removeItem("token");
          setToken(null);
        }}>Sign Out</p>
      </div>

  {/* Welcome Box */}
  <div className="dashboard-welcome-box">
    <b>Welcome, {user.name}!</b>
    <p>
      Email: <small>{user.email}</small>
    </p>
  </div>

  {/* Create Note Button */}
  <p className="dashboard-message">{message}</p>
  
  {creating?(
    <CreateNoteForm 
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
      createNote={createNote}
      cancelCreate={cancelCreate}
    />

  ):viewNote?(
    <ViewNote 
      viewNote={viewNote}
      setViewNote={setViewNote}
      deleteNote={deleteNote}
    />

  ):(
    <>
    
    <button className="dashboard-create-btn" onClick={()=>startCreate()}>Create Note</button>
  
    {/* Notes Section */}
    <div className="dashboard-notes-container">
      <div className="dashboard-notes-title">Notes</div>
  
      {/* Example Note */}

      {notes.length === 0 && <p>No notes yet</p>}
      {notes.map((note)=>(
        <>
          <div className="dashboard-note" key={note._id} onClick={()=>setViewNote(note)}>
            <span>{note.title}</span>
            <i className="fa-regular fa-trash-can" onClick={(e)=>{
              e.stopPropagation();
              deleteNote(note._id);
            }}></i>
          </div>
        </>

      ))}

    </div>
    </>
  )
}
</div>

    </>
  );
}
