import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="ml-[10vw] mr-[10vw] fixed top-[25vh] z-50 min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className=" text-2xl cursor-pointer" />
            </div>
            {children}
          </div>
          <div onClick={onClose} className="backdrop-blur h-screen w-[100%] absolute top-0 z-40" />
        </>
      )}
    </>
    , document.getElementById("modal-root"))
}

export default Modal