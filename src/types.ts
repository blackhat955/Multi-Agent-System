export interface Agent {
  id: string;
  type: AgentType;
  status: AgentStatus;
  currentTask?: string;
  location: Location;
  logs: AgentLog[];
  performance: number;
  collaborations: Collaboration[];
  resources: Resource[];
}

export interface AgentLog {
  timestamp: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface Location {
  x: number;
  y: number;
}

export interface Collaboration {
  withAgent: string;
  task: string;
  status: 'pending' | 'active' | 'completed';
}

export interface Resource {
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
  priority: number;
}

export type AgentType = 'TrafficController' | 'EmergencyResponder' | 'MaintenanceUnit';
export type AgentStatus = 'Idle' | 'Working' | 'Responding' | 'Completed';