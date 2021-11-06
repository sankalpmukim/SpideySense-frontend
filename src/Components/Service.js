import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase9-hooks/auth";
import { Subscribe } from "../Utils/Subscribe";

export const Service = ({ info, id, func, funcText }) => {
  const [user] = useAuthState(getAuth());
  return (
    <div>
      <div>{info}</div>
      <button
        onClick={() => {
          func();
        }}
      >
        {funcText}
      </button>
    </div>
  );
};
