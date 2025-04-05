import React, { useEffect, useState } from 'react';
import { Agent } from './types';
import { TrafficController } from './agents/TrafficController';
import { EmergencyResponder } from './agents/EmergencyResponder';
import { MaintenanceUnit } from './agents/MaintenanceUnit';
import AgentCard from './components/AgentCard';
import { Activity, AlertTriangle, PenTool as Tool, BarChart3 } from 'lucide-react';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [systemUptime, setSystemUptime] = useState(0);

  useEffect(() => {
    // Initialize agents
    const trafficController = new TrafficController('tc1', { x: 0, y: 0 });
    const emergencyResponder = new EmergencyResponder('er1', { x: 10, y: 10 });
    const maintenanceUnit = new MaintenanceUnit('mu1', { x: 20, y: 20 });

    setAgents([
      trafficController.getState(),
      emergencyResponder.getState(),
      maintenanceUnit.getState(),
    ]);

    // Update agents every 3 seconds
    const interval = setInterval(() => {
      setAgents([
        trafficController.update(),
        emergencyResponder.update(),
        maintenanceUnit.update(),
      ]);
      setSystemUptime(prev => prev + 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTotalCollaborations = () => {
    return agents.reduce((total, agent) => total + agent.collaborations.length, 0);
  };

  const getAveragePerformance = () => {
    return agents.length
      ? Math.round(
          agents.reduce((total, agent) => total + agent.performance, 0) / agents.length
        )
      : 0;
  };

  const formatUptime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Smart City Multi-Agent System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
      
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">Active Agents</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-2">{agents.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-700">System Uptime</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{formatUptime(systemUptime)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <Tool className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-700">Collaborations</h3>
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">{getTotalCollaborations()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-700">Avg Performance</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 mt-2">{getAveragePerformance()}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;