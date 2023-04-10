import { Button, Card } from "@material-tailwind/react";
import appStyles from "@/styles/app.module.css";
import Avatar from "react-avatar";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useEffect, useRef, useState } from "react";
import EmojiModal from "@/components/EmojiModal";

export default function TimelineForm({ profile, themeState }) {
    const [theme, setTheme] = useState(false);
    const [isOpen, setEmojiModal] = useState(false);

    useEffect(() => {
        if (themeState) {
            setTheme(true);
        }
    }, [themeState]);

    const timelineCard = useRef("timeline-form");
    const editableDiv = useRef("div-editable");

    const [modalOpen, setOpen] = useState(false);

    const setTextArea = (e) => {
        timelineCard.current.style.zIndex = 9;
        editableDiv.current.style.height = '150px';
        editableDiv.current.contentEditable = true;
        editableDiv.current.focus();
        if (document.getElementById('div-placeholder')) {
            document.getElementById('div-placeholder').remove();
        }
        setOpen(true);
    };

    const handleModal = () => {
        if (!isOpen) {
            timelineCard.current.style.zIndex = 0;
            editableDiv.current.style.height = null;
            editableDiv.current.contentEditable = false;
            if (editableDiv.current.textContent === '') {
                editableDiv.current.blur();
                const spanEl = document.createElement('span');
                spanEl.classList.add("text-grey-light");
                spanEl.classList.add("text-sm");
                spanEl.setAttribute('id', 'div-placeholder');
                spanEl.textContent = 'What’s happening?';
                editableDiv.current.appendChild(spanEl)
            }
            setOpen(false);
        }
        else {
            setEmojiModal(false)
        }
    };

    const documentClick = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.setAttribute('accept', '.docx, .pdf');
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            console.log(files);
        };
        input.click();
    }

    const mediaClick = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.setAttribute('accept', 'video/*, image/*');
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            console.log(files);
        };
        input.click();
    }

    const selectedEmoji = (emojiVal) => {
        console.log(emojiVal)
    }

    return (
        <>
            {theme &&
                <>
                    <Card
                        className={`rounded-xl p-3 flex flex-col shadow-sm ${appStyles.bgCard}`}
                        id="timeline-form"
                        ref={timelineCard}
                        style={{ color: "inherit", zIndex: 0 }}
                    >
                        <div className="w-full flex flex-wrap">
                            <Avatar
                                className={`${appStyles.avatarFont} ${profile.photo === null
                                    ? `class-${Math.floor(Math.random() * 4)}`
                                    : ``
                                    }`}
                                name={profile.name}
                                src={`/${profile.photo}`}
                                size="34"
                                round="20px"
                            />
                            <div
                                className="flex flex-grow p-2 w-auto timeline-bg mx-3 cursor-text rounded-xl text-sm"
                                id="div-editable"
                                ref={editableDiv}
                                placeholder="What’s happening?"
                                onClick={(e) => setTextArea(e)}
                            >
                                <span className="text-grey-light cursor-text w-full text-sm" id="div-placeholder">What’s happening?</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-3 mx-3">
                            {/** Document Upload */}
                            <div className="w-1/4 flex flex-grow justify-start mt-1 cursor-pointer" onClick={() => documentClick()}>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src={`/icons/${themeState === "dark"
                                            ? "document-light.svg"
                                            : "document-dark.svg"
                                            }`}
                                        height={150}
                                        width={150}
                                        alt="menu"
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="mx-2 text-sm">Document</span>
                                </div>
                            </div>

                            {/** Photo/Video Upload */}
                            <div className="w-1/4 flex flex-grow justify-center mt-1 cursor-pointer" onClick={() => mediaClick()}>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src={`/icons/${themeState === "dark" ? "photo-light.svg" : "photo-dark.svg"
                                            }`}
                                        height={150}
                                        width={150}
                                        alt="menu"
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="mx-2 text-sm">Photo/Video</span>
                                </div>
                            </div>

                            {/** Emoji */}
                            <div className="w-1/4 flex flex-grow justify-center mt-1 cursor-pointer relative" onClick={() => setEmojiModal(true)}>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src={`/icons/${themeState === "dark" ? "smiley-light.svg" : "smiley-dark.svg"
                                            }`}
                                        height={150}
                                        width={150}
                                        alt="menu"
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="mx-2 text-sm">Feeling</span>
                                </div>

                            <EmojiModal openModal={isOpen} emojiModel={selectedEmoji} themeState={themeState} left="0" top="100" right="0" margin="0" />
                            </div>

                            {/** Button */}
                            <div className="w-1/4 flex flex-grow justify-center mt-1">
                                <div className="flex flex-col justify-center">
                                    <Button> Post </Button>
                                </div>
                            </div>
                        </div>

                    </Card>

                    <Modal open={modalOpen} closeModal={handleModal} />
                </>
            }
        </>
    );
}
