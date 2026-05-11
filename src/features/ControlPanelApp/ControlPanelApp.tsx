import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import { Btn } from '@go-go-golems/os-core';

export function ControlPanelApp() {
  return (
    <div data-widget="hypercard" className="theme-macos1 app-root">
      <main className="app-window">
        <header className="app-title-bar">Go-Go OS1 Component Lab</header>
        <section className="app-content">
          <p>Standalone React app using published @go-go-golems packages.</p>
          <Btn isDefault>It works</Btn>
        </section>
      </main>
    </div>
  );
}
