import React, { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from 'axios';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleGenerativeAI as oI } from "@google/generative-ai";

import flower1 from '../assets/flower1.jpg';
import flower2 from '../assets/flower2.jpg';
import flower3 from '../assets/flower3.jpg';
import flower4 from '../assets/flower4.jpg';

interface Prediction {
  scientificName: string;
  commonNames: string[];
  probability: number;
}

export default function FlowerRecognition() {
  const [real, setReal] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flowers = [flower1, flower2, flower3, flower4];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(files);
      setError(null);
      setResult(null);
      setSelectedImage(null);
    }
  };

  const handleImageClick = (flower: string) => {
    setSelectedImage(flower);
    setImageFiles([]);
  };

  const clearSelection = () => {
    setImageFiles([]);
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setReal("");
  };

  const classifyImages = async () => {
    if (imageFiles.length > 0 || selectedImage) {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();

      if (selectedImage) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('images', new File([blob], 'selected.jpg'));
      } else {
        imageFiles.forEach((file) => {
          formData.append('images', file);
        });
      }
      formData.append('organs', 'flower'); 

      try {
        const response = await axios.post('https://my-api.plantnet.org/v2/identify/all?api-key=2b10xV81gZyQwVj9Fwio71q9u', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.results && Array.isArray(response.data.results)) {
          if (response.data.results.length === 0) {
            setError("The result set is empty.");
          } else {
            const firstResult = response.data.results[0];
            const prediction: Prediction = {
              scientificName: firstResult.species.scientificName,
              commonNames: firstResult.species.commonNames || [],
              probability: firstResult.score,
            };
            setResult(prediction);
            await fetchPlantCare(firstResult.species.scientificName);
          }
        } else {
          setError("No results found in the response.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Error classifying image: " + (error.response?.data.message || "Unknown error"));
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchPlantCare = async (scientificName: string) => {
    const apiKey = "AIzaSyB65kNbep-XaLFjxZ2nlTgwW0zACFRMf5Q";
  
    if (!apiKey) {
      setErrorPrompt("API key is not defined. Please check your environment variables.");
      return;
    }
  
    const genAI = new oI(apiKey);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const prompt = `Tell me the most basic cares of ${scientificName} in just 45 words IMPORTANT include how many water, light and how much it grows `;
  
    try {
      const result = await model.generateContent(prompt);
      
      const cleanText = (text: string) => {
        return text
          .replace(/[*#]/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim(); 
      };

      const cleanedText = cleanText(result.response.text());
      setReal(cleanedText);
  
    } catch (error) {
      setErrorPrompt("Error fetching content: " + (error as Error).message);
    }
  };
  
  

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setSelectedImage(flowers[current]),
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-300 via-white-400 to-green-300 animate-gradient">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-white-400 to-green-300 opacity-50 blur-lg transform scale-110" />
      <img className="absolute min-h-screen items-center justify-center flex w-full opacity-20" src="pattern.png" />
      <Card className="max-w-sm w-full p-6 mx-auto mt-10 relative z-10 bg-white backdrop-blur-md rounded-3xl shadow-2xl border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-gray-800">Flower Recognition</CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">Select or upload an image to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label className="justify-center text-align items-center">Select any flower already found</Label>
            <Input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload} 
              className="mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-400"
              ref={fileInputRef} 
              style={{ display: 'none' }} 
            />
            {selectedImage || imageFiles.length > 0 ? (
              <div className="flex justify-center mt-4">
                <img 
                  src={selectedImage || URL.createObjectURL(imageFiles[0])} 
                  alt="Selected Flower" 
                  className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"
                />
              </div>
            ) : null}

            <div className="mt-4">
              <Slider {...settings}>
                {flowers.map((flower, index) => (
                  <div key={index} onClick={() => handleImageClick(flower)} className="flex justify-center">
                    <img 
                      src={flower} 
                      alt={`Flower ${index + 1}`} 
                      className={`w-32 h-32 object-cover rounded-lg cursor-pointer ${selectedImage === flower ? 'border-4 border-green-500' : ''}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <Button onClick={() => fileInputRef.current?.click()} className="w-full mb-4 hover:bg-blue-500 active:bg-blue-600 hover:text-white">
              Select from device
            </Button>

            <Button 
              type="button"
              onClick={classifyImages} 
              disabled={(imageFiles.length === 0 && !selectedImage) || isLoading} 
              className="w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 transition ease-in-out duration-200"
            >
              {isLoading ? 'Processing...' : 'Scan'}
            </Button>
            <Button 
              type="button"
              onClick={clearSelection} 
              className="w-full bg-red-500 text-white font-bold py-2 rounded-full mt-2 hover:bg-red-600 transition ease-in-out duration-200"
            >
              Clear Selection
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {errorPrompt && <p className="text-red-500">{errorPrompt}</p>} {/* Mostrar errorPrompt si existe */}
            {result && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Result:</h3>
                <p className="text-gray-800">
                  {capitalizeFirstLetter(result.scientificName)} - {(result.probability * 100).toFixed(2)}%
                  {result.commonNames.length > 0 && <span> ({result.commonNames.join(', ')})</span>}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="max-w-sm w-full p-6 mx-auto mt-10 relative z-10 bg-white backdrop-blur-md rounded-3xl shadow-2xl border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-gray-800">Treatment Care</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800">{real}</p>
        </CardContent>
      </Card>
    </div>
  );
}
