import "./App.css";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "@firebase/auth";
import { Homepage } from "./Components/Homepage";
import { useAuthState } from "react-firebase9-hooks/auth";
import { Route, Routes } from "react-router";
import { Services } from "./Components/Services";
import { ServiceDetail } from "./Components/ServiceDetail";
import { SendAlert } from "./Components/SendAlert";
import { CreateService } from "./Components/CreateService";

function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <>
          <div>
            <div>{user.displayName} is logged in</div>
            <button onClick={() => signOut(getAuth())}>Sign out</button>
          </div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/manage-services" element={<Services />} />
            <Route path="/create-service" element={<CreateService />} />
            <Route path="/manage-services/:id" element={<ServiceDetail />} />
            <Route
              path="/manage-services/:id/send-alert"
              element={<SendAlert />}
            />
          </Routes>
        </>
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
