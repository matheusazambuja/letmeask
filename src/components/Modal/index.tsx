import { ReactNode } from "react"
import ReactModal from 'react-modal';

import './styles.scss';


type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  theme: string;
  onRequestClose?: () => void;
}

export function Modal({ isOpen, theme, onRequestClose, children }: ModalProps) {
  return (
    <ReactModal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`modal ${theme}`}
      overlayClassName='overlay-modal'
    >
      {children}
    </ReactModal>
  )
}