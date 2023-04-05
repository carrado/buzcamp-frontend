import Image from "next/image";

export default function SearchInput({ className, inputValue }) {
  return (
    <>
      <div className={`flex ${className}`}>
        <div className="px-3 py-2">
          <Image
            src={`/icons/search-icon.svg`}
            width={15}
            height={15}
            alt="search-icon"
          />
        </div>
        <input
          type={"text"}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          placeholder={"Search for something here..."}
          style={{ width: "100%", backgroundColor: "transparent" }}
          autoComplete="off"
        />
      </div>
    </>
  );
}
