import { ReactElement } from 'react';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface ModalContext {
    modal: ReactElement | null;
    setModal: Dispatch<SetStateAction<any>>;
}

export const modalContext = createContext<ModalContext | null>(null);

export const ModalProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const [modal, setModal] = useState(null);
    return <modalContext.Provider value={{ modal, setModal }}>{children}</modalContext.Provider>;
};
