export type AgentRole = 
  | 'CEO' 
  | 'Lead Dev' 
  | 'Sr. FS' 
  | 'Infra' 
  | 'Research' 
  | 'QA/CR' 
  | 'Backend' 
  | 'Content' 
  | 'SRE' 
  | 'Frontend';

export type AgentModel = 'MiniMax M2.5' | 'Kimi K2.5';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  model: AgentModel;
  description: string;
  color: string;
  icon: string;
}

export const agents: Agent[] = [
  {
    id: 'arya',
    name: 'Arya',
    role: 'CEO',
    model: 'MiniMax M2.5',
    description: 'Orchestrates the entire OpenClaw ecosystem and strategic decisions',
    color: '#ef4444',
    icon: 'lobster',
  },
  {
    id: 'koda',
    name: 'Koda',
    role: 'Lead Dev',
    model: 'Kimi K2.5',
    description: 'Plans architecture and coordinates feature development across teams',
    color: '#3b82f6',
    icon: 'bot',
  },
  {
    id: 'kaan',
    name: 'Kaan',
    role: 'Sr. FS',
    model: 'Kimi K2.5',
    description: 'Full-stack feature development and code implementation',
    color: '#eab308',
    icon: 'zap',
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Infra',
    model: 'Kimi K2.5',
    description: 'Deployment automation and infrastructure management',
    color: '#22c55e',
    icon: 'globe',
  },
  {
    id: 'defne',
    name: 'Defne',
    role: 'Research',
    model: 'MiniMax M2.5',
    description: 'Technical research and solution exploration',
    color: '#a855f7',
    icon: 'search',
  },
  {
    id: 'sinan',
    name: 'Sinan',
    role: 'QA/CR',
    model: 'MiniMax M2.5',
    description: 'Quality assurance and code review specialist',
    color: '#6366f1',
    icon: 'shield',
  },
  {
    id: 'elif',
    name: 'Elif',
    role: 'Backend',
    model: 'Kimi K2.5',
    description: 'Server-side development and API design',
    color: '#06b6d4',
    icon: 'code',
  },
  {
    id: 'deniz',
    name: 'Deniz',
    role: 'Content',
    model: 'MiniMax M2.5',
    description: 'Content creation and documentation writing',
    color: '#f97316',
    icon: 'pen-tool',
  },
  {
    id: 'onur',
    name: 'Onur',
    role: 'SRE',
    model: 'MiniMax M2.5',
    description: 'Site reliability engineering and system monitoring',
    color: '#14b8a6',
    icon: 'refresh-cw',
  },
  {
    id: 'mert',
    name: 'Mert',
    role: 'Frontend',
    model: 'MiniMax M2.5',
    description: 'UI/UX implementation and component development',
    color: '#ec4899',
    icon: 'palette',
  },
];

// Dynamic counts - never hardcoded
export const agentCount = agents.length;
export const agentsByModel = {
  minimax: agents.filter(a => a.model === 'MiniMax M2.5'),
  kimi: agents.filter(a => a.model === 'Kimi K2.5'),
};
