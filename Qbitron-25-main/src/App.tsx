import { useState, useRef } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { PredictionResults } from './components/PredictionResults';
import { MetricsDisplay } from './components/MetricsDisplay';
import { ClassificationHistory } from './components/ClassificationHistory';
import { StatsOverview } from './components/StatsOverview';
import { useImageClassifier, Prediction } from './hooks/useImageClassifier';
import { supabase } from './lib/supabase';

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isClassifying, setIsClassifying] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const { isLoading: isModelLoading, error: modelError, classifyImage } = useImageClassifier();

  const handleImageSelect = async (file: File, url: string) => {
    setImageUrl(url);
    setImageName(file.name);
    setPredictions([]);
  };

  const handleClear = () => {
    setImageUrl(null);
    setImageName('');
    setPredictions([]);
  };

  const handleImageLoad = async () => {
    if (!imageRef.current || isModelLoading) return;

    setIsClassifying(true);
    try {
      const results = await classifyImage(imageRef.current);
      setPredictions(results);

      await supabase.from('classifications').insert({
        image_name: imageName,
        top_prediction: results[0].className,
        top_confidence: results[0].probability,
        all_predictions: results,
      });

      setHistoryKey((prev) => prev + 1);
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="relative">
              <Brain className="w-12 h-12 text-gray-900" />
              <Sparkles className="w-5 h-5 text-blue-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              AI Image Classifier
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced CNN-powered image recognition with real-time metrics
          </p>

          {isModelLoading && (
            <div className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
              <div className="animate-spin">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-medium">Loading AI model...</span>
            </div>
          )}

          {modelError && (
            <div className="mt-6 inline-flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-full">
              <span className="font-medium">{modelError}</span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <StatsOverview key={historyKey} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageUploader
              onImageSelect={handleImageSelect}
              onClear={handleClear}
              previewUrl={imageUrl}
            />

            {imageUrl && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Selected"
                className="hidden"
                crossOrigin="anonymous"
                onLoad={handleImageLoad}
              />
            )}

            {predictions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PredictionResults
                  predictions={predictions}
                  isClassifying={isClassifying}
                />
                <MetricsDisplay predictions={predictions} />
              </div>
            )}

            {isClassifying && (
              <div className="border border-gray-200 rounded-lg p-12 bg-white">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="animate-spin">
                      <Brain className="w-12 h-12 text-blue-500" />
                    </div>
                    <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">Processing your image...</p>
                  <p className="text-sm text-gray-500">Running neural network inference</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <ClassificationHistory key={historyKey} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-gray-600">
              Powered by MobileNet CNN • TensorFlow.js • 1000+ Categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
