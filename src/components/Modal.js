export default function Modal({ open, closeModal }) {
  const handleModalClick = () => {
    closeModal("modal");
  };

  return (
    <>
      {open && (
        <div
          className="fixed top-0 right-0 left-0 h-full flex flex-col flex-grow modal-bg"
          onClick={() => handleModalClick()}
        >
        </div>
      )}
    </>
  );
}
