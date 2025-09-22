import React from 'react';
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  type: 'cost_spike' | 'orphaned_resource' | 'underutilized' | 'oversized';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  resolved: boolean;
}

interface RecentAlertsProps {
  alerts: Alert[];
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cost_spike':
        return 'Pico de Custo';
      case 'orphaned_resource':
        return 'Recurso Órfão';
      case 'underutilized':
        return 'Subutilizado';
      case 'oversized':
        return 'Superdimensionado';
      default:
        return type;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alertas Recentes</h3>
        <span className="text-sm text-gray-500">{alerts.length} alertas</span>
      </div>
      
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border ${
            alert.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start space-x-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <span className={`status-badge ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="status-badge bg-gray-100 text-gray-800">
                    {getTypeLabel(alert.type)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(alert.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
              {!alert.resolved && (
                <button className="btn-primary text-xs">
                  Resolver
                </button>
              )}
            </div>
          </div>
        ))}
        
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400 mb-4" />
            <p>Nenhum alerta ativo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;

