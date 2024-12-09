import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';
import sv from './locales/sd.json';
import es from './locales/sp.json';
import fr from './locales/fr.json';
import ja from './locales/ja.json';
import no from './locales/no.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import tr from './locales/tr.json';
import ua from './locales/ua.json';
import ar from './locales/ae.json';
import pl from './locales/pl.json';
import router from './router';

const getLocaleFromPath = () => {
  const path = window.location.pathname;
  const match = path.match(/^\/([a-z]{2})/);
  return match ? match[1] : null;
};

const localeFromPath = getLocaleFromPath();
const savedLocale = localStorage.getItem('nwLocale');
const defaultLocale = 'en';
const locale = localeFromPath || savedLocale || defaultLocale;

const i18n = createI18n({
  legacy: false,
  locale: locale, // Default locale
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { en, ru, tr ,ua, it, de, no, ja, fr, es, sv, pt, ar, pl }
});

router.beforeEach((to, from, next) => {
  const locale = to.params.locale || savedLocale || defaultLocale;

  if (!to.params.locale) {
    const newPath = `/${locale}${to.path}`;
    next({ path: newPath, replace: true });
  } else {
    i18n.global.locale = locale;
    localStorage.setItem('nwLocale', locale);
    next();
  }
});

export default i18n;
