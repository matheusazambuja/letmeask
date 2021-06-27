import { ReactNode } from "react"
import { useTheme } from "../../hooks/useTheme";
import { ContainerHeader } from "./styles";

type HeaderProps = {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const {
    theme
  } = useTheme();

  return (
    <ContainerHeader theme={theme}>
      {children}
    </ContainerHeader>
  )
}