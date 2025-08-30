import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShoppingCart, Factory, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Multi-Role Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform connecting buyers, producers, and regulators in a secure, regulated marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground">Buyers</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create orders, manage purchases, and connect with verified producers
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit purchase orders</li>
                <li>• Track order status</li>
                <li>• Access verified suppliers</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Factory className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground">Producers</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                List products, manage inventory, and reach potential buyers
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Add product listings</li>
                <li>• Manage inventory</li>
                <li>• Set pricing & certifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground">Regulators</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create regulations, ensure compliance, and maintain standards
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create regulations</li>
                <li>• Monitor compliance</li>
                <li>• Set quality standards</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Get Started - Register
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Already have an account? Login
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Join our secure platform and start connecting with verified partners
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
