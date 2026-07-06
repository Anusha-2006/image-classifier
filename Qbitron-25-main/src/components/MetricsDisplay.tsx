import { useEffect, useState } from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';

interface MetricsDisplayProps {
  predictions: Array<{ className: string; probability: number }>;
}

export const MetricsDisplay = ({ predictions }: MetricsDisplayProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [predictions]);

  if (predictions.length === 0) return null;

  const topPrediction = predictions[0];
  const accuracy = topPrediction.probability;

  const precision = predictions.slice(0, 3).reduce((sum, p) => sum + p.probability, 0) / 3;

  const totalConfidence = predictions.reduce((sum, p) => sum + p.probability, 0);
  const avgConfidence = totalConfidence / predictions.length;
  const f1Score = (2 * accuracy * precision) / (accuracy + precision);

  const metrics = [
    {
      label: 'Accuracy',
      value: accuracy * 100,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'Precision',
      value: precision * 100,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'F1 Score',
      value: f1Score * 100,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      label: 'Confidence',
      value: avgConfidence * 100,
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className={`${metric.bgColor} rounded-lg p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-md ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${metric.textColor}`} />
                <span className="text-xs font-medium text-gray-700">{metric.label}</span>
              </div>
              <span className={`text-lg font-bold ${metric.textColor}`}>
                {metric.value.toFixed(1)}%
              </span>
            </div>
            <div className="relative w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: animated ? `${metric.value}%` : '0%',
                  transitionDelay: `${index * 100 + 200}ms`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
