import { useMemo, useState } from 'react';
import { Btn, Chip } from '@go-go-golems/os-core';
import {
  BUILTIN_DEMO_REPL_DRIVER,
  MacRepl,
  type ReplDriver,
  type ReplEffect,
  type TerminalLine,
} from '@go-go-golems/os-repl';
import { WidgetStatusBar, WidgetToolbar } from '@go-go-golems/os-widgets';
import '@go-go-golems/os-repl/theme';
import { ExampleFrame } from '../../shared/src';
import './ReplConsoleExample.css';

const initialLines: TerminalLine[] = [
  { type: 'system', text: 'go-go-os repl console example' },
  { type: 'output', text: 'Try: help, status, open notes, effect ping, fortune, clear' },
];

function createExampleDriver(onEffectCommand: (message: string) => void): ReplDriver {
  return {
    async execute(raw, context) {
      const input = raw.trim();
      const lower = input.toLowerCase();

      if (!input) {
        return { lines: [] };
      }

      if (lower === 'status') {
        return {
          lines: [
            { type: 'output', text: `history entries: ${context.historyStack.length}` },
            { type: 'output', text: `uptime: ${Math.round(context.uptimeMs / 1000)}s` },
            { type: 'output', text: `prompt: ${context.envVars.REPL_PROMPT ?? '⌘'}` },
          ],
        };
      }

      if (lower === 'open notes') {
        return {
          lines: [{ type: 'output', text: 'requesting shell action: open notes window' }],
          effects: [{ type: 'open-window', payload: { appId: 'notes' } }],
        };
      }

      if (lower === 'effect ping') {
        onEffectCommand('received ping effect from custom driver');
        return {
          lines: [{ type: 'output', text: 'effect dispatched to host React component' }],
          effects: [{ type: 'host-message', payload: 'ping' }],
        };
      }

      return BUILTIN_DEMO_REPL_DRIVER.execute(raw, context);
    },

    getCompletions(input, context) {
      const builtIns = BUILTIN_DEMO_REPL_DRIVER.getCompletions?.(input, context) ?? [];
      const custom = ['status', 'open notes', 'effect ping']
        .filter((value) => value.startsWith(input.toLowerCase()))
        .map((value) => ({ value, detail: 'example command' }));
      return [...custom, ...builtIns];
    },

    getHelp(topic, context) {
      if (topic === 'example' || topic === 'status' || topic === 'open') {
        return [
          { title: 'status', detail: 'Print host-derived REPL status.', usage: 'status' },
          { title: 'open notes', detail: 'Emit an effect a shell host could translate into opening a window.', usage: 'open notes' },
          { title: 'effect ping', detail: 'Send a host-message effect to the surrounding React component.', usage: 'effect ping' },
        ];
      }
      return BUILTIN_DEMO_REPL_DRIVER.getHelp?.(topic, context) ?? null;
    },
  };
}

export function ReplConsoleExample() {
  const [effects, setEffects] = useState<ReplEffect[]>([]);
  const [hostMessage, setHostMessage] = useState('No host effect received yet.');

  const driver = useMemo(
    () => createExampleDriver((message) => setHostMessage(message)),
    [],
  );

  return (
    <ExampleFrame
      stage="06"
      title="REPL console"
      subtitle="A public-package validation stage for MacRepl, custom drivers, completions, help, and host effects."
      packageFocus={['@go-go-golems/os-repl', '@go-go-golems/os-core']}
    >
      <div className="repl-console example-card">
        <WidgetToolbar>
          <Chip>@go-go-golems/os-repl</Chip>
          <Chip>MacRepl</Chip>
          <Btn onClick={() => setEffects([])}>Clear Host Effects</Btn>
        </WidgetToolbar>

        <div className="repl-console__grid">
          <section className="repl-console__terminal" aria-label="REPL terminal">
            <MacRepl
              prompt="λ"
              initialLines={initialLines}
              driver={driver}
              onEffects={(nextEffects) => setEffects((current) => [...nextEffects, ...current].slice(0, 8))}
            />
          </section>

          <aside className="repl-console__notes example-stack">
            <h2>What this validates</h2>
            <p>
              This stage imports the REPL directly from the public package and uses a custom driver on top of the built-in demo
              commands. It proves that consumers can keep the package standalone or wire effects into a surrounding shell host.
            </p>
            <div className="repl-console__command-list">
              <code>status</code>
              <code>open notes</code>
              <code>effect ping</code>
              <code>fortune</code>
              <code>help example</code>
            </div>
            <WidgetStatusBar>{hostMessage}</WidgetStatusBar>
            <h3>Recent effects</h3>
            {effects.length === 0 ? (
              <p>No effects yet.</p>
            ) : (
              <ul className="repl-console__effects">
                {effects.map((effect, index) => (
                  <li key={`${effect.type}-${index}`}>
                    <strong>{effect.type}</strong>
                    {effect.payload !== undefined ? <span>{JSON.stringify(effect.payload)}</span> : null}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </ExampleFrame>
  );
}
