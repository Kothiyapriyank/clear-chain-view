import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, LogOut, Plus } from 'lucide-react';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState([
    { id: 1, product: 'Organic Wheat', quantity: '500 kg', status: 'pending', producer: 'Green Farm Co.' },
    { id: 2, product: 'Fresh Vegetables', quantity: '200 kg', status: 'approved', producer: 'Valley Produce' }
  ]);
  
  const [newOrder, setNewOrder] = useState({
    product: '',
    quantity: '',
    specifications: '',
    budget: ''
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleInputChange = (field: string, value: string) => {
    setNewOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateOrder = () => {
    if (!newOrder.product || !newOrder.quantity || !newOrder.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const order = {
      id: orders.length + 1,
      product: newOrder.product,
      quantity: newOrder.quantity,
      status: 'pending',
      producer: 'To be assigned'
    };

    setOrders(prev => [...prev, order]);
    setNewOrder({ product: '', quantity: '', specifications: '', budget: '' });
    
    toast({
      title: "Order Created",
      description: "Your order has been submitted successfully!",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Buyer Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {currentUser.fullName}</span>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Order */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product Name *</Label>
                <Input
                  id="product"
                  value={newOrder.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  placeholder="e.g., Organic Wheat, Fresh Vegetables"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  value={newOrder.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="e.g., 500 kg, 100 units"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  value={newOrder.specifications}
                  onChange={(e) => handleInputChange('specifications', e.target.value)}
                  placeholder="Quality requirements, delivery preferences, etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget *</Label>
                <Input
                  id="budget"
                  value={newOrder.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., $5000, €3000"
                />
              </div>
              
              <Button onClick={handleCreateOrder} className="w-full">
                Create Order
              </Button>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{order.product}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                        <p className="text-sm text-muted-foreground">Producer: {order.producer}</p>
                      </div>
                      <Badge 
                        variant={order.status === 'approved' ? 'default' : 'secondary'}
                        className={order.status === 'approved' ? 'bg-success text-success-foreground' : ''}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No orders yet. Create your first order!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;