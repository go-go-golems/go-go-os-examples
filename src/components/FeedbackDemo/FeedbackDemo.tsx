import { useState } from 'react';
import { AlertDialog, Btn, Toast } from '@go-go-golems/os-core';
import './FeedbackDemo.css';

export function FeedbackDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <section className="feedback-demo">
      <div className="feedback-demo__actions">
        <Btn onClick={() => setToast('Settings saved to local RTK Query cache.')}>Show Toast</Btn>
        <Btn isDefault onClick={() => setShowAlert(true)}>Show Alert</Btn>
      </div>
      {showAlert ? (
        <AlertDialog
          type="note"
          message="This dialog comes from @go-go-golems/os-core and is styled by the OS1 theme."
          actions={[{ label: 'OK', isDefault: true, onClick: () => setShowAlert(false) }]}
        />
      ) : null}
      {toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null}
    </section>
  );
}
