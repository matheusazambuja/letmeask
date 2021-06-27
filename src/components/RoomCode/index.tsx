import toast from 'react-hot-toast';
import copyImg from '../../assets/images/copy.svg';
import { useTheme } from '../../hooks/useTheme';

import { FiCopy } from 'react-icons/fi';

// import './styles.scss';
import { ContainerRoomCode } from './styles';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  const {
    theme
  } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);

    toast.success('Code room copied');
  }

  return (
    <ContainerRoomCode id='room-code' className={theme} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room Code" />
      </div>
      <span>Sala #{code}</span>
      <FiCopy className='icon-copy-mobile' />
    </ContainerRoomCode>
  )
}