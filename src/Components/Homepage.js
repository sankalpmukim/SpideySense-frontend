import {
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
import { getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import "./CSS/Homepage.css";
import { Service } from "./Service";
import { Subscribe } from "../Utils/Subscribe";
import { useAuthState } from "react-firebase9-hooks/auth";
import { useNavigate } from "react-router";

const filterer = (arr) => {
  arr.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
  return arr;
};

export const Homepage = () => {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [user] = useAuthState(getAuth());
  // Fetch subscriptions
  useEffect(() => {
    const db = getFirestore();
    const subscriptions = query(collectionGroup(db, "services"));
    getDocs(subscriptions).then((snap) => {
      setSubs([]);
      snap.forEach((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        setSubs((x) => x.concat([data]));
      });
    });
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
      <div className="content">
        {filterer(subs).map((x) => (
          <Service
            info={x.info}
            func={() => {
              Subscribe(user, x.id);
            }}
            funcText="Subscribe"
            key={x.id}
          />
        ))}
      </div>
      <div className="footer">
        <div>
          <button
            onClick={() => {
              navigate("/view-subscriptions");
            }}
          >
            Your subscriptions
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/manage-services");
            }}
          >
            Manage services
          </button>
        </div>
      </div>
    </>
  );
};
