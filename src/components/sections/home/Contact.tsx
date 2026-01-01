'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  formTitle: 'Send us a message',
  submitText: 'Send Message',
  contactInfo: {
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, City, State 12345',
  },
  socialLinks: [
    { name: 'GitHub', href: 'https://github.com', icon: 'Github' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
  ],
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submitForm, isSubmitting } = useFormSubmit();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await submitForm('contact', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <Github className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <span data-editable="formTitle">{config.formTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-destructive' : ''}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => handleInputChange('subject', e.target.value)}
                      className={errors.subject ? 'border-destructive' : ''}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      className={`min-h-32 ${errors.message ? 'border-destructive' : ''}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-muted text-muted-foreground">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a
                          href={`mailto:${config.contactInfo.email}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <span data-editable="contactInfo.email">{config.contactInfo.email}</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a
                          href={`tel:${config.contactInfo.phone}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <span data-editable="contactInfo.phone">{config.contactInfo.phone}</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p className="text-muted-foreground">
                          <span data-editable="contactInfo.address">
                            {config.contactInfo.address}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    {config.socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        data-editable-href={`socialLinks[${idx}].href`}
                        data-href={social.href}
                        className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        aria-label={social.name}
                      >
                        {getSocialIcon(social.icon)}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
