'use client';

import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDZLPCLvhxx_ogwE89OXCTK222cKMm0B2c",
  authDomain: "vueauth-d0174.firebaseapp.com",
  projectId: "vueauth-d0174",
  storageBucket: "vueauth-d0174.appspot.com",
  messagingSenderId: "550267519848",
  appId: "1:550267519848:web:8084e360d4d232863c8cdd",
  measurementId: "G-3366XN2GPK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function FirebaseAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Registration successful!');
      navigate("/flower-recognition");
    } catch (error) {
      setMessage('Incorrect email syntax');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/flower-recognition");
    } catch (error) {
      setMessage('Incorrect email or password');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-300 via-white-400 to-green-300 animate-gradient">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-white-400 to-green-300 opacity-50 blur-lg transform scale-110" />
      <img className="absolute min-h-screen items-center justify-center flex w-full opacity-20" src="pattern.png" />
      <Card className="max-w-sm w-full p-6 mx-auto mt-10 relative z-10 bg-white backdrop-blur-md rounded-3xl shadow-2xl border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-gray-800">Hello, friend!</CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">Sign an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-000 rounded-full p-1">
              <TabsTrigger value="login" className={`py-2 font-medium text-sm text-gray-700 rounded-full focus:bg-blue-200 ${activeTab === 'login' ? 'bg-blue-200' : ''}`}>Login</TabsTrigger>
              <TabsTrigger value="register" className={`py-2 font-medium text-sm text-gray-700 rounded-full focus:bg-green-200 ${activeTab === 'register' ? 'bg-green-200' : ''}`}>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-blue-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-blue-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-full hover:bg-blue-600 transition ease-in-out duration-200">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-green-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-green-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                  />
                </div>
                <Button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 transition ease-in-out duration-200">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {message && <p className="text-sm text-center text-gray-600 mt-4">{message}</p>}
        </CardFooter>
      </Card>
      <style>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}