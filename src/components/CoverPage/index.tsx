import illustrationImg from '../../assets/images/illustration.svg';

import { ContainerCoverPage } from './styles';
import { useTheme } from '../../hooks/useTheme';

export function CoverPage() {
  const {
    theme
  } = useTheme();

  return (
    <ContainerCoverPage theme={theme}>
      <img src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
      <strong>Crie salas de Q&amp;A e ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </ContainerCoverPage>
  )
}