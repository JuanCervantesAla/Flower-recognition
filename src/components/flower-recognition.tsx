'use client';

import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from 'axios';

interface Prediction {
  scientificName: string;
  commonNames: string[];
  probability: number;
}

export default function FlowerRecognition() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(files);
      setError(null);
    }
  };

  const classifyImages = async () => {
    if (imageFiles.length > 0) {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
  
      try {
        const response = await axios.post('/api/v2/identify/all', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer 2b10xV81gZyQwVj9Fwio71q9u',
          },
        });
      
        // Check if results exist in the response before mapping
        if (response.data && Array.isArray(response.data.results)) {
          const predictions: Prediction[] = response.data.results.map((result: any) => ({
            scientificName: result.species.scientificName,
            commonNames: result.species.commonNames || [],
            probability: result.probability,
          }));
      
          setResults(predictions);
        } else {
          // Handle case where results are not present
          setError("No results found in the response.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      
        if (axios.isAxiosError(error)) {
          setError("Error classifying image: " + (error.response?.data.message || "Unknown error"));
        } else if (error instanceof Error) {
          setError("An unexpected error occurred: " + error.message);
        } else {
          setError("An unexpected error occurred.");
        }
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
              <Label htmlFor="image-upload" className="font-medium">Upload images of flowers (up to 5)</Label>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageUpload} 
                className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-400"
              />
            </div>
            {imageFiles.length > 0 && (
              <div className="mt-4">
                {imageFiles.map((file, index) => (
                  <img 
                    key={index} 
                    src={URL.createObjectURL(file)} 
                    alt={`Uploaded flower ${index + 1}`} 
                    className="max-w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>
            )}
            <Button 
              type="button"
              onClick={classifyImages} 
              disabled={imageFiles.length === 0 || isLoading} 
              className="w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 transition ease-in-out duration-200"
            >
              {isLoading ? 'Processing...' : 'Scan'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {results.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Results:</h3>
                <ul className="list-disc pl-5">
                  {results.map((result, index) => (
                    <li key={index} className="text-gray-800">
                      {capitalizeFirstLetter(result.scientificName)} - {(result.probability * 100).toFixed(2)}%
                      {result.commonNames.length > 0 && <span> ({result.commonNames.join(', ')})</span>}
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