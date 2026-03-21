import { useState } from "react";
import LandingPage from "./components/LandPage";
import FamilyTree from "./components/FamilyTree";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div className="w-full h-screen overflow-hidden">
      {!userName ? (
        <LandingPage onContinue={setUserName} />
      ) : (
        <FamilyTree userName={userName} />
      )}
    </div>
  );
}

export default App;