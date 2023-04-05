'use client';
import appStyles from "@/styles/app.module.css";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import { Switch } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import Avatar from 'react-avatar';


export default function Header() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    const setChange = (value) => {
        value === 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <>
            <div className={`w-full flex px-4 py-3 ${appStyles.bgHeader}`}>
                <div className="flex w-1/6">
                    <Image
                        src="/icons/bzcmp-logo.png"
                        height={150}
                        width={150}
                        alt="buzcamp-logo"
                        style={{ width: "35px", height: "40px" }}
                    />
                </div>
                <div className="flex w-1/3 flex-grow">
                    <SearchInput
                        className={`w-3/4 border ${appStyles.borderColor} p-1 rounded-md`}
                        inputValue={""}
                        variant
                    />
                </div>
                <div className="flex w-32 flex-grow text-sm">
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
                        checked={theme === 'dark'}
                        onChange={() =>
                            setChange(theme)
                        }
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
                            <span className="mt-2 mr-3 text-sm">
                                Anyanwu Chukwuemeka
                            </span>
                            <Avatar name="Anyanwu Chukwuemeka" src="/profile.svg" size="35" round="20px" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
