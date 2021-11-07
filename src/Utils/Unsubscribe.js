import { deleteDoc, doc, getFirestore } from "@firebase/firestore";
export const Unsubscribe = async (user, id) => {
  await deleteDoc(doc(getFirestore(), `users/${user.uid}/subscriptions`, id));
};
