import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function SignupForm() {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");

  const [emailError, setEmailError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    setEmailError("");

    console.log("Submitted:", { name, email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Your name is: {name}</p>

      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
      />

      {emailError && <p>{emailError}</p>}

      <p>Your email is: {email}</p>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
