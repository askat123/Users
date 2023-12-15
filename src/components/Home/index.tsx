import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface UserData {
  id: string;
  value: string;
  age: number;
  job: string;
  experience: string;
}

const Home = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const getUsers = async () => {
    try {
      const response = await axios.get<UserData[]>(
        "https://64340de21c5ed06c958dd2da.mockapi.io/users"
      );
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  const sendData = async () => {
    try {
      const res = await axios.post<UserData>(
        "https://64340de21c5ed06c958dd2da.mockapi.io/users",
        { value: inputValue }
      );
      const newUser = res.data;
      setUser([...user, newUser]);
      setInputValue("");
    } catch (error) {
      console.error("Error data:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(
        `https://64340de21c5ed06c958dd2da.mockapi.io/users/${userId}`
      );
      const updateUsers = user.filter((userData) => userData.id !== userId);
      setUser(updateUsers);
    } catch (error) {
      console.error("Error user:", error);
    }
  };

  const reUser = async (userId: string) => {
    try {
      await axios.put(
        `https://64340de21c5ed06c958dd2da.mockapi.io/users/${userId}`
      );
      const reUser = user.filter((userData) => userData.id !== userId);
      setUser(reUser);
    } catch (error) {
      console.error("Error user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log("User data:", user);

  return (
    <div>
      <center>
        <form
          className="flex items-center ml-[300px] mt-5 mb-7"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            sendData();
          }}
        >
          <div className="relative w-[60%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add new user..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            ></button>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            add
          </button>
        </form>

        <ul className="space-y-4 pl-[50px] w-[40%] rounded-3xl bg-slate-500  text-white text-white">
          {user.map((userData) => (
            <li
              key={userData.id}
              className="flex  justify-around items-center space-x-3 rtl:space-x-reverse"
            >
              <h3>{userData.age}</h3>
              <p>
                name:
                <b className="uppercase"> {userData.value} </b>
              </p>
              <button
                type="button"
                onClick={() => deleteUser(userData.id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
};

export default Home;
