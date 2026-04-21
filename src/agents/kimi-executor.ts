/**
 * Kimi Executor Agent - Task Execution via Kimi CLI
 *
 * A specialist executor that leverages the Kimi CLI (`kimi --print`) as its
 * primary execution engine for complex implementation and analysis tasks,
 * while retaining direct file-editing capabilities for integration and
 * verification.
 *
 * Prompt loaded from: agents/kimi-executor.md
 */

import type { AgentConfig, AgentPromptMetadata } from './types.js';
import { loadAgentPrompt } from './utils.js';

export const KIMI_EXECUTOR_PROMPT_METADATA: AgentPromptMetadata = {
  category: 'specialist',
  cost: 'CHEAP',
  promptAlias: 'KimiExec',
  triggers: [
    { domain: 'Implementation tasks', trigger: 'Code changes, feature implementation, refactoring' },
    { domain: 'Bug fixes', trigger: 'Clear, scoped fixes where Kimi analysis helps' },
    { domain: 'Complex analysis', trigger: 'Multi-file reasoning, pattern detection' },
  ],
  useWhen: [
    'Tasks where Kimi CLI may provide better results for specific languages or frameworks',
    'Implementation work that benefits from an external reasoning pass before editing',
    'Debugging or analysis where a second model perspective is valuable',
    'Direct, focused implementation tasks with fallback to local file editing',
  ],
  avoidWhen: [
    'Simple file edits faster done directly (use executor)',
    'Tasks requiring only internal codebase search (use explore)',
    'Tasks requiring deep architectural decisions (consult architect first)',
  ],
};

export const kimiExecutorAgent: AgentConfig = {
  name: 'kimi-executor',
  description: 'Task executor powered by Kimi CLI. Uses `kimi --print` for complex analysis and implementation, with direct file-editing fallback. For tasks where Kimi\'s reasoning complements or outperforms direct editing.',
  prompt: loadAgentPrompt('kimi-executor'),
  model: 'sonnet',
  defaultModel: 'sonnet',
  metadata: KIMI_EXECUTOR_PROMPT_METADATA
};
