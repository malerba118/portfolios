import { useEffect, useRef } from "react";
import firebaseClient from "client/firebase";

const useStorageRef = () => {
  const storageRef = useRef();

  useEffect(() => {
    storageRef.current = firebaseClient.storage().ref();
  }, []);

  return storageRef;
};

export default useStorageRef;
