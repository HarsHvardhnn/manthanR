import { useEffect, useRef } from "react";
import "../User/scrollbar.css"
const DialogModal = ({
  isOpen,
  onClose,
  onSubmit,
  paragraph,
  closeBtnText,
  submitBtnText,
}) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-[95%]"
      onClick={handleOverlayClick}
    >
      <p className="mb-4 text-gray-800 font-medium text-lg">{paragraph}</p>
      <div className="flex justify-between text-sm">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          {closeBtnText}
        </button>
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {submitBtnText}
        </button>
      </div>
    </dialog>
  );
};

export default DialogModal;
