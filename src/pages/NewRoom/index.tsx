import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImgLight from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';

import './styles.scss';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ButtonToggleTheme } from '../../components/ButtonToggleTheme';
import { CoverPage } from '../../components/CoverPage';

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

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth' className={theme}>
      <ButtonToggleTheme />
      <CoverPage />
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