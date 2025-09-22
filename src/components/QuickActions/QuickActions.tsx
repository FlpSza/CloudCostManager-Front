import React from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  DocumentArrowDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'schedule-optimization',
      title: 'Agendar Otimização',
      description: 'Executar otimizações automáticas',
      icon: PlayIcon,
      color: 'blue',
    },
    {
      id: 'pause-automation',
      title: 'Pausar Automação',
      description: 'Temporariamente desabilitar automações',
      icon: PauseIcon,
      color: 'yellow',
    },
    {
      id: 'export-report',
      title: 'Exportar Relatório',
      description: 'Baixar relatório mensal',
      icon: DocumentArrowDownIcon,
      color: 'green',
    },
    {
      id: 'configure-alerts',
      title: 'Configurar Alertas',
      description: 'Definir limites de custo',
      icon: ExclamationTriangleIcon,
      color: 'red',
    },
  ];

  const handleAction = (actionId: string) => {
    console.log(`Executing action: ${actionId}`);
    // Implementar lógica de ação
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                action.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                action.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-red-100 text-red-600'
              }`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
