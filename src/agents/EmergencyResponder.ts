import { Agent, AgentType, Location } from '../types';

export class EmergencyResponder {
  private agent: Agent;

  constructor(id: string, location: Location) {
    this.agent = {
      id,
      type: 'EmergencyResponder' as AgentType,
      status: 'Idle',
      location,
      logs: [],
      performance: 100,
      collaborations: [],
      resources: [
        { name: 'Emergency Vehicles', status: 'available', priority: 1 },
        { name: 'Medical Equipment', status: 'available', priority: 2 },
        { name: 'Communication Devices', status: 'available', priority: 3 }
      ]
    };
  }

  public update(): Agent {
    const actions = [
      'Patrolling area',
      'Responding to incident',
      'Coordinating with units',
      'Emergency evacuation',
      'Medical response'
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    // Simulate resource usage
    this.updateResources();
    
    // Simulate collaboration
    if (Math.random() > 0.7) {
      this.agent.collaborations.push({
        withAgent: 'MaintenanceUnit',
        task: 'Infrastructure emergency repair',
        status: 'pending'
      });
    }
    
    this.agent.currentTask = randomAction;
    this.agent.status = 'Responding';
    this.agent.performance = Math.min(100, this.agent.performance + Math.random() * 10);
    
    this.agent.logs.push({
      timestamp: Date.now(),
      message: `Emergency Responder: ${randomAction}`,
      type: 'warning'
    });

    return this.agent;
  }

  private updateResources() {
    this.agent.resources = this.agent.resources.map(resource => ({
      ...resource,
      status: Math.random() > 0.8 ? 'in-use' : 'available'
    }));
  }

  public getState(): Agent {
    return this.agent;
  }
}