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
    timelineCard.current.style.zIndex = 9;
    editableDiv.current.style.height = "150px";
    editableDiv.current.contentEditable = true;
    editableDiv.current.focus();
    if (document.getElementById("div-placeholder")) {
      document.getElementById("div-placeholder").remove();
    }
    setOpen(true);
  };

  const handleModal = () => {
    if (!isOpen) {
      timelineCard.current.style.zIndex = 0;
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
  };

  const handleModalClick = () => {
    timelineCard.current.style.zIndex = 0;
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
    setEmojiModal(false);
    setPreviewFiles(false);
    setPhotoLength(0);
    setMediaType("");
    setSelectedFiles([]);
  };

  const documentClick = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.setAttribute("accept", ".docx, .pdf");
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      console.log(files);
    };
    input.click();
  };

  const mediaClick = () => {
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

      console.log(hasVideo)

      if (files.length > 1 && hasVideo) {
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
  };

  const selectedEmoji = (emojiVal) => {
    console.log(emojiVal);
  };

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
                <div className="flex flex-col w-1/2 h-full justify-center">
                  <span className="text-base font-black">Create a post</span>
                </div>
                <div className="flex flex-col w-1/2 h-full justify-center">
                  <div className="flex w-full">
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-500">Visible for</span>
                    </div>
                    <Menu className="mx-3">
                      <MenuHandler>
                        <Button
                          variant="text"
                          className="flex items-center w-32 timeline-bg mx-3 text-sm font-normal capitalize tracking-normal"
                        >
                          <span className="flex flex-grow">{postVisible}</span>
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3.5 w-3.5 ml-3`}
                          />
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

                    <div
                      className="flex flex-col ml-8 justify-center cursor-pointer"
                      onClick={() => handleModalClick()}
                    >
                      <Image
                        src={`/icons/${
                          themeState === "dark"
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
            <div className="w-full flex flex-wrap">
              <Avatar
                className={`${appStyles.avatarFont} ${
                  profile.photo === null
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
                <span
                  className="text-grey-light cursor-text w-full text-sm"
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
                />
              </div>
            )}

            <div className="flex flex-wrap mt-3 mx-3">
              {/** Document Upload */}
              <div
                className="w-1/4 flex flex-grow justify-start mt-1 cursor-pointer"
                onClick={() => documentClick()}
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={`/icons/${
                      themeState === "dark"
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
                className="w-1/4 flex flex-grow justify-center mt-1 cursor-pointer"
                onClick={() => mediaClick()}
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={`/icons/${
                      themeState === "dark"
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
                className="w-1/4 flex flex-grow justify-center mt-1 cursor-pointer relative"
                onClick={() => setEmojiModal(!isOpen)}
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={`/icons/${
                      themeState === "dark"
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
                  <Button> Post </Button>
                </div>
              </div>
            </div>
          </Card>

          <Modal open={modalOpen} closeModal={handleModal} />
        </>
      )}
    </>
  );
}
