import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    country: '',
    role: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    if (!formData.email || !formData.fullName || !formData.country || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to register.",
        variant: "destructive",
      });
      return;
    }

    // Store user data in localStorage for this demo
    localStorage.setItem('currentUser', JSON.stringify(formData));
    
    toast({
      title: "Registration Successful",
      description: `Welcome ${formData.fullName}! Redirecting to your dashboard.`,
    });

    // Redirect based on role
    setTimeout(() => {
      switch (formData.role) {
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
  };

  const handleLoginInstead = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center pb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome</h1>
          <p className="text-muted-foreground text-lg">
            Register your account, select a role, and complete KYC (admin approval).
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email or Wallet Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email or wallet address"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name / Org
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name or organization"
                className="h-12"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Enter your country"
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="producer">Producer</SelectItem>
                  <SelectItem value="regulator">Regulator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={handleRegister}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Register
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLoginInstead}
              className="h-12 px-8 text-primary hover:text-primary/80"
            >
              Login instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;