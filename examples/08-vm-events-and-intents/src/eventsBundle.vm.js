defineRuntimeBundle(({ ui }) => ({
  id: 'vm-events-example',
  title: 'VM Events Example',
  packageIds: ['ui'],
  initialSurfaceState: {
    home: {
      count: 0,
      label: 'first draft value',
    },
  },
  surfaces: {
    home: {
      packId: 'ui.card.v1',
      render({ state }) {
        const count = Number(state.draft.count || 0);
        return ui.panel([
          ui.text('VM events and local runtime state'),
          ui.text('Count stored in runtime surface draft: ' + count),
          ui.input(String(state.draft.label || ''), {
            placeholder: 'Edit draft label',
            onChange: { handler: 'setLabel' },
          }),
          ui.row([
            ui.button('Increment in VM', { variant: 'primary', onClick: { handler: 'increment' } }),
            ui.button('Reset draft', { onClick: { handler: 'reset' } }),
            ui.button('Notify host', { onClick: { handler: 'notify' } }),
          ]),
          ui.text('Draft label: ' + String(state.draft.label || '')),
          ui.text('These buttons execute QuickJS handlers that dispatch validated runtime actions.'),
        ]);
      },
      handlers: {
        increment(ctx) {
          const current = Number(ctx.state.draft.count || 0);
          ctx.dispatch({ type: 'draft.patch', payload: { count: current + 1 } });
        },
        setLabel(ctx, args) {
          ctx.dispatch({ type: 'draft.patch', payload: { label: String(args && args.value || '') } });
        },
        reset(ctx) {
          ctx.dispatch({ type: 'draft.patch', payload: { count: 0, label: 'reset by VM handler' } });
        },
        notify(ctx) {
          ctx.dispatch({ type: 'notify.show', payload: { message: 'Notification dispatched from QuickJS' } });
        },
      },
    },
  },
}));
