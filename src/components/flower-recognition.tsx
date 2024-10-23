'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FlowerRecognition() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [results, setResults] = useState<Array<{ className: string; probability: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready(); // Asegúrate de que TensorFlow.js esté listo
      setIsLoading(true);
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageURL(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    if (model && imageRef.current) {
      setIsLoading(true);
      try {
        const predictions = await model.classify(imageRef.current);
        setResults(predictions);
      } catch (error) {
        console.error("Error classifying image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Flower Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Upload an image of a flower</Label>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
          </div>
          {imageURL && (
            <div className="mt-4">
              <img ref={imageRef} src={imageURL} alt="Uploaded flower" className="max-w-full h-auto rounded-lg" />
            </div>
          )}
          <Button onClick={classifyImage} disabled={!imageURL || isLoading} className="w-full">
            {isLoading ? 'Processing...' : 'Recognize Flower'}
          </Button>
          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <ul className="list-disc pl-5">
                {results.map((result, index) => (
                  <li key={index}>
                    {result.className} - {(result.probability * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
