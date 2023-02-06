import { useContext, useEffect } from 'react';
import { Modal as ModalAnt } from 'antd';

import { modalContext } from '../../context/modalcontext';

import StyledModal from './modal.styled';

interface Props {
    title: String;
    [x: string]: any;
}

const Modal = ({ title, ...props }: Props) => {
    const modalData = useContext(modalContext);

    useEffect(() => {
        document.body.classList.add('modal-lock');
        return () => document.body.classList.remove('modal-lock');
    }, []);

    return (
        <StyledModal
            title={<h3>{title}</h3>}
            open={true}
            centered={true}
            onCancel={() => modalData?.setModal(null)}
            width="100%"
            destroyOnClose={true}
            {...props}
        />
    );
};

Modal.useModal = ModalAnt.useModal;

export default Modal;
