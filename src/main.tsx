import { StrictMode } from 'react'; // Находит ошибки в компонентах, на ранних этапах разработки
import { createRoot } from 'react-dom/client'; // Отображает компоненты react.js
import { BrowserRouter } from 'react-router-dom'; // Обеспечивает самые чистые URL-адреса
import App from './App'; // Наше приложение
import { store } from './redux/store'; // Хранилище данных(память аппки или библиотека 'js')
import { Provider } from 'react-redux'; // Помогает react-у дружить с redux-ом(библиотека 'react')

// *** ВОТ ИСПРАВЛЕНИЕ ***
// Добавляем ! после getElementById('root')
const root = createRoot(document.getElementById('root')!);

root.render(
  <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
);

//<StrictMode>add at the end</StrictMode>
