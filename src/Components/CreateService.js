import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { collection, getFirestore, addDoc } from "@firebase/firestore";
import { useState } from "react";

export const CreateService = () => {
  const [user] = useAuthState(getAuth());
  const [text, setText] = useState("");

  const submit = async (data) => {
    const db = getFirestore();
    const collectionRef = collection(db, `users/${user.uid}/services`);
    await addDoc(collectionRef, {
      info: data,
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.currentTarget);
          }}
        />
      </div>
      <button onClick={() => submit(text)} />
    </div>
  );
};
