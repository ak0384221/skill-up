import ReactDOM from "react-dom";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 flex text-white items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-sm p-10 w-80  shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 hover:scale-110 transition-all  text-black bg-gray-200 rounded-md hover:bg-gray-300"
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
    </div>,
    document.getElementById("modal-root")
  );
}
