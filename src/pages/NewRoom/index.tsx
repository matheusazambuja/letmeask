import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImgLight from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';

import './styles.scss';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ButtonToggleTheme } from '../../components/ButtonToggleTheme';

export function NewRoom() {
  const {
    user
  } = useAuth();

  const {
    theme
  } = useTheme();

  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth' className={theme}>
      <ButtonToggleTheme />
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <strong>Crie salas de Q&amp;A e ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={theme === 'light' ? logoImgLight : logoImgDark} alt='Letmeask' />
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button className='button' type='submit'>
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente <Link to='/'>Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}