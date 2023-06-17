import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuBar({ themeState }) {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (themeState) {
      setTheme(true);
    }
  }, [themeState]);

  const listItems = [
    {
      id: 137,
      link: "/",
      icon: themeState === "dark" ? "feed-light.svg" : "feed-dark.svg",
      caption: "Feed",
      count: 0,
    },
    {
      id: 233,
      link: "/community",
      icon:
        themeState === "dark" ? "community-light.svg" : "community-dark.svg",
      caption: "My community",
      count: 0,
    },
    {
      id: 289,
      link: "/messages",
      icon: themeState === "dark" ? "message-light.svg" : "message-dark.svg",
      caption: "Messages",
      count: 0,
    },
    {
      id: 384,
      link: "/notification",
      icon: themeState === "dark" ? "bell-light.svg" : "bell-dark.svg",
      caption: "Notification",
      count: 2,
    },
    {
      id: 464,
      link: "/eLibrary",
      icon: themeState === "dark" ? "book-light.svg" : "book-dark.svg",
      caption: "E-Library",
      count: 0,
    },
    {
      id: 523,
      link: "/",
      icon: themeState === "dark" ? "profile-light.svg" : "profile-dark.svg",
      caption: "Profile",
      count: 0,
    },
    {
      id: 623,
      link: "/settings",
      icon: themeState === "dark" ? "settings-light.svg" : "settings-dark.svg",
      caption: "Settings",
      count: 0,
    },
    {
      id: 734,
      link: "/logout",
      icon: themeState === "dark" ? "logout-light.svg" : "logout-dark.svg",
      caption: "Logout",
      count: 0,
    },
  ];
  return (
    <>
      {theme && (
        <>
          <div className="flex flex-col lg:w-2/12 sm:w-4/12 md:w-4/12 h-full fixed px-3 -mt-2">
            {listItems.map((item) => (
              <div
                className="flex p-3 mb-4 w-full cursor-pointer"
                key={item.id}
                data-menu
              >
                <Link href={`${item.link}`} className="flex w-full">
                  <div className="flex flex-col justify-center">
                    <Image
                      className="my-1"
                      src={`/icons/${item.icon}`}
                      height={150}
                      width={150}
                      alt="search"
                      style={{ width: "16px", height: "16px" }}
                    />
                  </div>
                  <div className="flex mx-4 w-max">
                    <h1 className="text-base">{item.caption}</h1>
                  </div>
                  {item.count > 0 && (
                    <div className="flex flex-col justify-center w-max">
                      <div className="flex w-full px-1 w-4 h-4 rounded-full bg-desire">
                        <h1 className="text-xs text-white">{item.count}</h1>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
