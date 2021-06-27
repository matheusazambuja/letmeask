import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import logoImgLight from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';

import {
  SvgLoginRequiredDark
} from '../../components/iconComponents/Login/LoginRequiredDark';
import {
  SvgLoginRequiredLight
} from '../../components/iconComponents/Login/LoginRequiredLight';
import {
  EmptyQuestions
} from '../../components/iconComponents/EmptyQuestions/EmptyQuestions';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';
import { ButtonToggleTheme } from '../../components/ButtonToggleTheme';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { database } from '../../services/firebase';
import { Header } from '../../components/Header';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {
    questions,
    title,
    handleUpdatedQuestion,
    handleEndRoom
  } = useRoom(roomId);
  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();

  const { user, signInWithGoogle } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      const roomRef = database.ref(`rooms/${roomId}`);

      roomRef
        .once('value', room => {
          const valueRoom = room.val();
          const isAuthor = valueRoom.authorId === user?.id;

          if (!isAuthor) {
            history.push(`/rooms/${roomId}`);
          }
        });
    }
  }, [history, roomId, user]);

  async function handleEndRoomAdmin() {
    await handleEndRoom();

    history.push('/');
    toast.success('Sala encerrada com sucesso');
  }

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
  }

  async function handleDeleteQuestion(questionId?: string) {
    if (questionId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();

      setQuestionIdModalOpen(undefined);
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await handleUpdatedQuestion(questionId, 'highlighted');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await handleUpdatedQuestion(questionId, 'answered');
  }

  return (
    <div id='page-admin-room' className={theme}>
      <ButtonToggleTheme />
      <Header>
        <div className="content">
          <img src={theme === 'light' ? logoImgLight : logoImgDark} alt='Letmeask' />
          <div>
            {user && <RoomCode code={roomId} />}
            {user && <Button isOutlined onClick={handleEndRoomAdmin}>Encerrar</Button>}
          </div>
        </div>
      </Header>

      <main className="content">
        {user && (
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
        )}

        {!user && (
          <div className="login-required">
            {theme === 'dark' ?
              <SvgLoginRequiredDark aria-label='Faça login para continuar' /> :
              <SvgLoginRequiredLight aria-label='Faça login para continuar' />
            }
            <span>Faça login para acessar essa página</span>
            <Button onClick={handleLogin}>Fazer login</Button>
          </div>
        )}

        <div className="question-list">
          {user && (
            questions.length > 0 ? (
              questions.map(question => (
                <Question key={question.id}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                  content={question.content}
                  author={question.author}
                >
                  <button
                    type="button"
                    onClick={async () => await handleCheckQuestionAsAnswered(question.id)}
                  >
                    <svg className='icon-answered' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {!question.isAnswered && (
                    <button
                      type='button'
                      onClick={async () => await handleHighlightQuestion(question.id)}
                    >
                      <svg className='icon-select' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                  <button
                    type='button'
                    onClick={() => setQuestionIdModalOpen(question.id)}
                  >
                    <svg className='icon-delete' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Question>
              ))
            ) : (
              <div className="no-questions">
                <EmptyQuestions />
                <span>Nenhuma pergunta por aqui...</span>
                <p>Envie o código da sala para seus amigos e comece a responder perguntas!</p>
              </div>
            )
          )}
        </div>
      </main>
      <Modal
        theme={theme}
        isOpen={questionIdModalOpen !== undefined}
        onRequestClose={() => setQuestionIdModalOpen(undefined)}
      >
        <div className='modal-content'>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.99988H5H21" stroke="#e74b5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#e74b5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <strong>Excluir pergunta</strong>
          <span>Tem certeza que você deseja excluir esta pergunta?</span>
          <div className="buttons">
            <button className='button-cancel' onClick={() => setQuestionIdModalOpen(undefined)}>Cancelar</button>
            <button className='button-delete' onClick={() => handleDeleteQuestion(questionIdModalOpen)}>Sim, excluir</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// Algoritmo de Reconciliação
