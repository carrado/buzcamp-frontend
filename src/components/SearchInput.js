import { Card } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import appStyles from "@/styles/app.module.css";
import { useState } from "react";
import Avatar from "react-avatar";
import Link from "next/link";

export default function SearchInput({ className, placeHolder, width }) {
  const ref = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setInputValue("");
      }
      if (ref.current && ref.current.contains(event.target)) {
        setInputValue("");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const searchResponse = [
    {
      id: 1,
      type: "profile",
      title: "Joy Chidera",
      photo: null,
      tag: "chidex@500",
    },
    {
      id: 2,
      type: "book",
      title: "Introduction to Chemistry",
      photo: null,
      tag: "f2930394304kl09586",
    },
  ];
  return (
    <>
      <div className={`flex flex-col ${width}`}>
        <div className={`flex ${className}`}>
          <div className="px-3 py-2">
            <Image
              src={`/icons/search-icon.svg`}
              width={15}
              height={15}
              alt="search-icon"
            />
          </div>
          <input
            type={"text"}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            placeholder={placeHolder}
            style={{ width: "100%", backgroundColor: "transparent" }}
            autoComplete="off"
          />
        </div>
        {inputValue.length > 0 && (
          <Card
            ref={ref}
            className={`px-3 py-2 w-full rounded-sm tr-color ${appStyles.bgCard}`}
          >
            {searchResponse.map((response, index) => (
              <div className="flex flex-col w-full p-3" data-hover key={index}>
                <div className="flex flex-wrap w-full">
                  <Link href="" className="flex w-max">
                    <div className="flex w-max">
                      {response.type === "profile" ? (
                        <Avatar
                          className={`${
                            appStyles.avatarFont
                          } class-${Math.floor(Math.random() * 4)}`}
                          name={response.title}
                          src={response.photo}
                          size="28"
                          round="20px"
                        />
                      ) : (
                        <div
                          className={`w-7 h-7 p-2 ${appStyles.searchBg} rounded-full`}
                        >
                          <Image
                            src="/icons/search-icon.svg"
                            height={150}
                            width={150}
                            alt="search"
                            style={{ width: "12px", height: "12px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-grow mx-2">
                      <h1 className="text-sm font-black p-1">
                        {response.title}
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </>
  );
}
