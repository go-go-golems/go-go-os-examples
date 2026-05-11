import { registerRuntimePackage, registerRuntimeSurfaceType } from '@go-go-golems/os-scripting';
import { UI_CARD_V1_RUNTIME_SURFACE_TYPE, UI_RUNTIME_PACKAGE } from '@go-go-golems/os-ui-cards';
import { KANBAN_RUNTIME_PACKAGE, KANBAN_V1_RUNTIME_SURFACE_TYPE } from '@go-go-golems/os-kanban';

let registered = false;

export function registerExampleRuntimePackages() {
  if (registered) return;
  registered = true;

  registerRuntimePackage(UI_RUNTIME_PACKAGE);
  registerRuntimeSurfaceType(UI_CARD_V1_RUNTIME_SURFACE_TYPE);
  registerRuntimePackage(KANBAN_RUNTIME_PACKAGE);
  registerRuntimeSurfaceType(KANBAN_V1_RUNTIME_SURFACE_TYPE);
}
