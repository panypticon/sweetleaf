import { createContext, useState } from 'react';

import type { ModalContext } from '../types';

export const modalContext = createContext<ModalContext | null>(null);

export const ModalProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const [modal, setModal] = useState(null);
    return <modalContext.Provider value={{ modal, setModal }}>{children}</modalContext.Provider>;
};
