// // src/components/SignupForm.js
// import { useState } from "react";
// import API from "../utils/api";

// export default function SignupForm({ setUser }) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     dateOfBirth: "",
//     email: "",
//     otp: ""
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const sendOtp = async () => {
//     try {
//       const res = await API.post("/api/auth/signup/send-otp", {
//         name: formData.name,
//         dateOfBirth: formData.dateOfBirth,
//         email: formData.email
//       });
//       setMessage(res.data.message);
//       setStep(2);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await API.post("/api/auth/signup/verify-otp", {
//         email: formData.email,
//         otp: formData.otp
//       });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error verifying OTP");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       {step === 1 ? (
//         <div>
//           <h2>Signup</h2>
//           <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <button onClick={sendOtp}>Send OTP</button>
//           <p>{message}</p>
//         </div>
//       ) : (
//         <div>
//           <h2>Signup</h2>
//           <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <h2>Enter OTP</h2>
//           <input type="text" name="otp" placeholder="OTP" value={formData.otp} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <button onClick={verifyOtp}>Verify OTP</button>
//           <p>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import API from "../utils/api";
import "../CSS_folder/SignupForm.css"
export default function SignupForm({ setUser,setShowSignup }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    otp: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    try {
      const res = await API.post("/api/auth/signup/send-otp", {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email
      });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/api/auth/signup/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div>
  <header className="header">
    <img src="/icon.png" alt="Logo" className="logo" />
    <h1>HD</h1>
  </header>

  <div className="container">
    <div className="left-side">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <p className="subtitle">Sign up to enjoy the feature of HD</p>

        <form>
          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Name" name="name" required value={formData.name} onChange={handleChange}/>
          </div>

          <div className="input-group">
            <label htmlFor="date">Date of Birth</label>
            <input type="date" id="date" placeholder="Date of Birth" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange}/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" name="email" required value={formData.email} onChange={handleChange}/>
          </div>
          {(step === 1)?(
            <button type="button" className="btn blue" onClick={sendOtp}>Get OTP</button>
          ):(
            <>
              <div className="input-group">
                <input type="password" id="otp" placeholder="Enter OTP" name="otp" required value={formData.otp} onChange={handleChange}/>
              </div>
    
              <button type="submit" className="btn blue" onClick={verifyOtp}>Sign Up</button>
            </>
          )};

        </form>

        <p className="signin-text">Already have an account? <p onClick={()=>setShowSignup(false)}>Sign in</p></p>
        <p>{message}</p>
      </div>
    </div>

    <div className="right-side">
      <img src="/right-column.png" alt="" />
    </div>
  </div>
</div>

  );
}
