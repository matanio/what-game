import { useState } from 'react';

/**
 * A hook for managing the state of a modal.
 */
export default function useModal(initialOpenState: boolean = true) {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpenState);
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return { isOpen, closeModal, openModal };
}

export interface ModalProps {
    showModal: boolean;
    onClose: () => void;
}
