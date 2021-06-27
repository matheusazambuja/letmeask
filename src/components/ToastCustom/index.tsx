import { Toaster } from "react-hot-toast";
import { DefaultToastOptions } from "react-hot-toast/dist/core/types";
import { useTheme } from "../../hooks/useTheme";

export function ToastCustom() {
  const { theme } = useTheme();

  // Define default options
  const toastOptions: DefaultToastOptions = {
    style: {
      backgroundColor: theme === 'dark' ? '#323741' : '#F8F8F8',
      border: theme === 'dark' ? '0' : '1px solid #835afd',
      boxShadow: 'rgba(0, 0, 0, 0.2)',
      color: theme === 'dark' ? '#F8F8F8' : '#29292e',
      fontSize: '1.1rem',
      padding: '1rem 3rem',
    },
  };

  return (
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={toastOptions}
    />
  )
}