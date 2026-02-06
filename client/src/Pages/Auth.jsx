import { useState } from "react";

//components
import Signup from "../components/Signup";
import Login from "../components/Login";

export default function Auth() {
  const [signup, setSignup] = useState(true);
  return (
    <div className="text-white container mx-auto px-2 mt-18">
      {signup ? (
        <Signup setSignup={setSignup} />
      ) : (
        <Login setSignup={setSignup} />
      )}
    </div>
  );
}
