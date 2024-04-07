import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useEffect, useState } from 'react';

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export function useLocalStorage<T>(
    key: string,
    initialValue: T | null = null
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

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

export interface IconProps {
    className?: string;
}
