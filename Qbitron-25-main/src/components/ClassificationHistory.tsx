import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Classification {
  id: string;
  image_name: string;
  top_prediction: string;
  top_confidence: number;
  created_at: string;
}

export const ClassificationHistory = () => {
  const [history, setHistory] = useState<Classification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('classifications')
        .select('id, image_name, top_prediction, top_confidence, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-md">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <p className="text-sm text-gray-500 text-center py-6">
          No classifications yet. Upload an image to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 transform hover:scale-[1.01]"
            style={{
              animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
            }}
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-medium text-gray-900 truncate capitalize">
                {item.top_prediction}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {formatTime(item.created_at)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                item.top_confidence > 0.7 ? 'bg-green-500' :
                item.top_confidence > 0.4 ? 'bg-yellow-500' :
                'bg-gray-400'
              }`}></div>
              <span className="text-sm font-semibold text-gray-700">
                {(item.top_confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
