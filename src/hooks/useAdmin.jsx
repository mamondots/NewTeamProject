import useAuth from "./useAuth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      axios
        .get("https://litl-pal-server-margubtech-gmailcom.vercel.app/verifyAdmin", {
          headers: {
            email: auth.user?.email,
          },
        })
        .then((res) => {
            setIsAdmin(res.data.admin);
            setAdminLoading(false)
        })
        .catch(e => {
            console.log(e.message);
            setAdminLoading(false)
        })
    }
  }, [auth.user]);
  return [isAdmin, adminLoading];
};

export default useAdmin;
