import React from 'react';
import classNames from "classnames";

const Dialog = ({dialog, children, onClose}) => {
  const {visible} = dialog
  return (
    <div className={classNames('relative z-10', {hidden: !visible})} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div onClick={onClose} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {children}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button"
                      onClick={onClose}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                Start Playing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dialog;