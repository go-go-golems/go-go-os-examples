import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import '@go-go-golems/os-widgets/theme';
import { ExampleWorkspaceApp } from './ExampleWorkspaceApp';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root element');
}

createRoot(root).render(
  <StrictMode>
    <div data-widget="hypercard" className="theme-macos1 app-root">
      <ExampleWorkspaceApp />
    </div>
  </StrictMode>,
);
