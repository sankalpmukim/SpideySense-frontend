import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { query, getFirestore, getDocs, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Service } from "./Service";

export const Services = () => {
  const db = getFirestore();
  const [user] = useAuthState(getAuth());
  const [services, setServices] = useState([]);
  useEffect(() => {
    const func = async () => {
      const collectionRef = collection(db, `users/${user.uid}/services`);
      const q = query(collectionRef);
      const docs = await getDocs(q);
      setServices([]);
      docs.forEach((d) => {
        const data = d.data();
        data["id"] = d.id;
        setServices((x) => x.concat([data]));
      });
    };
    func();
  }, []);

  return (
    <div className="content">
      {services.map((x) => (
        <Service funcText="Details" />
      ))}
    </div>
  );
};
