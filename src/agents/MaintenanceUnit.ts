import { Agent, AgentType, Location } from '../types';

export class MaintenanceUnit {
  private agent: Agent;

  constructor(id: string, location: Location) {
    this.agent = {
      id,
      type: 'MaintenanceUnit' as AgentType,
      status: 'Idle',
      location,
      logs: [],
      performance: 100,
      collaborations: [],
      resources: [
        { name: 'Repair Tools', status: 'available', priority: 1 },
        { name: 'Maintenance Vehicles', status: 'available', priority: 2 },
        { name: 'Spare Parts', status: 'available', priority: 3 }
      ]
    };
  }

  public update(): Agent {
    const actions = [
      'Repairing signals',
      'Installing sensors',
      'Maintaining infrastructure',
      'Preventive maintenance',
      'Equipment upgrade'
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    // Simulate resource usage
    this.updateResources();
    
    // Simulate collaboration
    if (Math.random() > 0.7) {
      this.agent.collaborations.push({
        withAgent: 'TrafficController',
        task: 'Signal system upgrade',
        status: 'active'
      });
    }
    
    this.agent.currentTask = randomAction;
    this.agent.status = 'Working';
    this.agent.performance = Math.min(100, this.agent.performance + Math.random() * 10);
    
    this.agent.logs.push({
      timestamp: Date.now(),
      message: `Maintenance Unit: ${randomAction}`,
      type: 'info'
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