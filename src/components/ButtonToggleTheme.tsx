import { ButtonHTMLAttributes } from 'react';

import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa'

import '../styles/button-theme.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonToggleTheme(props: ButtonProps) {
  const {
    theme, toggleTheme
  } = useTheme();

  return (
    <button className="button-theme" onClick={toggleTheme} {...props}
      style={{ backgroundColor: 'transparent', color: theme === 'dark' ? '#FFFFFF' : '#29292e' }}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}