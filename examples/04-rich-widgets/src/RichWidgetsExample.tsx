import { useMemo, useState } from 'react';
import { Btn, Chip, TabControl } from '@go-go-golems/os-core';
import {
  ChartView,
  DATASET_NAMES,
  LogViewer,
  SAMPLE_DATASETS,
  WidgetStatusBar,
  WidgetToolbar,
  generateSampleLogs,
} from '@go-go-golems/os-widgets';
import { ExampleFrame } from '../../shared/src';
import './RichWidgetsExample.css';

const tabs = ['ChartView', 'LogViewer'];

export function RichWidgetsExample() {
  const [tab, setTab] = useState(0);
  const logs = useMemo(() => generateSampleLogs(18), []);
  const datasetName = DATASET_NAMES[0] ?? Object.keys(SAMPLE_DATASETS)[0];
  const dataset = datasetName ? SAMPLE_DATASETS[datasetName] : undefined;

  return (
    <ExampleFrame
      stage="04"
      title="Rich widgets showcase"
      subtitle="A higher-level package stage that uses complete widgets and sample-data helpers from @go-go-golems/os-widgets."
      packageFocus={['@go-go-golems/os-core', '@go-go-golems/os-widgets']}
    >
      <div className="rich-widgets example-card">
        <WidgetToolbar>
          <Btn isDefault onClick={() => setTab(0)}>Charts</Btn>
          <Btn onClick={() => setTab(1)}>Logs</Btn>
          <Chip>larger widget surface</Chip>
        </WidgetToolbar>

        <TabControl tabs={tabs} activeTab={tab} onTabChange={setTab}>
          <div className="rich-widgets__panel">
            {tab === 0 && dataset ? (
              <ChartView
                title={`Dataset: ${datasetName}`}
                data={dataset}
                datasets={SAMPLE_DATASETS}
                width={860}
                height={360}
                availableTypes={['line', 'bar', 'scatter']}
              />
            ) : null}
            {tab === 1 ? <LogViewer initialLogs={logs} streaming={false} /> : null}
          </div>
        </TabControl>

        <WidgetStatusBar>
          {tab === 0
            ? 'ChartView demonstrates rich widget rendering with package sample data.'
            : 'LogViewer demonstrates a stateful operational widget without app-specific code.'}
        </WidgetStatusBar>
      </div>
    </ExampleFrame>
  );
}
