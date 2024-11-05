import React, { useState, useRef } from 'react';
import { Button } from "./button";
import { Input } from "./input";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleGenerativeAI as oI } from "@google/generative-ai";

interface Prediction {
    scientificName: string;
    commonNames: string[];
    probability: number;
}

const Scanner = () => {
  const [real, setReal] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flowers = ["flower1.jpg", "flower2.jpg", "flower3.jpg", "flower4.jpg"];
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
        <div>
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8" id="scanner">
                <div className="md:w-7/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className='py-28'>
                        <img src="flower.png" alt="" className="medium-square" />
                    </div>
                    <div className="md:w-3/5 mx-auto">
                        <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5">Flower Recognizer</h2>
                        <div className='space-x-4'>
                            <Button onClick={() => fileInputRef.current?.click()} className="mb-4 active:bg-blue-500 active:text-white">
                                Upload an image
                            </Button>
                            <Button 
                                type="button"
                                onClick={classifyImages} 
                                disabled={(imageFiles.length === 0 && !selectedImage) || isLoading} 
                                className="mb-4 bg-blue-500 text-white active:bg-blue-600 transition ease-in-out duration-200"
                                >
                                {isLoading ? 'Processing...' : 'Scan'}
                            </Button>
                            <Button 
                                type="button"
                                onClick={clearSelection} 
                                className="mb-4 bg-red-500 text-white active:bg-red-600 transition ease-in-out duration-200"
                                >
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        {error && <p className="text-2xl text-center text-red-500">{error}</p>}
                        {errorPrompt && <p className="text-red-500">{errorPrompt}</p>} {/* Mostrar errorPrompt si existe */}
                        {result && (
                            <div className="mt-4">
                                <h1 className="text-5xl font-semibold mb-4 text-brandPrimary md:w-3/4 leading-snug">
                                    {capitalizeFirstLetter(result.scientificName)} - {(result.probability * 100).toFixed(2)}%
                                    {result.commonNames.length > 0 && <span> ({result.commonNames.join(', ')})</span>}
                                </h1>
                            </div>
                        )}
                        <p className="text-2xl text-neutralDGrey mb-8">{real}</p>
                    </div>
                    <div>
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
                                className="square"
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scanner;