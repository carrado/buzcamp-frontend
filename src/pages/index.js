import Meta from "@/metaData/meta";
import Header from "@/components/header";
import MenuBar from "@/components/MenuBar";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const setValue = (value) => {
    setTheme(value);
  };

  return (
    <>
      <Meta title={"BuzCamp"} />
      <Header themeState={theme} setThemeState={setValue} />
      <div className="flex w-full flex-wrap my-2">
        <div className="flex flex-col w-2/12">
          <MenuBar themeState={theme} />
        </div>

        <div className="timeline-bg w-4/6 p-4 rounded-xl flex flex-wrap h-screen"></div>
      </div>
    </>
  );
}
