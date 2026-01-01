'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Puzzle, Shield, Code, Headphones, TrendingUp } from 'lucide-react';

const DEFAULT_FEATURES = {
  title: 'Powerful Features',
  subtitle: 'Everything you need to build amazing products',
  description:
    'Our platform provides all the tools and capabilities you need to create, deploy, and scale your applications with confidence.',
  features: [
    {
      id: 'fast-performance',
      icon: 'Zap',
      title: 'Fast Performance',
      description:
        'Lightning-fast response times with optimized code and advanced caching mechanisms that ensure your applications run smoothly.',
    },
    {
      id: 'easy-integration',
      icon: 'Puzzle',
      title: 'Easy Integration',
      description:
        'Seamlessly integrate with your existing tools and workflows using our comprehensive APIs and pre-built connectors.',
    },
    {
      id: 'secure-reliable',
      icon: 'Shield',
      title: 'Secure & Reliable',
      description:
        'Enterprise-grade security with 99.9% uptime guarantee, encrypted data transmission, and regular security audits.',
    },
    {
      id: 'developer-friendly',
      icon: 'Code',
      title: 'Developer Friendly',
      description:
        'Clean documentation, intuitive APIs, and powerful SDKs that make development a breeze for teams of any size.',
    },
    {
      id: 'support',
      icon: 'Headphones',
      title: '24/7 Support',
      description:
        'Round-the-clock expert support from our dedicated team to help you succeed at every step of your journey.',
    },
    {
      id: 'scalable',
      icon: 'TrendingUp',
      title: 'Scalable Architecture',
      description:
        'Built to grow with your business, from startup to enterprise scale with automatic scaling and load balancing.',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const iconProps = { className: 'h-8 w-8 text-primary' };

    switch (iconName) {
      case 'Zap':
        return <Zap {...iconProps} />;
      case 'Puzzle':
        return <Puzzle {...iconProps} />;
      case 'Shield':
        return <Shield {...iconProps} />;
      case 'Code':
        return <Code {...iconProps} />;
      case 'Headphones':
        return <Headphones {...iconProps} />;
      case 'TrendingUp':
        return <TrendingUp {...iconProps} />;
      default:
        return <Zap {...iconProps} />;
    }
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <span data-editable="title">{config.title}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-6">{getIcon(feature.icon)}</div>
                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Ready to experience these features yourself?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer">
              Get Started Free
            </div>
            <div className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors cursor-pointer">
              View Documentation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
