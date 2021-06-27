import { ReactNode } from 'react';

import { useTheme } from '../../hooks/useTheme';
import './styles.scss';

type QuestionProps = {
  isAnswered?: boolean;
  isHighlighted?: boolean;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}

export function Question({ isAnswered, isHighlighted, content, author, children }: QuestionProps) {
  const {
    theme
  } = useTheme();

  // console.log(author);

  return (
    <div id="question"
      className={`${theme} ${isHighlighted && !isAnswered ? 'highlighted' : ''} ${isAnswered ? 'answered' : ''}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className='question-children'>
          {children}
        </div>
      </footer>
    </div>
  );
}