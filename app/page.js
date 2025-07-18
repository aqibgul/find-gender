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
  const isMale = userData.gender == "male";

  return (
    <>
      <div className="h-screen w-full  flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-sevillana font-bold ">Welcome</h1>
        <div
          className={`flex flex-col items-center 
        gap-3 sm:w-[20%] h-[50%] shadow-md   rounded-2xl p-3  ${
          isMale ? "bg-blue-200" : "bg-pink-200"
        }  `}
        >
          <User
            className={`rounded-full  ${
              isMale ? "bg-blue-500" : "bg-pink-500"
            }`}
            size={58}
          />
          <p className="text-3xl font-bold font-sevillana ">
            {inputValue || " Name"}
          </p>
          <p
            className={`text-2x1 rounded-full  p-2 ${
              isMale ? "bg-blue-400" : "bg-pink-400"
            } `}
          >
            {gender || "Gender"}
          </p>
          <div className="space-y-15  ">
            <div className=" xl:w-3xs  bg-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-black-500 flex items-center">
                  <Star className="size-4 " />
                  Confidence
                </span>

                <span className="text-sm font-medium text-gray-800">
                  {`${(probability * 100).toFixed(2)}%`}
                </span>
              </div>
              <div
                className={`w-full h-3 rounded-full ${
                  isMale ? "bg-blue-200" : "bg-pink-200"
                }`}
              >
                <div
                  className={`h-full  rounded-full ${
                    isMale ? "bg-blue-500" : "bg-pink-500"
                  }`}
                  style={{
                    width: `${(probability * 100).toFixed(2)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="  bg-gray-200 font-bold rounded-full p-1.5">
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
            className={`${
              isMale ? "bg-blue-800" : "bg-pink-700"
            } text-white font-bold rounded-full
           p-2 hover:bg-gray-700`}
          >
            click me
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
