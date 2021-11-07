import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { query, getFirestore, getDocs, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Service } from "./Service";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

  return (
    <div className="content">
      {services.map((x) => (
        <Service
          info={x.info}
          funcText="Details"
          func={() => {
            navigate(`/manage-services/${x.id}`);
          }}
          key={x.id}
        />
      ))}
    </div>
  );
};
