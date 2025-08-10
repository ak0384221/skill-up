import ReactDOM from "react-dom";
import GradientWrapper from "../Micro/GradientWrapper";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex text-white items-center justify-center z-50 backdrop-blur-lg">
      <GradientWrapper noSpace="true">
        <div className="bg-[#1f1f1f] rounded-sm p-10 w-full  shadow-md  text-center">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to log out?
          </h2>
          <div className="flex w-4/5  justify-end gap-3 mx-auto">
            <button
              onClick={onClose}
              className="w-1/2 py-2 hover:scale-110 transition-all  text-black bg-gray-200 rounded-md hover:bg-gray-300 "
            >
              No
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-1/2 py-2 hover:scale-110 transition-all bg-red-500 text-white rounded-md"
            >
              Yes
            </button>
          </div>
        </div>
      </GradientWrapper>
    </div>,
    document.getElementById("modal-root")
  );
}
