defineRuntimeBundle(({ ui }) => ({
  id: 'vm-ui-card-example',
  title: 'VM UI Card Example',
  packageIds: ['ui'],
  surfaces: {
    home: {
      packId: 'ui.card.v1',
      render({ state }) {
        return ui.panel([
          ui.text('Hello from QuickJS'),
          ui.text('This UI tree was produced by a sandboxed runtime bundle, not by React JSX.'),
          ui.row([
            ui.badge('package: ui'),
            ui.badge('surface: ui.card.v1'),
            ui.badge('status: ' + state.ui.runtimeStatus),
          ]),
          ui.table(
            [
              ['bundle', state.self.bundleId],
              ['session', state.self.sessionId],
              ['surface', state.self.surfaceId],
            ],
            { headers: ['Field', 'Value'] },
          ),
        ]);
      },
    },
  },
}));
