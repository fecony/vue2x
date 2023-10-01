import type { State as TaskState } from './modules/task/state';
import type { State as UiState } from './modules/ui/state';

export interface RootState {
  task: TaskState;
  ui: UiState;
}
