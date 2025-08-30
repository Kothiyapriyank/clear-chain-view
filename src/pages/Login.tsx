import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email) {
      toast({
        title: "Missing Information",
        description: "Please enter your email or wallet address.",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, check if user exists in localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.email === email) {
        toast({
          title: "Login Successful",
          description: `Welcome back ${userData.fullName}!`,
        });

        // Redirect based on role
        setTimeout(() => {
          switch (userData.role) {
            case 'buyer':
              navigate('/buyer-dashboard');
              break;
            case 'producer':
              navigate('/producer-dashboard');
              break;
            case 'regulator':
              navigate('/regulator-dashboard');
              break;
            default:
              navigate('/');
          }
        }, 1000);
      } else {
        toast({
          title: "User Not Found",
          description: "Please check your email or register first.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "User Not Found",
        description: "Please register first.",
        variant: "destructive",
      });
    }
  };

  const handleRegisterInstead = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome Back</h1>
          <p className="text-muted-foreground text-lg">
            Login to access your dashboard
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email or Wallet Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or wallet address"
              className="h-12"
            />
          </div>
          
          <div className="flex flex-col gap-4 pt-6">
            <Button 
              onClick={handleLogin}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleRegisterInstead}
              className="h-12 px-8 text-primary hover:text-primary/80"
            >
              Register instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;