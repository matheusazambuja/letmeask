import toast from 'react-hot-toast';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImgLight from '../assets/images/logo-light.svg';
import logoImgDark from '../assets/images/logo-dark.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';
import { useTheme } from '../hooks/useTheme';
import { ButtonToggleTheme } from '../components/ButtonToggleTheme';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean
}>;

type RoomParams = {
  id: string;
}

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {
    user
  } = useAuth();
  const {
    theme
  } = useTheme();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

  }, [roomId]);

  // Utilizar ChildAdded ao invés de recarregar todas as perguntas novamente
  // Entretanto, ele executa o evento para todas as questions (dados) :/
  // Adicionando o método limitToLast(1) com parâmetro 1, paginamos a consulta
  // para retornar somente 1 elemento
  // Precisamos também adicionar o método once para que ele escute o evento
  // somente uma vez, assim quando novas perguntas forem adicionadas
  // o evento não seja executado novamente;
  async function handleUpdateQuestions() {
    database.ref(`rooms/${roomId}/questions/`)
      .limitToLast(1)
      .once('child_added', (snapshot) => {
        const newQuestionAdded = snapshot.val();

        // console.log(`Question: ${newQuestionAdded.content}`);

        setQuestions([...questions, newQuestionAdded]);
      })
  }

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    // Use Toast => react hot toast
    if (!user) {
      toast.error('Faça login para enviar uma pergunta');

      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    await handleUpdateQuestions();

    setNewQuestion('');
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

        <form onSubmit={handleCreateNewQuestion}>
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

        {JSON.stringify(questions)}
      </main>
    </div>
  )
}