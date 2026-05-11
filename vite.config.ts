import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const vmRuntimePackages = [
  '@go-go-golems/os-scripting',
  '@go-go-golems/os-ui-cards',
  '@go-go-golems/os-kanban',
];

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: vmRuntimePackages,
    include: ['debug'],
  },
});
