import { ButtonHTMLAttributes } from 'react';

import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa'

// import './styles.scss';

import { ContainerButtonToggleTheme } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonToggleTheme(props: ButtonProps) {
  const {
    theme, toggleTheme
  } = useTheme();

  return (
    <ContainerButtonToggleTheme onClick={toggleTheme} theme={theme} {...props}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </ContainerButtonToggleTheme>
  )
}