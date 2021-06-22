import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/userAuth';

export function Home() {
  const history = useHistory();
  const {
    user, signInWithGoogle
  } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <strong>Crie salas de Q&amp;A e ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <Button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </Button>
          <div className='separator'>ou entre uma sala</div>
          <form>
            <input
              type='text'
              placeholder='Digite o código da sala'
            />
            <button className='button' type='submit'>
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}