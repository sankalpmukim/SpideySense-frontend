import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { getFirestore, collection, query, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Service } from "./Service";
import { Unsubscribe } from "../Utils/Unsubscribe";

export const ViewSubscriptions = () => {
  const [user] = useAuthState(getAuth());
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    const func = async () => {
      const db = getFirestore();
      const collectionRef = collection(db, `users/${user.uid}/subscriptions`);
      const q = query(collectionRef);

      const docs = await getDocs(q);

      docs.forEach((doc) => {
        const Data = doc.data();
        Data["id"] = doc.id;
        setSubs((x) => x.concat([Data]));
      });
    };

    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>Your subscriptions:</div>
      <div>
        {subs.map((y) => (
          <Service
            info={y.info}
            funcText="Unsubscribe"
            func={() => {
              Unsubscribe(user, y.id);
            }}
            key={y.id}
          />
        ))}
      </div>
    </div>
  );
};
