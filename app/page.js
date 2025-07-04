"use client";
import { Star, User } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [gender, setGender] = useState("");
  const [probability, setProbability] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch(`https://api.genderize.io/?name=${inputValue}`);
    const data = await res.json();
    console.log("Fetched Data:", data);
    setUserData(data);
    router.push(`/?name=${inputValue}`);
    setGender(data.gender || "Gender");
    setProbability(data.probability || "0");
  };
  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a name");
      return;
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="h-screen w-full bg-blue-200 flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-sevillana font-bold ">Welcome</h1>
        <div
          className=" flex flex-col items-center 
        gap-3 w-[20%] h-[50%] bg-red-200  rounded-2xl p-3 "
        >
          <User className="rounded-full bg-pink-400" size={58} />
          <p className="text-3xl font-bold font-sevillana ">
            {inputValue || " Name"}
          </p>
          <p className="text-2x1 rounded-full bg-pink-300 p-2">
            {gender || "Gender"}
          </p>
          <div className="space-y-15  ">
            <div className=" w-3xs  bg-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-black-500 flex items-center">
                  <Star className="size-4 " />
                  Confidence
                </span>

                <span className="text-sm font-medium text-gray-800">
                  {`${(probability * 100).toFixed(2)}%`}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-pink-200">
                <div
                  className="h-full bg-pink-500 rounded-full"
                  style={{
                    width: `${(probability * 100).toFixed(2)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 font-bold rounded-full p-1.5">
            <input
              className=" bg-transparent outline-none text-center text-lg font-sevillana"
              type="text"
              placeholder="Enter your name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className=" bg-black text-white font-bold rounded-full
           p-2 hover:bg-gray-700 "
          >
            click me
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
