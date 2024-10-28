'use client'

import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const firebaseConfig = {
    apiKey: "AIzaSyDZLPCLvhxx_ogwE89OXCTK222cKMm0B2c",
    authDomain: "vueauth-d0174.firebaseapp.com",
    projectId: "vueauth-d0174",
    storageBucket: "vueauth-d0174.appspot.com",
    messagingSenderId: "550267519848",
    appId: "1:550267519848:web:8084e360d4d232863c8cdd",
    measurementId: "G-3366XN2GPK"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function FirebaseAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage('Registration successful!')
    } catch (error) {
      setMessage(`Registration error: ${error.message}`)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMessage('Login successful!')
    } catch (error) {
      setMessage(`Login error: ${error.message}`)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Firebase Authentication</CardTitle>
        <CardDescription>Login or register using your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </CardFooter>
    </Card>
  )
}