import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: string;
  type: 'instance' | 'storage' | 'network' | 'database';
  title: string;
  description: string;
  potentialSavings: number;
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
}

interface ResourceOptimizationProps {
  recommendations: Recommendation[];
}

const ResourceOptimization: React.FC<ResourceOptimizationProps> = ({ recommendations }) => {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.slice(0, 5).map((rec) => (
        <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                {getRiskIcon(rec.risk)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm font-medium text-green-600">
                  Economia: R$ {rec.potentialSavings.toLocaleString()}
                </span>
                <span className={`status-badge ${getRiskColor(rec.risk)}`}>
                  Risco {rec.risk}
                </span>
                <span className={`status-badge ${getStatusColor(rec.status)}`}>
                  {rec.status}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <button className="btn-primary text-xs">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {recommendations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-400 mb-4" />
          <p>Nenhuma otimização recomendada no momento</p>
        </div>
      )}
    </div>
  );
};

export default ResourceOptimization;
