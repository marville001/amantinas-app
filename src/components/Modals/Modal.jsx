import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
    isOpen,
    classes = "",
    closeModal,
    size,
    children,
    title,
    center = true,
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}

                    {center && (
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                    )}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={`
                inline-block w-full 
                ${
                    size && size === "sm"
                        ? "max-w-sm"
                        : size === "md"
                        ? "max-w-md"
                        : size === "lg"
                        ? "max-w-lg"
                        : size === "xl"
                        ? "max-w-xl"
                        : size === "2xl"
                        ? "max-w-2xl"
                        : size === "3xl"
                        ? "max-w-3xl"
                        : size === "4xl"
                        ? "max-w-4xl"
                        : "max-w-2xl"
                }
                p-6 my-8 overflow-hidden 
                text-left align-middle transition-all transform bg-primary-blue 
                shadow-2xl shadow-primary-blue/40 dark:shadow-dark-primary-color rounded-2xl dark:bg-gray-secondary-color
                ${classes && classes}
                
                `}
                        >
                            {title && (
                                <Dialog.Title
                                    as="h3"
                                    className="text-4xl mb-10 text-center text-white font-medium leading-6"
                                >
                                    {title}
                                </Dialog.Title>
                            )}
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
