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
        className="flex w-full flex-wrap my-2"
        style={{ marginTop: "4.8rem" }}
      >
        <div className="flex flex-col w-2/12">
          <MenuBar themeState={theme} />
        </div>

        <div className="timeline-bg w-4/6 p-5 rounded-xl flex flex-wrap h-full">
          <div className="w-1/2-3 h-full flex flex-col mr-3">
            <TimelineForm profile={profileData} themeState={theme} />
          </div>
        </div>

        <div className="flex flex-col w-2/12">
          <FriendsBar themeState={theme} />
        </div>
      </div>
    </>
  );
}
