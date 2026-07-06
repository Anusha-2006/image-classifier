import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export interface Prediction {
  className: string;
  probability: number;
}

export const useImageClassifier = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setError(null);
      } catch (err) {
        setError('Failed to load the model. Please refresh the page.');
        console.error('Error loading model:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  const classifyImage = useCallback(
    async (imageElement: HTMLImageElement): Promise<Prediction[]> => {
      if (!model) {
        throw new Error('Model not loaded yet');
      }

      const predictions = await model.classify(imageElement);
      return predictions.map((pred) => ({
        className: pred.className,
        probability: pred.probability,
      }));
    },
    [model]
  );

  return {
    model,
    isLoading,
    error,
    classifyImage,
  };
};
