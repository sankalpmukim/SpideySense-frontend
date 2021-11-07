import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { getDoc, doc, getFirestore, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ServiceDetail = () => {
  const id = useParams().id;
  const [user] = useAuthState(getAuth());
  const [data, setData] = useState(null);
  const db = getFirestore();
  const docRef = doc(db, `users/${user.uid}/services/${id}`);
  useEffect(() => {
    const func = async () => {
      const Data = (await getDoc(docRef)).data();
      setData(Data);
      console.log(Data);
      console.log(id);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = () => {
    updateDoc(docRef, {
      info: data["info"],
    });
  };

  return (
    <>
      {data ? (
        <div>
          <input
            type="textarea"
            value={data["info"]}
            onChange={(e) => {
              setData({ info: e.currentTarget.value });
            }}
          />
          <button onClick={update}>Update info</button>
        </div>
      ) : null}
    </>
  );
};
