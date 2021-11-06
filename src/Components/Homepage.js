import {
  collection,
  collectionGroup,
  query,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "@firebase/firestore";
import { getAuth, signOut } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useEffect, useState } from "react";
export const Homepage = () => {
  const [user] = useAuthState(getAuth());
  const [subs, setSubs] = useState([]);
  // Fetch subscriptions
  useEffect(() => {
    const db = getFirestore();
    const subscriptions = query(collectionGroup(db, "services"));
    getDocs(subscriptions).then((snap) =>
      snap.forEach((doc) => {
        setSubs((x) => x.concat([doc.data()]));
      })
    );
  }, []);
  // Set user
  useEffect(() => {
    const func = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      const db = getFirestore();
      // const q = query(collection(db, "users"), where("uid", "==", user.uid));
      // const d = (await getDocs(q))[0];
      const docRef = doc(db, "users", user.uid);
      const d = await getDoc(docRef);
      if (d.exists()) {
        await updateDoc(docRef, {
          lastLogin: serverTimestamp(),
        });
      } else {
        await setDoc(docRef, {
          name: user.displayName,
          lastLogin: serverTimestamp(),
        });
      }
    };
    func();
  }, []);

  return (
    <>
      <div>{user.displayName} is logged in</div>
      <button onClick={() => signOut(getAuth())}>Sign out</button>
    </>
  );
};
