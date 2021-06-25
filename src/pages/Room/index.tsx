import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImgLight from '../../assets/images/logo-light.svg';
import logoImgDark from '../../assets/images/logo-dark.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';
import { ButtonToggleTheme } from '../../components/ButtonToggleTheme';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {
    questions,
    title,
    handleAddedQuestion,
    handleUpdateQuestionLikes
  } = useRoom(roomId);

  const { user } = useAuth();
  const { theme } = useTheme();
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    // Use Toast => react hot toast
    if (!user) {
      toast.error('Faça login para enviar uma pergunta');

      return;
    }

    await handleAddedQuestion(newQuestion, user.name, user.avatar);

    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likeId?: string) {
    await handleUpdateQuestionLikes(questionId, likeId);
  }

  return (
    <div id='page-room' className={theme}>
      <ButtonToggleTheme />
      <header>
        <div className="content">
          <img src={theme === 'light' ? logoImgLight : logoImgDark} alt='Letmeask' />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button type='submit' disabled={!user || newQuestion.length === 0}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {user && (
            questions.length > 0 ? (
              questions.map(question => (
                <Question
                  questionId={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <button
                      className={`like-button ${question.likeId ? 'liked' : ''}`}
                      type='button'
                      aria-label='Marcar como gostei'
                      onClick={() => handleLikeQuestion(question.id, question.likeId)}
                    >
                      {question.likeCount > 0 && <span>{question.likeCount}</span>}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </Question>
              ))) : (
              <div className="no-questions">
                <svg width="200" height="198" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.1" cx="75" cy="75" r="75" fill="#835AFD" />
                  <path d="M9 29.7229V62.7836V65.145C9 67.7534 11.1145 69.868 13.7229 69.868H44.4221L57.0363 81.5118C57.883 82.2934 59.2331 81.5235 58.9917 80.3968L56.2295 67.5065H64.4946C67.103 67.5065 69.2175 65.392 69.2175 62.7836V29.7229C69.2175 27.1145 67.103 25 64.4946 25H13.7229C11.1145 25 9 27.1145 9 29.7229Z" fill="#835AFD" />
                  <path d="M149.218 57.7229V90.7836V93.145C149.218 95.7534 147.103 97.868 144.495 97.868H113.795L101.181 109.512C100.335 110.293 98.9844 109.524 99.2259 108.397L101.988 95.5065H93.7229C91.1145 95.5065 89 93.392 89 90.7836V57.7229C89 55.1145 91.1145 53 93.7229 53H144.495C147.103 53 149.218 55.1145 149.218 57.7229Z" fill="#E559F9" />
                  <path d="M42 101.41V118.281V119.486C42 120.817 43.0886 121.896 44.4314 121.896H60.2353L66.7291 127.838C67.1649 128.237 67.86 127.844 67.7357 127.269L66.3137 120.691H70.5686C71.9114 120.691 73 119.612 73 118.281V101.41C73 100.079 71.9114 99 70.5686 99H44.4314C43.0886 99 42 100.079 42 101.41Z" fill="#D67EE2" />
                  <circle cx="25.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                  <circle cx="38.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                  <circle cx="51.5" cy="46.5" r="3.5" fill="#FEFEFE" />
                </svg>
                <span>Nenhuma pergunta por aqui...</span>
                <p>Envie o código da sala para seus amigos e comece a responder perguntas!</p>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}

// Algoritmo de Reconciliação