import { useEffect, useState } from "react";

const App = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!userName) {
      const name = prompt("Please enter your name:");
      setUserName(name || "Anonymous");
    }
  }, []);
  return (
    <>
      <div>Welcome {userName}!!!</div>
    </>
  );
};

export default App;
