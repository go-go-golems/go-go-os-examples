import { Btn, Chip } from '@go-go-golems/os-core';
import { ExampleFrame } from '../../shared/src';
import './ThemeSmokeExample.css';

export function ThemeSmokeExample() {
  return (
    <ExampleFrame
      stage="00"
      title="Theme smoke test"
      subtitle="The smallest useful standalone consumer: import the public CSS entrypoints and wrap the app in the OS1 theme root."
      packageFocus={['@go-go-golems/os-core/theme', '@go-go-golems/os-core/desktop-theme-macos1']}
    >
      <div className="theme-smoke example-card">
        <div className="theme-smoke__window">
          <div className="theme-smoke__titlebar">
            <span>Theme Contract</span>
            <Chip>theme-macos1</Chip>
          </div>
          <div className="theme-smoke__content">
            <p>
              If this panel has a bordered desktop-window appearance, the consumer has imported the theme entrypoints and
              applied <code>data-widget="hypercard"</code> plus <code>className="theme-macos1"</code> at the root.
            </p>
            <div className="theme-smoke__actions">
              <Btn isDefault>Default Button</Btn>
              <Btn>Secondary Button</Btn>
            </div>
          </div>
        </div>
      </div>
    </ExampleFrame>
  );
}
