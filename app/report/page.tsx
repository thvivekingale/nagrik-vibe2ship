'use client';

import { useState, useRef } from 'react';
import { categoryLabels, categoryIcons, IssueCategory } from '@/lib/mockData';
import { Upload, Loader2, Check, AlertCircle, MapPin, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ReportPage() {
  const [step, setStep] = useState<'form' | 'preview' | 'success'>('form');
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<IssueCategory>('pothole');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);

      // Call AI categorization
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/categorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Image: base64,
            description: description,
          }),
        });

        if (!response.ok) throw new Error('Failed to categorize image');

        const result = await response.json();
        setAiResult(result);
        setCategory(result.category);
        setSeverity(result.severity);
      } catch (err) {
        setError('AI categorization failed. Please categorize manually.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !description || !location) {
      setError('Please fill in all required fields');
      return;
    }

    setStep('preview');
  };

  const handleConfirm = () => {
    setStep('success');
    setTimeout(() => {
      // Reset form
      setStep('form');
      setImage(null);
      setDescription('');
      setLocation('');
      setCategory('pothole');
      setSeverity('medium');
      setAiResult(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-card">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Report Submitted!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for reporting this civic issue. Community members can now verify and track the resolution.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Category</p>
              <p className="font-semibold text-foreground">{categoryIcons[category]} {categoryLabels[category]}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Severity</p>
              <p className="font-semibold text-foreground capitalize">{severity}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-1">Status</p>
              <p className="font-semibold text-foreground">Reported</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-card">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Verify Your Report</h1>

          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            {image && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Image</p>
                <img src={image} alt="Report" className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Title</p>
              <p className="text-lg font-medium text-foreground">{description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Category</p>
                <p className="font-semibold text-foreground">
                  {categoryIcons[category]} {categoryLabels[category]}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Severity</p>
                <p className="font-semibold text-foreground capitalize">{severity}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Location</p>
                <p className="font-semibold text-foreground truncate">{location}</p>
              </div>
            </div>

            {aiResult && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm font-medium text-accent mb-2">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${aiResult.confidence}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{aiResult.confidence}%</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep('form')}
                className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium text-foreground"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:shadow-lg transition-shadow font-medium"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Report Civic Issue</h1>
        <p className="text-muted-foreground mb-8">
          Help improve your city by reporting infrastructure problems. Our AI will automatically categorize your report.
        </p>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Photo *</label>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <div>
                  <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-4" />
                  <p className="text-sm text-muted-foreground">Click to change image</p>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Upload a photo</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {loading && (
              <div className="flex items-center gap-2 mt-3 text-sm text-accent">
                <Loader2 className="w-4 h-4 animate-spin" />
                AI is categorizing your image...
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue you&apos;re reporting..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={4}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Street name, landmark, or area"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IssueCategory)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {categoryIcons[key as IssueCategory]} {label}
                </option>
              ))}
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Severity</label>
            <div className="grid grid-cols-4 gap-2">
              {['low', 'medium', 'high', 'critical'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeverity(level as typeof severity)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    severity === level
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted hover:bg-border text-foreground'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-shadow font-medium disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </span>
            ) : (
              'Review Report'
            )}
          </button>
        </form>
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}
