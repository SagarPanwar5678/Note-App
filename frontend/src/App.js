import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import API from "./utils/api"

function App() {
  const [user, setUser] = useState(null);
  const [TOKEN,setTOKEN] = useState(null); 

  const verifyToken = async(token)=>{
    const res = await API.post("/api/auth/token/check",{},{headers: {Authorization: `Bearer ${token}`}});
    const message = res.data.message;
    if(message === "Token Is Valid"){
      console.log("hey hey token is valid");
      return "Token Is Valid";
    }
    else{
      localStorage.removeItem("token");
      return "Token Is Unvalid";
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        const isValid = await verifyToken(token); // await the async function

        if (isValid == "Token Is Valid") {
          setUser(JSON.parse(userData));
          setTOKEN(token);
        } else {
          setTOKEN(null);
          localStorage.removeItem("token");
        }
      }
    };

    checkToken();
  }, [user,TOKEN]);

  return (
    // <div className="App">
      <Dashboard user={user} setUser={setUser} token={TOKEN} setToken={setTOKEN}/>
    // {/* </div> */}
  );
}

export default App;


