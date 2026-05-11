import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ControlPanelApp } from './features/ControlPanelApp';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root element');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ControlPanelApp />
    </Provider>
  </StrictMode>,
);
