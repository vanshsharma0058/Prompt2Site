import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";
const useGetCurrentUser = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/me`, {
          withCredentials: true,
        });
        //store the user data in the redux store
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUser();
  }, []);
};

export default useGetCurrentUser;
