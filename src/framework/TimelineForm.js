import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import appStyles from "@/styles/app.module.css";
import Avatar from "react-avatar";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import EmojiModal from "@/components/EmojiModal";
import TimelineFormMedia from "./TimelineFormMedia";

export default function TimelineForm({ profile, themeState }) {
  const [theme, setTheme] = useState(false);
  const [isOpen, setEmojiModal] = useState(false);
  const [postVisible, setVisibility] = useState("Friends");
  const [previewFile, setPreviewFiles] = useState(false);
  const [photoLength, setPhotoLength] = useState(0);
  const [viewFiles, setSelectedFiles] = useState([]);
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    if (themeState) {
      setTheme(true);
    }
  }, [themeState]);

  const timelineCard = useRef("timeline-form");
  const editableDiv = useRef("div-editable");
  const previewDiv = useRef("previewDiv");

  const [modalOpen, setOpen] = useState(false);

  const setTextArea = (e) => {
    editableDiv.current.style.height = "150px";
    editableDiv.current.style.cursor = "text";
    editableDiv.current.contentEditable = true;
    editableDiv.current.focus();
    if (document.getElementById("div-placeholder")) {
      document.getElementById("div-placeholder").remove();
    }
    setOpen(true);
  };

  /*const handleModal = () => {
    if (!isOpen) {
      editableDiv.current.style.height = null;
      editableDiv.current.contentEditable = false;
      if (editableDiv.current.textContent === "") {
        editableDiv.current.blur();
        const spanEl = document.createElement("span");
        spanEl.classList.add("text-grey-light");
        spanEl.classList.add("text-sm");
        spanEl.setAttribute("id", "div-placeholder");
        spanEl.textContent = "What’s happening?";
        editableDiv.current.appendChild(spanEl);
      }
      setOpen(false);
      setPreviewFiles(false);
      setPhotoLength(0);
      setMediaType("");
      setSelectedFiles([]);
    } else {
      setEmojiModal(false);
    }
  };*/

  const handleModalClick = () => {
    editableDiv.current.style.height = null;
    editableDiv.current.contentEditable = false;
    editableDiv.current.style.cursor = "pointer";
    if (editableDiv.current.textContent === "") {
      editableDiv.current.blur();
      const spanEl = document.createElement("span");
      spanEl.classList.add("text-grey-light");
      spanEl.classList.add("text-sm");
      spanEl.setAttribute("id", "div-placeholder");
      spanEl.textContent = "What’s happening?";
      editableDiv.current.appendChild(spanEl);
    }
    setOpen(false);
    setEmojiModal(false);
    setPreviewFiles(false);
    setPhotoLength(0);
    setMediaType("");
    setSelectedFiles([]);
  };

  const documentClick = () => {
    if (modalOpen) {
      let input = document.createElement("input");
      input.type = "file";
      input.setAttribute("accept", ".pdf");
      input.setAttribute("multiple", true);
      input.onchange = (_) => {
        // you can use this method to get file and perform respective operations
        let files = Array.from(input.files);

        console.log(files);

        setPhotoLength(files.length);
        setMediaType("document");
        setSelectedFiles([]);
        setPreviewFiles(true);

        files.forEach((file) => {
          const objMedia = { url: file, type: file.type };
          setSelectedFiles((viewFiles) => [...viewFiles, objMedia]);
        });
      };
      input.click();
    }
  };

  const mediaClick = () => {
    if (modalOpen) {
      let input = document.createElement("input");
      input.type = "file";
      input.setAttribute("accept", "video/*, image/*");
      input.setAttribute("multiple", true);
      input.onchange = (_) => {
        // you can use this method to get file and perform respective operations
        let files = Array.from(input.files);

        setPhotoLength(files.length);
        setMediaType("video-image");
        setSelectedFiles([]);

        const hasVideo = files.some((e) => e.type.includes("video"));

        if (files.length > 4 || hasVideo) {
          setPreviewFiles(false);
          toast('Maximum of 4 images or 1 video required', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: `${themeState === 'dark' ? 'light' : 'dark'}`,
          });
        } else {
          setPreviewFiles(true);
          files.forEach((file) => {
            var urlBlob = URL.createObjectURL(file);
            const objMedia = { url: urlBlob, type: file.type };
            setSelectedFiles((viewFiles) => [...viewFiles, objMedia]);
          });
        }
      };
      input.click();
    }
  };

  const selectedEmoji = (emojiVal) => {
    console.log(emojiVal);
    setEmojiModal(false);
  };

  const setEmojiDisplay = () => {
    if (modalOpen) {
      setEmojiModal(!isOpen)
    }
  }

  return (
    <>
      {theme && (
        <>
          <Card
            className={`rounded-xl p-3 flex flex-col shadow-sm ${appStyles.bgCard}`}
            id="timeline-form"
            ref={timelineCard}
            style={{ color: "inherit", zIndex: 0 }}
          >
            {/** MODAL HEADER */}
            {modalOpen && (
              <div
                className={`w-full flex h-11 mb-3 pb-2 flex-wrap border-b ${appStyles.borderColor}`}
              >
                <div className="flex flex-col w-3/5 h-full justify-center">
                  <div className="flex flex-grow w-full">
                    <span className="text-base font-bold">Create a post</span>
                  </div>
                </div>
                <div className="flex flex-col pl-7 h-full justify-center">
                  <div className="flex w-full flex-grow flex-end">
                    <div className="flex flex-grow">
                      <Menu className="mx-3">
                        <MenuHandler>
                          <Button
                            variant="text"
                            className="flex items-center text-inherit w-32 timeline-bg mx-3 px-3 text-sm capitalize tracking-normal"
                          >
                            <span className="text-sm font-500 flex flex-grow mr-2">
                              <Image
                                src={`/icons/${themeState === "dark"
                                  ? "eye-light.svg"
                                  : "eye-dark.svg"
                                  }`}
                                height={150}
                                width={150}
                                alt="eye"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </span>
                            <span className="flex flex-grow ml-2">{postVisible}</span>
                            <span className="flex flex-grow">
                              <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5 ml-3`}
                              />
                            </span>
                          </Button>
                        </MenuHandler>
                        <MenuList className={`${appStyles.bgCard} border-tr`}>
                          <MenuItem onClick={() => setVisibility("Friends")}>
                            Friends
                          </MenuItem>
                          <MenuItem onClick={() => setVisibility("Public")}>
                            Public
                          </MenuItem>
                          <MenuItem onClick={() => setVisibility("Only Me")}>
                            Only Me
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                    <div
                      className="flex flex-col mr-3 justify-center cursor-pointer"
                      onClick={() => handleModalClick()}
                    >
                      <Image
                        src={`/icons/${themeState === "dark"
                          ? "close-light.svg"
                          : "close-dark.svg"
                          }`}
                        height={150}
                        width={150}
                        alt="close"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/** MODAL BODY */}
            <div className="w-full flex flex-wrap cursor-pointer">
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
                className="flex flex-grow p-2 w-auto timeline-bg mx-3 rounded-xl text-sm"
                id="div-editable"
                ref={editableDiv}
                placeholder="What’s happening?"
                onClick={(e) => setTextArea(e)}
              >
                <span
                  className="text-grey-light w-full text-sm"
                  id="div-placeholder"
                >
                  What’s happening?
                </span>
              </div>
            </div>

            {/** PREVIEW SELECTED FILES BEFORE UPLOAD */}
            {previewFile && (
              <div className="flex w-full justify-center mt-3" ref={previewDiv}>
                <TimelineFormMedia
                  fileLength={photoLength}
                  fileType={mediaType}
                  files={viewFiles}
                  themeState={themeState}
                />
              </div>
            )}

            <div className="flex flex-wrap mt-3 mx-3">
              {/** Document Upload */}
              <div
                className={`w-1/4 flex flex-grow justify-start mt-1 ${modalOpen ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => documentClick()}
              >
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
              <div
                className={`w-1/4 flex flex-grow justify-center mt-1 ${modalOpen ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => mediaClick()}
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={`/icons/${themeState === "dark"
                      ? "photo-light.svg"
                      : "photo-dark.svg"
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
              <div
                className={`w-1/4 flex flex-grow justify-center mt-1 ${modalOpen ? 'cursor-pointer' : 'cursor-default'} relative`}
              >
                <div className="flex"
                  onClick={() => setEmojiDisplay()}
                >
                  <div className="flex flex-col justify-center">
                    <Image
                      src={`/icons/${themeState === "dark"
                        ? "smiley-light.svg"
                        : "smiley-dark.svg"
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
                </div>

                <EmojiModal
                  openModal={isOpen}
                  emojiModel={selectedEmoji}
                  themeState={themeState}
                  left="0"
                  top="100"
                  right="0"
                  margin="0"
                />
              </div>

              {/** Button */}
              <div className="w-1/4 flex flex-grow justify-center mt-1">
                <div className="flex flex-col justify-center">
                  <Button disabled> Post </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* <Modal open={modalOpen} closeModal={handleModal} /> */}
        </>
      )}
    </>
  );
}
