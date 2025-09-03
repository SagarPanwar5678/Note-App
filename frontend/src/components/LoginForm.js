// // src/components/LoginForm.js
// import { useState } from "react";
// import API from "../utils/api";

// export default function LoginForm({ setUser }) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({ email: "", otp: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const sendOtp = async () => {
//     try {
//       const res = await API.post("/api/auth/login/send-otp", { email: formData.email });
//       setMessage(res.data.message);
//       setStep(2);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await API.post("/api/auth/login/verify-otp", { email: formData.email, otp: formData.otp });
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
//           <h2>Sign in</h2>
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <button onClick={sendOtp}>Send OTP</button>
//           <p>{message}</p>
//         </div>
//       ) : (
//         <div>
//           <h2>Enter OTP</h2>
//           <input type="text" name="otp" placeholder="OTP" value={formData.otp} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
//           <button onClick={verifyOtp}>Verify OTP</button>
//           <p>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/LoginForm.js
import { useState } from "react";
import API from "../utils/api";
import "../CSS_folder/SignupForm.css"

export default function LoginForm({ setUser,setShowSignup }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    try {
      const res = await API.post("/api/auth/login/send-otp", { email: formData.email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login/verify-otp", { email: formData.email, otp: formData.otp });
      console.log("user found")
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      console.log(err)
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
        <h2>Sign In</h2>
        <p className="subtitle">Please login to continue to your account</p>

        <form>

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
    
              <button type="submit" className="btn blue" onClick={verifyOtp}>Sign In</button>
            </>
          )};

        </form>

        <p className="signin-text">Need an account?? <p onClick={()=>setShowSignup(true)}>Create One</p></p>
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
