import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    else{
      console.log("something is off")
    }
  }, []);

  return (
    <div className="App">
      <Dashboard user={user} setUser={setUser} />
    </div>
  );
}

export default App;


