import React from 'react';
import { Agent } from '../types';
import { Activity, AlertTriangle, PenTool as Tool, Users, Box, Gauge } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getIcon = () => {
    switch (agent.type) {
      case 'TrafficController':
        return <Activity className="w-8 h-8 text-blue-500" />;
      case 'EmergencyResponder':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'MaintenanceUnit':
        return <Tool className="w-8 h-8 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case 'Idle':
        return 'bg-gray-200 text-gray-700';
      case 'Working':
        return 'bg-blue-200 text-blue-700';
      case 'Responding':
        return 'bg-red-200 text-red-700';
      case 'Completed':
        return 'bg-green-200 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">{getIcon()}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{agent.type}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {agent.status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Performance</div>
          <div className="text-2xl font-bold text-indigo-600">{Math.round(agent.performance)}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">Current Task</h4>
          </div>
          <p className="text-gray-600">{agent.currentTask || 'No active task'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">Collaborations</h4>
          </div>
          <div className="space-y-2">
            {agent.collaborations.slice(-2).map((collab, index) => (
              <div key={index} className="bg-white p-2 rounded border border-gray-200">
                <div className="text-sm font-medium text-gray-700">{collab.task}</div>
                <div className="text-xs text-gray-500">with {collab.withAgent}</div>
              </div>
            ))}
            {agent.collaborations.length === 0 && (
              <p className="text-sm text-gray-500">No active collaborations</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">Resources</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {agent.resources.map((resource, index) => (
              <div
                key={index}
                className={`p-2 rounded text-sm ${
                  resource.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : resource.status === 'in-use'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {resource.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-700">Recent Logs</h4>
          </div>
          <div className="space-y-2">
            {agent.logs.slice(-3).map((log, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded ${
                  log.type === 'warning'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;