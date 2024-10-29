'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function FlowerRecognition() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [results, setResults] = useState<Array<{ className: string; probability: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
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

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };  

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto rounded-lg shadow-lg border border-gray-300 bg-white p-5">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-extrabold text-gray-800">Flower Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload" className="font-medium">Upload an image of any flower</Label>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-400"
              />
            </div>
            {imageURL && (
              <div className="mt-4">
                <img 
                  ref={imageRef} 
                  src={imageURL} 
                  alt="Uploaded flower" 
                  className="max-w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <Button 
              type="submit"
              onClick={classifyImage} 
              disabled={!imageURL || isLoading} 
              className="w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 transition ease-in-out duration-200"
            >
              {isLoading ? 'Processing...' : 'Scan'}
            </Button>
            {results.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Results:</h3>
                <ul className="list-disc pl-5">
                  {results.map((result, index) => (
                    <li key={index} className="text-gray-800">
                      {capitalizeFirstLetter(result.className)} - {(result.probability * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
