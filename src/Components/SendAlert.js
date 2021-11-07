import { getAuth } from "@firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useNavigate, useParams } from "react-router";
import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";

export const SendAlert = () => {
  const id = useParams().id;
  const naviagte = useNavigate();
  const [user] = useAuthState(getAuth());
  const [alertVal, setAlertVal] = useState("");

  return (
    <div>
      <div>Type alert information</div>
      <div>
        <input
          type="text"
          value={alertVal}
          onChange={(e) => setAlertVal(e.currentTarget.value)}
        />

        <button
          onClick={async () => {
            const db = getFirestore();
            const collectionRef = collection(
              db,
              `users/${user.uid}/services/${id}/alerts/`
            );
            await addDoc(collectionRef, {
              text: alertVal,
              timestamp: serverTimestamp(),
            });
          }}
        >
          Send!
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            naviagte("/");
          }}
        >
          Navigate to homepage
        </button>
      </div>
    </div>
  );
};
