import { useCallback, useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

// type FirebaseLikes = Record<string, {
//   authorId: string;
// }>;

type FirebaseQuestion = {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
};

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  const parseQuestion = useCallback((key: string, value: FirebaseQuestion) => {
    return {
      id: key,
      content: value.content,
      author: value.author,
      isHighlighted: value.isHighlighted,
      isAnswered: value.isAnswered,
      likeCount: Object.values(value.likes ?? {}).length,
      likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
    }
  }, [user?.id]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions: QuestionType[] = Object.entries(firebaseQuestions).map(([key, value]) => {
        return parseQuestion(key, value);
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    const questionsRef = database.ref(`rooms/${roomId}/questions`);

    questionsRef
      .endAt(1)
      .limitToLast(1)
      .on('child_added', question => {
        const questionKey = question.key ?? '';
        const databaseQuestion: FirebaseQuestion = question.val();

        const parsedQuestion: QuestionType = parseQuestion(questionKey, databaseQuestion);

        setQuestions(oldQuestions => {
          const questionKeys = oldQuestions.map(questions => questions.id);

          if (!questionKeys.includes(parsedQuestion.id)) {
            const newQuestions = oldQuestions.filter(
              question => parsedQuestion.id !== question.id
            );

            return [...newQuestions, parsedQuestion];
          }

          return oldQuestions;
        });
      });

    questionsRef
      .on('child_changed', question => {
        const questionKey = question.key ?? '';
        const databaseQuestion: FirebaseQuestion = question.val();

        const parsedQuestion: QuestionType = parseQuestion(questionKey, databaseQuestion);

        setQuestions(oldQuestions => oldQuestions.map(question => {
          return questionKey === question.id ?
            parsedQuestion
            : question;
        }));
      });

    questionsRef
      .on('child_removed', question => {
        const questionKey = question.key ?? '';

        setQuestions(oldQuestions => {
          const newQuestions = oldQuestions.filter(
            question => question.id !== questionKey
          );

          return newQuestions;
        });
      });

    return () => {
      questionsRef.off('child_added');
      questionsRef.off('child_removed');
      questionsRef.off('child_changed');
    }
  }, [roomId, user?.id, parseQuestion]);

  // Utilizar ChildAdded ao invés de recarregar todas as perguntas novamente
  // Entretanto, ele executa o evento para todas as questions (dados) :/
  // Adicionando o método limitToLast(1) com parâmetro 1, paginamos a consulta
  // para retornar somente 1 elemento
  // Precisamos também adicionar o método once para que ele escute o evento
  // somente uma vez, assim quando novas perguntas forem adicionadas
  // o evento não seja executado novamente;
  async function handleAddedQuestion(content: string, userName: string, userAvatar: string) {
    const question = {
      content,
      author: {
        name: userName,
        avatar: userAvatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
  }

  async function handleUpdateQuestionLikes(questionId: string, likeId?: string) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      });
    }
  }

  async function handleUpdatedQuestion(questionId: string, type: string) {
    if (type === 'highlighted') {
      const questionHighlighted = questions.filter(
        question => question.id === questionId
      )[0]?.isHighlighted;

      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: !questionHighlighted
      });

    } else if (type === 'answered') {
      const questionAnswered = questions.filter(
        question => question.id === questionId
      )[0]?.isAnswered;

      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: !questionAnswered
      });
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`)
      .update({
        closedAt: new Date()
      });
  }

  return {
    questions,
    title,
    handleAddedQuestion,
    handleUpdateQuestionLikes,
    handleUpdatedQuestion,
    handleEndRoom
  };
}