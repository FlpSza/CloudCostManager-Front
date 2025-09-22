import React from 'react';
import useSWR from 'swr';
import { apiClient } from '../../services/apiClient';

const CostAnalysis: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    '/api/cost-analysis/trends',
    (url) => apiClient.get(url).then(res => res.data)
  );

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-gray-200 rounded"></div>;
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar análise de custos</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Análise de Custos</h1>
      <div className="card">
        <p>Análise detalhada de custos em desenvolvimento...</p>
      </div>
    </div>
  );
};

export default CostAnalysis;
