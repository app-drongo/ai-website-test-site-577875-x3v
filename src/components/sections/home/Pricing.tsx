'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Select the perfect plan for your needs',
  monthlyLabel: 'Monthly',
  yearlyLabel: 'Yearly',
  yearlyDiscount: 'Save 20%',
  basicPlan: {
    name: 'Basic',
    monthlyPrice: 9,
    yearlyPrice: 86,
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 5 projects',
      '10GB storage',
      'Email support',
      'Basic analytics',
      'Mobile app access',
    ],
    ctaText: 'Get Started',
    ctaHref: '/signup/basic',
  },
  proPlan: {
    name: 'Pro',
    monthlyPrice: 29,
    yearlyPrice: 278,
    description: 'Best for growing teams and businesses',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Priority support',
      'Advanced analytics',
      'Mobile app access',
      'Team collaboration',
      'Custom integrations',
      'API access',
    ],
    ctaText: 'Get Started',
    ctaHref: '/signup/pro',
    recommended: true,
  },
  enterprisePlan: {
    name: 'Enterprise',
    monthlyPrice: 99,
    yearlyPrice: 950,
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited everything',
      '1TB storage',
      '24/7 phone support',
      'Custom analytics',
      'Mobile app access',
      'Advanced team management',
      'Custom integrations',
      'Full API access',
      'SSO authentication',
      'Custom onboarding',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    ctaText: 'Contact Sales',
    ctaHref: '/contact/enterprise',
  },
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [config.basicPlan, config.proPlan, config.enterprisePlan];

  const handlePlanClick = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          <div className="flex items-center justify-center gap-4 mb-2">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="monthlyLabel">{config.monthlyLabel}</span>
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle yearly pricing"
            />
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="yearlyLabel">{config.yearlyLabel}</span>
            </span>
          </div>

          {isYearly && (
            <Badge variant="secondary" className="text-xs">
              <span data-editable="yearlyDiscount">{config.yearlyDiscount}</span>
            </Badge>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, idx) => {
            const planKey = idx === 0 ? 'basicPlan' : idx === 1 ? 'proPlan' : 'enterprisePlan';
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? 'year' : 'month';

            return (
              <Card
                key={idx}
                className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    <span data-editable={`${planKey}.name`}>{plan.name}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    <span data-editable={`${planKey}.description`}>{plan.description}</span>
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">/{period}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <span data-editable={`${planKey}.features[${featureIdx}]`}>
                            {feature}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan.ctaHref)}
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    data-editable-href={`${planKey}.ctaHref`}
                    data-href={plan.ctaHref}
                  >
                    <span data-editable={`${planKey}.ctaText`}>{plan.ctaText}</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
