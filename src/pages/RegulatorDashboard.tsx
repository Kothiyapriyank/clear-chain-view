import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, LogOut, Plus, FileText } from 'lucide-react';

const RegulatorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [regulations, setRegulations] = useState([
    { id: 1, title: 'Organic Certification Standards', type: 'quality', status: 'active', date: '2024-01-15' },
    { id: 2, title: 'Food Safety Guidelines', type: 'safety', status: 'under review', date: '2024-02-20' }
  ]);
  
  const [newRegulation, setNewRegulation] = useState({
    title: '',
    type: '',
    description: '',
    requirements: '',
    effectiveDate: ''
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleInputChange = (field: string, value: string) => {
    setNewRegulation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateRegulation = () => {
    if (!newRegulation.title || !newRegulation.type || !newRegulation.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const regulation = {
      id: regulations.length + 1,
      title: newRegulation.title,
      type: newRegulation.type,
      status: 'under review',
      date: new Date().toISOString().split('T')[0]
    };

    setRegulations(prev => [...prev, regulation]);
    setNewRegulation({ title: '', type: '', description: '', requirements: '', effectiveDate: '' });
    
    toast({
      title: "Regulation Created",
      description: "New regulation has been submitted for review!",
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
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Regulator Dashboard</h1>
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
          {/* Create New Regulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Regulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Regulation Title *</Label>
                <Input
                  id="title"
                  value={newRegulation.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Organic Certification Standards"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Regulation Type *</Label>
                <Input
                  id="type"
                  value={newRegulation.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  placeholder="e.g., quality, safety, environmental"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newRegulation.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the regulation..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={newRegulation.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Specific requirements and compliance criteria..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={newRegulation.effectiveDate}
                  onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                />
              </div>
              
              <Button onClick={handleCreateRegulation} className="w-full">
                Create Regulation
              </Button>
            </CardContent>
          </Card>

          {/* Regulations List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Regulatory Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{regulation.title}</h3>
                        <p className="text-sm text-muted-foreground">Type: {regulation.type}</p>
                        <p className="text-sm text-muted-foreground">Date: {regulation.date}</p>
                      </div>
                      <Badge 
                        variant={regulation.status === 'active' ? 'default' : 'secondary'}
                        className={regulation.status === 'active' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}
                      >
                        {regulation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {regulations.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No regulations yet. Create your first regulation!
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

export default RegulatorDashboard;