import { useEffect, useState } from 'react';
import { BarChart3, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const StatsOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    avgConfidence: 0,
    topCategory: ''
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('classifications')
        .select('top_prediction, top_confidence');

      if (error) throw error;

      if (data && data.length > 0) {
        const total = data.length;
        const avgConfidence = data.reduce((sum, item) => sum + item.top_confidence, 0) / total;

        const categoryCount: Record<string, number> = {};
        data.forEach(item => {
          categoryCount[item.top_prediction] = (categoryCount[item.top_prediction] || 0) + 1;
        });

        const topCategory = Object.entries(categoryCount)
          .sort(([, a], [, b]) => b - a)[0][0];

        setStats({ total, avgConfidence, topCategory });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-gray-600">Total</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-600">Avg Confidence</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {(stats.avgConfidence * 100).toFixed(0)}%
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-xs text-gray-600">Top Category</span>
        </div>
        <p className="text-sm font-bold text-gray-900 truncate capitalize">
          {stats.topCategory || 'N/A'}
        </p>
      </div>
    </div>
  );
};
