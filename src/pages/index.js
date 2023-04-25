import Meta from "@/metaData/meta";
import Header from "@/components/header";
import MenuBar from "@/components/MenuBar";
import { useTheme } from "next-themes";
import FriendsBar from "@/components/FriendsBar";
import TimelineForm from "@/framework/TimelineForm";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const setValue = (value) => {
    setTheme(value);
  };

  const profileData = {
    id: 238940,
    name: "Anyanwu Chukwuemeka",
    tag: "prince965",
    photo: null,
  };

  return (
    <>
      <Meta title={"BuzCamp"} />
      <Header themeState={theme} setThemeState={setValue} />
      <div
        className="flex w-full flex-wrap my-2 md:px-1"
        style={{ marginTop: "4.8rem" }}
      >
        <div className="flex flex-col lg:w-2/12 sm:w-4/12 md:w-4/12">
          <MenuBar themeState={theme} />
        </div>

        <div className="timeline-bg lg:w-4/6 sm:w-8/12 md:w-8/12 p-5 rounded-xl flex flex-wrap h-full">
          <div className="w-1/2-3 h-full lg:flex sm:hidden md:hidden flex-col mr-3">
            <TimelineForm profile={profileData} themeState={theme} />
          </div>
          <div className="lg:hidden h-full lg:flex sm:w-full md:w-full flex-col">
            <TimelineForm profile={profileData} themeState={theme} />
          </div>
        </div>

        <div className="flex-col lg:w-2/12 sm:hidden md:hidden lg:flex">
          <FriendsBar themeState={theme} />
        </div>
      </div>
    </>
  );
}
