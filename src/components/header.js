import appStyles from "@/styles/app.module.css";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import { Switch } from "@material-tailwind/react";
import Avatar from "react-avatar";

export default function Header({ themeState, setThemeState }) {
  const setChange = (value) => {
    value === "light" ? setThemeState("dark") : setThemeState("light");
  };

  return (
    <>
      <div
        className={`w-full flex px-4 fixed top py-3 h-1-2 ${appStyles.bgHeader}`}
        data-header
      >
        <div className="flex w-1/6">
          <Image
            src="/icons/bzcmp-logo.png"
            height={150}
            width={150}
            alt="buzcamp-logo"
            style={{ width: "35px", height: "40px" }}
          />
        </div>
        <div className="flex w-1/3 sm:w-1/2 md:w-1/2 flex-grow">
          <SearchInput
            className={`border ${appStyles.borderColor} p-1 text-sm rounded-md`}
            placeHolder="Search for something here..."
            width={"w-3/4"}
            variant
          />
        </div>
        <div className="lg:flex lg:w-32 sm:hidden md:hidden flex-grow -mt-1 text-sm">
          <Image
            src="/icons/light-icon.svg"
            height={20}
            width={20}
            alt="buzcamp-logo"
            className="mx-4 -mt-1"
          />
          <Switch
            id="blue"
            color="blue"
            checked={themeState === "dark"}
            onChange={() => setChange(themeState)}
          />
          <Image
            src="/icons/dark-icon.svg"
            height={20}
            width={20}
            alt="buzcamp-logo"
            className="mx-4 -mt-1"
          />
        </div>

        <div className="flex w-max mr-3">
          <div className="w-full flex">
            <div className="rounded-sm flex">
              <span className="mt-2 mr-3 text-sm">Anyanwu</span>
              <Avatar
                className={`${appStyles.avatarFont} class-${Math.floor(
                  Math.random() * 4
                )}`}
                name="Anyanwu Chukwuemeka"
                src=""
                size="35"
                round="20px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
