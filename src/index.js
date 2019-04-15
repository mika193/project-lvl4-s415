import 'bootstrap/dist/css/bootstrap.min.css';
import initApp from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

initApp(window.gon);
