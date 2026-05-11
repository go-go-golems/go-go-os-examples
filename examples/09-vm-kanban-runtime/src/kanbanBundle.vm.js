defineRuntimeBundle(({ widgets }) => ({
  id: 'vm-kanban-example',
  title: 'VM Kanban Example',
  packageIds: ['ui', 'kanban'],
  surfaces: {
    board: {
      packId: 'kanban.v1',
      render() {
        return widgets.kanban.page(
          widgets.kanban.taxonomy({
            issueTypes: [
              { id: 'task', label: 'Task', icon: '□' },
              { id: 'bug', label: 'Bug', icon: '!' },
            ],
            priorities: [
              { id: 'high', label: 'High', color: '#c33' },
              { id: 'medium', label: 'Medium', color: '#b77' },
            ],
            labels: [
              { id: 'runtime', label: 'Runtime' },
              { id: 'docs', label: 'Docs' },
            ],
          }),
          widgets.kanban.header({
            title: 'VM-authored Kanban',
            subtitle: 'The board schema is returned by QuickJS and rendered by @go-go-golems/os-kanban.',
          }),
          widgets.kanban.highlights({
            items: [
              { id: 'published', label: 'Packages', value: '5', caption: 'published to npm' },
              { id: 'surfaces', label: 'Surface type', value: 'kanban.v1', caption: 'registered in host' },
            ],
          }),
          widgets.kanban.board({
            columns: [
              { id: 'todo', title: 'Todo', icon: '□' },
              { id: 'doing', title: 'Doing', icon: '◇' },
              { id: 'done', title: 'Done', icon: '✓' },
            ],
            tasks: [
              {
                id: 't1',
                col: 'done',
                title: 'Publish VM packages',
                type: 'task',
                labels: ['runtime'],
                priority: 'high',
                desc: 'os-scripting, os-ui-cards, and os-kanban are consumed from npm.',
              },
              {
                id: 't2',
                col: 'doing',
                title: 'Build staged VM examples',
                type: 'task',
                labels: ['docs'],
                priority: 'medium',
                desc: 'Progressive examples teach ui.card.v1 events before kanban.v1.',
              },
              {
                id: 't3',
                col: 'todo',
                title: 'Add browser regression',
                type: 'bug',
                labels: ['runtime'],
                priority: 'medium',
                desc: 'Automate the smoke checks for runtime package registration.',
              },
            ],
            editingTask: null,
            collapsedCols: {},
            emptyColumnMessage: 'No runtime tasks in this column.',
          }),
          widgets.kanban.status({
            metrics: [
              { label: 'Runtime packages', value: 2 },
              { label: 'VM surfaces', value: 1 },
              { label: 'Host renderer', value: 'kanban.v1' },
            ],
          }),
        );
      },
    },
  },
}));
