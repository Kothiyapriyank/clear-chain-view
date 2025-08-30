import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Factory, LogOut, Plus } from 'lucide-react';

const ProducerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Wheat', quantity: '1000 kg', price: '$3000', status: 'available' },
    { id: 2, name: 'Fresh Vegetables', quantity: '500 kg', price: '$1500', status: 'low stock' }
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    certification: ''
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      quantity: newProduct.quantity,
      price: newProduct.price,
      status: 'available'
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({ name: '', quantity: '', price: '', description: '', certification: '' });
    
    toast({
      title: "Product Added",
      description: "Your product has been added successfully!",
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
              <Factory className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Producer Dashboard</h1>
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
          {/* Add New Product */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Organic Wheat, Fresh Vegetables"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Available Quantity *</Label>
                <Input
                  id="quantity"
                  value={newProduct.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="e.g., 500 kg, 100 units"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., $5000, €3000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Quality details, origin, growing methods, etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certification">Certifications</Label>
                <Input
                  id="certification"
                  value={newProduct.certification}
                  onChange={(e) => handleInputChange('certification', e.target.value)}
                  placeholder="e.g., Organic, Fair Trade, ISO certified"
                />
              </div>
              
              <Button onClick={handleAddProduct} className="w-full">
                Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Product Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                        <p className="text-sm text-muted-foreground">Price: {product.price}</p>
                      </div>
                      <Badge 
                        variant={product.status === 'available' ? 'default' : 'secondary'}
                        className={product.status === 'available' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No products yet. Add your first product!
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

export default ProducerDashboard;