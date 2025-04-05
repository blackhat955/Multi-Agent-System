import { Agent, AgentType, Location, Resource } from '../types';

export class TrafficController {
  private agent: Agent;

  constructor(id: string, location: Location) {
    this.agent = {
      id,
      type: 'TrafficController' as AgentType,
      status: 'Idle',
      location,
      logs: [],
      performance: 100,
      collaborations: [],
      resources: [
        { name: 'Traffic Signals', status: 'available', priority: 1 },
        { name: 'Sensors Network', status: 'available', priority: 2 },
        { name: 'Communication System', status: 'available', priority: 3 }
      ]
    };
  }

  public update(): Agent {
    const actions = ['Adjusting signals', 'Monitoring flow', 'Optimizing routes', 'Coordinating with emergency services'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    // Simulate resource usage
    this.updateResources();
    
    // Simulate collaboration
    if (Math.random() > 0.7) {
      this.agent.collaborations.push({
        withAgent: 'EmergencyResponder',
        task: 'Emergency route clearance',
        status: 'active'
      });
    }
    
    this.agent.currentTask = randomAction;
    this.agent.status = 'Working';
    this.agent.performance = Math.min(100, this.agent.performance + Math.random() * 10);
    
    this.agent.logs.push({
      timestamp: Date.now(),
      message: `Traffic Controller: ${randomAction}`,
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