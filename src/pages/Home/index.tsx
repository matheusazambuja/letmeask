import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImgLight from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';
import googleIconImgLight from '../../assets/images/google-icon-light.svg'
import googleIconImgDark from '../../assets/images/google-icon-dark.svg'

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import toast from 'react-hot-toast';
import { useTheme } from '../../hooks/useTheme';
import { ButtonToggleTheme } from '../../components/ButtonToggleTheme';
import { CoverPage } from '../../components/CoverPage';

import './styles.scss';

export function Home() {
  const {
    user, signInWithGoogle
  } = useAuth();
  const {
    theme
  } = useTheme();
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      toast.error('Insira o código da sala');
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Código de sala incorreto');

      return;
    }

    if (!roomRef.val().closedAt) {
      history.push(`/rooms/${roomCode}`);
    } else {
      toast.error('Sala encerrada');
    }
  }

  return (
    <div id='page-auth' className={theme}>
      <ButtonToggleTheme />
      <CoverPage />
      <main>
        <div className='main-content'>
          <img src={theme === 'light' ? logoImgLight : logoImgDark} alt='Letmeask' />
          <Button onClick={handleCreateRoom} isOutlined>
            <img src={theme === 'light' ? googleIconImgDark : googleIconImgLight} alt='Logo do Google' />
            Crie sua sala com o Google
          </Button>
          <div className='separator'>ou entre em uma sala</div>
          {/* // react-hook-form, formik */}
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}