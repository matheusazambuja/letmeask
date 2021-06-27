import illustrationImg from '../../assets/images/illustration.svg';

import './styles.scss';

export function CoverPage() {
  return (
    <aside>
      <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
      <strong>Crie salas de Q&amp;A e ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
  )
}