import type { ReactNode } from 'react';
import './exampleFrame.css';

export interface ExampleFrameProps {
  stage: string;
  title: string;
  subtitle: string;
  packageFocus: string[];
  children: ReactNode;
}

export function ExampleFrame({ stage, title, subtitle, packageFocus, children }: ExampleFrameProps) {
  return (
    <main className="example-frame">
      <header className="example-frame__header">
        <div>
          <p className="example-frame__stage">{stage}</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <ul className="example-frame__packages" aria-label="Package focus">
          {packageFocus.map((pkg) => (
            <li key={pkg}>{pkg}</li>
          ))}
        </ul>
      </header>
      <section className="example-frame__body">{children}</section>
    </main>
  );
}
