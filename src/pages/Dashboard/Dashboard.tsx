import React from 'react';
import useSWR from 'swr';
import { 
  CurrencyDollarIcon, 
  ArrowTrendingDownIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Components
import MetricCard from '../../components/MetricCard/MetricCard';
import CostChart from '../../components/Charts/CostChart';
import ResourceOptimization from '../../components/ResourceOptimization/ResourceOptimization';
import RecentAlerts from '../../components/RecentAlerts/RecentAlerts';
import QuickActions from '../../components/QuickActions/QuickActions';

// Store
import { useAppStore } from '../../store/useAppStore';

// Services
import { apiClient } from '../../services/apiClient';

const Dashboard: React.FC = () => {
  const { selectedPeriod, selectedCloudProvider } = useAppStore();
  
  const { data: dashboardData, error, isLoading } = useSWR(
    `/api/dashboard?period=${selectedPeriod}&cloudProvider=${selectedCloudProvider}`,
    (url: any) => apiClient.get(url).then(res => res.data),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Erro ao carregar dados</h3>
        <p className="mt-1 text-sm text-gray-500">Tente recarregar a página</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 btn-primary"
        >
          Recarregar
        </button>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Custo Total Mensal',
      value: `R$ ${dashboardData?.totalCost?.toLocaleString() || '0'}`,
      change: `-${dashboardData?.costReduction || 0}%`,
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
      color: 'blue',
    },
    {
      title: 'Economia Projetada',
      value: `R$ ${dashboardData?.projectedSavings?.toLocaleString() || '0'}`,
      change: `+${dashboardData?.savingsIncrease || 0}%`,
      changeType: 'positive' as const,
      icon: ArrowTrendingDownIcon,
      color: 'green',
    },
    {
      title: 'Recursos Otimizados',
      value: `${dashboardData?.optimizedResources || 0}`,
      change: `${dashboardData?.optimizationRate || 0}%`,
      changeType: 'positive' as const,
      icon: CheckCircleIcon,
      color: 'purple',
    },
    {
      title: 'Alertas Ativos',
      value: `${dashboardData?.activeAlerts || 0}`,
      change: `${dashboardData?.alertsResolved || 0} resolvidos`,
      changeType: 'neutral' as const,
      icon: ExclamationTriangleIcon,
      color: 'red',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Visão geral dos custos e otimizações em tempo real
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            Última atualização: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color as "blue" | "green" | "purple" | "red" | "yellow"}
          />
        ))}
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Trend Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tendência de Custos (Últimos 30 dias)
          </h3>
          <CostChart data={dashboardData?.costTrend || []} />
        </div>

        {/* Resource Optimization */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Otimizações Recomendadas
          </h3>
          <ResourceOptimization recommendations={dashboardData?.recommendations || []} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <RecentAlerts alerts={dashboardData?.recentAlerts || []} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* ROI Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">ROI do Sistema</h3>
            <p className="text-green-100 mt-1">
              Retorno de investimento de <span className="font-bold">2400%</span> no primeiro mês
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">R$ 12k</div>
            <div className="text-green-100">Economia este mês</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
