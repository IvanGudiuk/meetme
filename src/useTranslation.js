import { useSelector } from 'react-redux';
import en from './en.json';
import ru from './ru.json';

const translations = {
  en,
  ru,
};

export const useTranslation = () => {
  const { lang } = useSelector(state => state.auth);
  return translations[lang] || translations.en;
};
