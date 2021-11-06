import { getFirestore, doc, setDoc } from "@firebase/firestore";

export const Subscribe = async (user, id) => {
  const db = getFirestore();
  const docRef = doc(db, `users/${user.uid}/subscriptions/${id}`);
  await setDoc(docRef, { subcribed: id });
};
