import { useState, useEffect } from 'react';
import { Prediction } from '../hooks/useImageClassifier';
import { Sparkles } from 'lucide-react';

interface PredictionResultsProps {
  predictions: Prediction[];
  isClassifying: boolean;
}

export const PredictionResults = ({ predictions, isClassifying }: PredictionResultsProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (predictions.length > 0) {
      setAnimated(false);
      const timer = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [predictions]);

  if (isClassifying) {
    return (
      <div className="border border-gray-200 rounded-lg p-8 bg-white">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin">
            <Sparkles className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600">Analyzing image...</p>
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Predictions</h2>

      <div className="space-y-3">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className={`transform transition-all duration-500 hover:scale-[1.02] ${
              animated ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : index === 1
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm text-gray-900 capitalize font-medium">
                  {prediction.className}
                </p>
              </div>
              <span className={`text-sm font-bold ${
                prediction.probability > 0.7 ? 'text-green-600' :
                prediction.probability > 0.4 ? 'text-yellow-600' :
                'text-gray-600'
              }`}>
                {(prediction.probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  index === 0
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                    : index === 1
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}
                style={{
                  width: animated ? `${prediction.probability * 100}%` : '0%',
                  transitionDelay: `${index * 100 + 200}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
