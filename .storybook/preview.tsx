import type { Preview } from '@storybook/react-vite';
import '@go-go-golems/os-core/theme';
import '@go-go-golems/os-core/desktop-theme-macos1';
import '@go-go-golems/os-widgets/theme';
import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div data-widget="hypercard" className="theme-macos1 app-root" style={{ minHeight: '100vh', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
