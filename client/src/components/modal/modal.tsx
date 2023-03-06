import { useContext, useEffect } from 'react';
import { Modal as ModalAnt } from 'antd';

import { modalContext } from '../../context/modalcontext';

import type { ModalProps } from 'antd';
import type { ModalContext } from '../../types';

import StyledModal from './modal.styled';

const Modal = ({ title, ...props }: ModalProps) => {
    const { setModal } = useContext(modalContext) as ModalContext;

    useEffect(() => {
        document.body.classList.add('modal-lock');
        return () => document.body.classList.remove('modal-lock');
    }, []);

    return (
        <StyledModal
            title={<h3>{title}</h3>}
            open={true}
            centered={true}
            onCancel={() => setModal(null)}
            width="100%"
            destroyOnClose={true}
            {...props}
        />
    );
};

Modal.useModal = ModalAnt.useModal;

export default Modal;
