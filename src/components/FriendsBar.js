import appStyles from "@/styles/app.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";

export default function FriendsBar({ themeState }) {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (themeState) {
      setTheme(true);
    }
  }, [themeState]);

  let menuIcon;

  if (themeState === "dark") {
    menuIcon = "menu-light.svg";
  } else {
    menuIcon = "menu-dark.svg";
  }

  const activeFriends = [
    {
      id: 1,
      name: "Kayleigh Bysouth",
      photo: null,
      userTag: "kayleight234",
      last_seen: "2 min",
    },
    {
      id: 2,
      name: "Jess Phillips MP",
      photo: null,
      userTag: "philips234",
      last_seen: "active",
    },
    {
      id: 3,
      name: "Kayleigh Bysouth",
      photo: null,
      userTag: "kayleight234",
      last_seen: "2 min",
    },
    {
      id: 4,
      name: "MP Eslam Hisham",
      photo: "profile.svg",
      userTag: "philips234",
      last_seen: "active",
    },
  ];

  return (
    <>
      {theme &&
        <>
          <div
            className="flex flex-col w-2/12 h-full fixed p-3 -mt-3"
            style={{ zIndex: -1 }}
          >
            <div className="w-full flex flex-col">
              <div className="flex flex-grow px-1">
                <span className="text-base flex flex-grow font-500">Friends</span>
                <div className="flex w-max flex-col justify-center">
                  <span className="flex w-max">
                    <Image
                      src={`/icons/${menuIcon}`}
                      height={150}
                      width={150}
                      alt="menu"
                      style={{ width: "12px", height: "12px" }}
                    />
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow w-full mt-5">
                {activeFriends.map((friends) => (
                  <div className="w-full h-12 mb-4 py-3 flex" key={friends.id}>
                    <Avatar
                      className={`${appStyles.avatarFont} ${friends.photo === null
                          ? `class-${Math.floor(Math.random() * 4)}`
                          : ``
                        }`}
                      name={friends.name}
                      src={`/${friends.photo}`}
                      size="30"
                      round="20px"
                    />
                    <div className="flex flex-grow h-full">
                      <div className="flex flex-col w-max py-2 my-1 justify-center">
                        <span className="text-sm font-500 mx-3">
                          {friends.name}
                        </span>
                      </div>
                    </div>
                    {friends.last_seen !== "active" ? (
                      <div className="flex h-full justify-end">
                        <div className="flex flex-col justify-center w-max h-max my-1">
                          <span className="text-xs text-grey-light">2 min</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full justify-end">
                        <div className="flex flex-col justify-center w-max h-max my-2">
                          <Image
                            src={`/icons/online.svg`}
                            height={150}
                            width={150}
                            alt="active"
                            style={{ width: "8px", height: "8px" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      </>
  );
}
