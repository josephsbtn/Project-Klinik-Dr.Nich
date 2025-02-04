import React, { useState, useEffect } from "react";
import UserIcon from "../assets/icon/userLogo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <main className="w-full h-screen bg-gradient-to-l from-[#c2a353] to-[#eac464] flex flex-col items-center justify-between">
      <h1 className="text-base font-Inter font-semibold capitalize tracking-wide w-[90%] text-left text-white pt-5">
        Point of Sale
      </h1>
      <section className="bg-white rounded-t-[40px] flex flex-col items-center w-full h-[80vh]">
        <img
          src={UserIcon}
          alt="User Icon"
          className="w-[100px] h-[100px] absolute top-20"
        />
        <div className="w-[90%]  mt-20 ">
          <h1 className="w-full font-Inter text-center text-xl font-semibold capitalize tracking-tight">
            Masuk
          </h1>
          <form
            className="w-full flex flex-col items-start justify-center gap-4 mt-10"
            action="">
            <div className="w-full flex flex-col gap-2">
              <label>
                <p className="font-Inter text-xs font-normal capitalize text-text">
                  Username
                </p>
              </label>
              <input
                type="text"
                className="w-full h-[40px] border border-[#BDBDBD] rounded-lg px-3 text-xs font-Inter font-normal"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label>
                <p className="font-Inter text-xs font-normal capitalize text-text">
                  Password
                </p>
              </label>
              <input
                type="password"
                className="w-full h-[40px] border border-[#BDBDBD] rounded-lg px-3 text-xs font-Inter font-normal"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-gradient-to-l from-[#c2a353] to-[#eac464] rounded-lg text-white font-semibold">
              Masuk
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
