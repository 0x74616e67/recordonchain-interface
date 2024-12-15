import { memo, useCallback, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "../Button";

function DialogComponent({
  open = false,
  onClose = () => {},
  onOk = () => {},
  onCancel = () => {},
  title = "",
  children,
  okButton = ["OK", false], // [text, disabled]
  cancelButton = ["Cancel", false], // [text, disabled]
  closeable = false,
}) {
  const targetDivRef = useRef(null);
  const [okText, okDisabled] = okButton;
  const [cancelText, cancelDisabled] = cancelButton;
  const isShowOk = !!okButton.length;
  const isShowCancel = !!cancelButton.length;

  const handleTouchEnd = useCallback((event) => {
    // 检查触摸结束时的目标元素是否是目标 div
    if (targetDivRef.current === event.target) {
      onCancel();
    }
  }, []);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          ref={targetDivRef}
          className="flex max-h-full min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={onCancel}
          onTouchEnd={handleTouchEnd}
        >
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {closeable && (
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={onCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            )}

            <div className="bg-white p-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-4 flex max-h-[70vh] flex-col">
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* buttons area */}
            {(isShowOk || isShowCancel) && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {isShowOk && (
                  <Button onClick={onOk} disabled={okDisabled} data-autofocus>
                    {okText}
                  </Button>
                )}
                {isShowCancel && (
                  <Button
                    onClick={onCancel}
                    disabled={cancelDisabled}
                    className="mt-2 sm:mt-0"
                    type="secondary"
                  >
                    {cancelText}
                  </Button>
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(DialogComponent);
