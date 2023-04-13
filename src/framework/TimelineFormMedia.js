import NextImage from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function TimelineMedia({ fileLength, fileType, files }) {
  const singleImg = useRef([]);
  const img = new Image();

  files.forEach((file) => {
    img.src = `${file.url}`;
    img.onload = () => {
      let ratio;
      let width;
      let height;

      if (img.naturalHeight > img.naturalWidth) {
        ratio = img.naturalHeight / 500;
        width = img.naturalWidth / ratio;
        height = img.naturalHeight / ratio;
      } else if (img.naturalWidth > img.naturalHeight) {
        ratio = img.naturalWidth / 500;
        width = img.naturalWidth / ratio;
        height = img.naturalHeight / ratio;
      } else {
        if (img.naturalHeight > 500) {
          ratio = img.naturalHeight / 400;
          width = img.naturalWidth / ratio;
          height = img.naturalHeight / ratio;
        }
      }

      if (singleImg.current.length > 0) {
        if (fileLength <= 2) {
          singleImg.current.forEach((dom) => {
            if (dom) {
              dom.style.width = `${Math.ceil(width)}px`;
              dom.style.height = `${Math.ceil(height)}px`;
            }
          });
        }
        else {
          singleImg.current[0].style.width = `${Math.ceil(width)}px`;
          singleImg.current[0].style.height = `${Math.ceil(height)}px`;
          singleImg.current[1].style.height = `${Math.ceil(height)}px`;
        }
      }
    };
  });

  return (
    <>
      {fileType === "video-image" && (
        <>
          {fileLength === 1 && (
            <>
              {files.map((file, index) =>
                file.type.includes("video") ? (
                  <div
                    className="overflow-hidden flex justify-center rounded-xl"
                    key={index}
                  >
                    <ReactPlayer url={`${file.url}`} light playing controls />
                  </div>
                ) : (
                  <div
                    className="flex flex-col self-start bz-css-1dfj5n"
                    key={index}
                  >
                    <div
                      className="bz-css-1dfj5n r-1867qdf r-1phboty r-rs99b7 r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg"
                      style={{ borderColor: "transparent" }}
                    >
                      <div className="bz-css-1dfj5n">
                        <div className="flex flex-grow bz-css-1dfj5n">
                          <Link
                            href=""
                            className="cursor-pointer bz-css-1dfj5n"
                          >
                            <div
                              className="bz-css-1dfj5n overflow-hidden block"
                              ref={(el) => (singleImg.current[index] = el)}
                            >
                              <div className="block overflow-hidden bz-css-1dfj5n w-full h-full">
                                <div className="absolute w-full h-full top-0 left-0 bottom-0">
                                  <div
                                    className="bz-css-1dfj5n bottom-0 left-0 r-11wrixw r-61z16t overflow-hidden absolute right-0 top-0 h-full r-417010"
                                    style={{ zIndex: 0 }}
                                  >
                                    <div
                                      className="w-full bg-cover bg-no-repeat h-full absolute bg-center top-0 right-0 bottom-0 left-0 bz-css-1dfj5n"
                                      style={{
                                        backgroundImage: `url(${file.url})`,
                                        zIndex: -1,
                                      }}
                                      key={index}
                                    >
                                      <NextImage
                                        src={`${file.url}`}
                                        className="rounded-xl h-full w-full absolute opacity-0"
                                        height={150}
                                        width={150}
                                        alt="menu"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          )}

          {fileLength === 2 && (
            <>
              <div className="flex flex-col self-start bz-css-1dfj5n">
                <div
                  className="bz-css-1dfj5n r-1867qdf r-1phboty r-rs99b7 r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg"
                  style={{ borderColor: "transparent" }}
                >
                  <div className="bz-css-1dfj5n">
                    <div className="flex flex-grow flex-row bz-css-1dfj5n">
                      {files.map((file, index) => (
                        <div
                          className={`bz-css-1dfj5n relative flex-grow ${
                            index === 0 ? "mr-1" : ""
                          }`}
                          key={index}
                          style={{ flexBasis: "0px", maxWidth: "250px" }}
                        >
                          <div className="w-full h-full flex-grow bz-css-1dfj5n">
                            <Link
                              href=""
                              className="cursor-pointer bz-css-1dfj5n"
                            >
                              <div
                                className="bz-css-1dfj5n overflow-hidden block"
                                ref={(el) => (singleImg.current[index] = el)}
                              >
                                <div className="block overflow-hidden bz-css-1dfj5n w-full h-full">
                                  <div className="absolute w-full h-full top-0 left-0 bottom-0">
                                    <div
                                      className="bz-css-1dfj5n bottom-0 left-0 r-11wrixw r-61z16t overflow-hidden absolute right-0 top-0 h-full r-417010"
                                      style={{ zIndex: 0 }}
                                    >
                                      <div
                                        className="w-full bg-cover bg-no-repeat h-full absolute bg-center top-0 right-0 bottom-0 left-0 bz-css-1dfj5n"
                                        style={{
                                          backgroundImage: `url(${file.url})`,
                                          maxWidth: "250px",
                                          zIndex: -1,
                                        }}
                                        key={index}
                                      >
                                        <NextImage
                                          src={`${file.url}`}
                                          className="rounded-xl h-full w-full absolute opacity-0"
                                          height={150}
                                          width={150}
                                          alt="menu"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}


          {fileLength === 3 && (
            <>
              <div className="flex flex-col self-start bz-css-1dfj5n">
                <div
                  className="bz-css-1dfj5n r-1867qdf r-1phboty r-rs99b7 r-1ny4l3l r-1udh08x r-o7ynqc r-6416eg"
                  style={{ borderColor: "transparent" }}
                >
                  <div className="bz-css-1dfj5n">
                    <div className="flex flex-grow flex-row bz-css-1dfj5n">
                        <div
                          className={`bz-css-1dfj5n relative flex-grow mr-2`}
                          style={{ flexBasis: "0px" }}
                        >
                          <div className="w-full h-full flex-grow bz-css-1dfj5n">
                            <Link
                              href=""
                              className="cursor-pointer bz-css-1dfj5n"
                            >
                              <div
                                className="bz-css-1dfj5n overflow-hidden block"
                                ref={(el) => (singleImg.current[0] = el)}
                              >
                                <div className="block overflow-hidden bz-css-1dfj5n w-full h-full">
                                  <div className="absolute w-full h-full top-0 left-0 bottom-0">
                                    <div
                                      className="bz-css-1dfj5n bottom-0 left-0 r-11wrixw r-61z16t overflow-hidden absolute right-0 top-0 h-full r-417010"
                                      style={{ zIndex: 0 }}
                                    >
                                      <div
                                        className="w-full bg-cover bg-no-repeat h-full absolute bg-center top-0 right-0 bottom-0 left-0 bz-css-1dfj5n"
                                        style={{
                                          backgroundImage: `url(${files[0].url})`,
                                          maxWidth: "250px",
                                          zIndex: -1,
                                        }}
                                      >
                                        <NextImage
                                          src={`${files[0].url}`}
                                          className="rounded-xl h-full w-full absolute opacity-0"
                                          height={150}
                                          width={150}
                                          alt="menu"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                      </div>

                      <div className="flex flex-col flex-grow"
                        style={{ flexBasis: "0px" }}
                        ref={(el) => (singleImg.current[1] = el)}
                      >
                      <div
                        className={`bz-css-1dfj5n relative flex-grow h-1/2 mb-2`}
                      >
                        <div className="w-full h-full flex-grow bz-css-1dfj5n">
                          <Link
                            href=""
                            className="cursor-pointer h-full bz-css-1dfj5n"
                          >
                            <div
                                className="bz-css-1dfj5n h-full overflow-hidden block"
                            >
                              <div className="block overflow-hidden bz-css-1dfj5n w-full h-full">
                                <div className="absolute w-full h-full top-0 left-0 bottom-0">
                                  <div
                                    className="bz-css-1dfj5n bottom-0 left-0 r-11wrixw r-61z16t overflow-hidden absolute right-0 top-0 h-full r-417010"
                                    style={{ zIndex: 0 }}
                                  >
                                    <div
                                      className="w-full bg-cover bg-no-repeat h-full absolute bg-center top-0 right-0 bottom-0 left-0 bz-css-1dfj5n"
                                      style={{
                                        backgroundImage: `url(${files[1].url})`,
                                        maxWidth: "250px",
                                        zIndex: -1,
                                      }}
                                    >
                                      <NextImage
                                        src={`${files[1].url}`}
                                        className="rounded-xl h-full w-full absolute opacity-0"
                                        height={150}
                                        width={150}
                                        alt="menu"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        </div>

                        <div
                          className={`bz-css-1dfj5n relative h-1/2 flex-grow`}
                        >
                          <div className="w-full h-full flex-grow bz-css-1dfj5n">
                            <Link
                              href=""
                              className="cursor-pointer h-full bz-css-1dfj5n"
                            >
                              <div
                                className="bz-css-1dfj5n h-full overflow-hidden block"
                              >
                                <div className="block overflow-hidden bz-css-1dfj5n w-full h-full">
                                  <div className="absolute w-full h-full top-0 left-0 bottom-0">
                                    <div
                                      className="bz-css-1dfj5n bottom-0 left-0 r-11wrixw r-61z16t overflow-hidden absolute right-0 top-0 h-full r-417010"
                                      style={{ zIndex: 0 }}
                                    >
                                      <div
                                        className="w-full bg-cover bg-no-repeat h-full absolute bg-center top-0 right-0 bottom-0 left-0 bz-css-1dfj5n"
                                        style={{
                                          backgroundImage: `url(${files[2].url})`,
                                          maxWidth: "250px",
                                          zIndex: -1,
                                        }}
                                      >
                                        <NextImage
                                          src={`${files[2].url}`}
                                          className="rounded-xl h-full w-full absolute opacity-0"
                                          height={150}
                                          width={150}
                                          alt="menu"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </>
      )}
    </>
  );
}
