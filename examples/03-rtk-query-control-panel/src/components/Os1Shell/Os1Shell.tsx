import type { ReactNode } from 'react';
import { WidgetStatusBar } from '@go-go-golems/os-widgets';
import './Os1Shell.css';

export interface Os1ShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Os1Shell({ title, subtitle, children, footer }: Os1ShellProps) {
  return (
    <div data-widget="hypercard" className="theme-macos1 os1-desktop">
      <section className="os1-window" aria-label={title}>
        <header className="os1-titlebar">
          <span className="os1-titlebar__close" aria-hidden="true" />
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        </header>
        <div className="os1-window__body">{children}</div>
        {footer ? <WidgetStatusBar>{footer}</WidgetStatusBar> : null}
      </section>
    </div>
  );
}
