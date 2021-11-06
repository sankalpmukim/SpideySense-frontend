import "./App.css";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
} from "@firebase/auth";
import { Homepage } from "./Components/Homepage";
import { useAuthState } from "react-firebase9-hooks/auth";

function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Homepage />
      ) : (
        <div>
          <div>Not logged in</div>
          <button
            onClick={() => {
              const provider = new GoogleAuthProvider();
              signInWithRedirect(auth, provider);
            }}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
