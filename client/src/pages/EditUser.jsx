import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import { singleUserApi } from "../api/crud-api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const EditUser = () => {
  const [singleUser, setSingleUser] = useState({});
  const { id } = useParams();
  const fetchSingleUser = async () => {
    const result = await singleUserApi(id);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? setSingleUser(result?.data?.user)
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message, { theme: "colored" });
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);
  return (
    <div>
      <UserForm isEdit={true} editUser={singleUser} />
    </div>
  );
};
export default EditUser;
