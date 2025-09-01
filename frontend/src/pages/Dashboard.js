import { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
// import Notes from "../components/Notes";

export default function Dashboard({ user, setUser }) {
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        {showSignup ? (
          <>
            <SignupForm setUser={setUser} />
            <p>
              Already have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowSignup(false)}>
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <LoginForm setUser={setUser} />
            <p>
              Don’t have an account?{" "}
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setShowSignup(true)}>
                Sign up
              </span>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      {/* <Notes user={user} /> */}
    </div>
  );
}

