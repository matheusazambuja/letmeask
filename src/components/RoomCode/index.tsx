import toast from 'react-hot-toast';
import copyImg from '../../assets/images/copy.svg';
import { useTheme } from '../../hooks/useTheme';

import { FiCopy } from 'react-icons/fi';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const {
    theme
  } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);

    toast.success('Code room copied');
  }

  return (
    <button id='room-code' className={theme} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room Code" />
      </div>
      <span>Sala #{props.code}</span>
      <FiCopy className='icon-copy-mobile' />
    </button>
  )
}