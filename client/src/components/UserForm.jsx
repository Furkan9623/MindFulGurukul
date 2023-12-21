import { useState } from "react";
import { addUserApi } from "../api/crud-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserForm = () => {
  const initValue = {
    name: "",
    phone: "",
    email: "",
  };
  const [formInput, setFormInput] = useState(initValue);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const addUerFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    const result = await addUserApi(formInput);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (toast.success("User added successfull", { theme: "colored" }),
        navigate("/"))
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message, { theme: "colored" });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">ADD NEW USER</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={addUerFormSubmit}>
                <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Enter Name"
                    />
                    <label
                      for="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Enter Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="phone"
                      name="phone"
                      type="number"
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Enter number"
                    />
                    <label
                      for="phone"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="flex gap-8  justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 w-full uppercase font-semibold text-white text-sm rounded-md  py-1 pb-1.5"
                    >
                      save
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="bg-red-500 w-full font-semibold uppercase text-sm text-white rounded-md  py-1 pb-1.5"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
