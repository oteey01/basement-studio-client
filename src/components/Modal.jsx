import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

// export interface ModalCompProps {
//   isOpen: boolean;
//   close: () => void;
//   children?: React.ReactNode;
//   dialogClassName?: string;
//   shouldPreventUserFromClosing?: boolean; // specifies if user should not be able to close the modal.
// }

export const Modal = ({
  isOpen,
  children,
  dialogClassName,
  shouldPreventUserFromClosing,
  close,
}) => {
  const handleClose = shouldPreventUserFromClosing
    ? () => {
        return;
      }
    : close;

  return (
    <div  onClick={()=>close()} className="fixed inset-0 flex justify-center items-center z-[292929]">
{
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center" >
        {/* overlay */}
        
          <div
            className="absolute inset-0 w-full bg-[#101828] opacity-60 dark:bg-[rgba(0,0,0,0.50)] dark:bg-opacity-100 transition-opacity backdrop-blur-md"
          />
        

        {/* main modal container */}
          <div onClick={(e)=>{e.stopPropagation()}} className="flex min-w-[100px] max-w-[99%] min-h-[50px] max-h-[90vh] w-full h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
            
              {/* main modal panel */}
              <div
                className={` flex flex-col relative transform overflow-y-scroll rounded-lg text-left shadow-xl transition-all dark:text-dark_primary_text ${dialogClassName} `}
              >
                {children}
              </div>
          </div>
        </div>
      </div>
}
</div>
  );
};