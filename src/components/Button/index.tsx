import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ContainerButton } from './styles';

// import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const {
    theme
  } = useTheme();

  return (
    <ContainerButton theme={theme}
      className={`${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}