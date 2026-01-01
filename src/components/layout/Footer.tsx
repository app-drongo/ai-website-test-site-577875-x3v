'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  // Product Section
  productTitle: 'Product',
  productLinks: [
    { label: 'Testing Suite', href: '/testing-suite' },
    { label: 'API Testing', href: '/api-testing' },
    { label: 'Unit Tests', href: '/unit-tests' },
  ],

  // Resources Section
  resourcesTitle: 'Resources',
  resourcesLinks: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api-reference' },
    { label: 'Best Practices', href: '/best-practices' },
  ],

  // Company Section
  companyTitle: 'Company',
  companyLinks: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],

  // Social Links
  socialTitle: 'Connect',
  githubHref: 'https://github.com',
  twitterHref: 'https://twitter.com',
  linkedinHref: 'https://linkedin.com',
  emailHref: 'mailto:hello@testsite.com',

  // Bottom Section
  companyName: 'Test Site',
  copyrightText: '© 2024 Test Site. All rights reserved.',
  tagline:
    'Simple, powerful testing solutions for developers who value efficiency and reliability.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              <span data-editable="productTitle">{config.productTitle}</span>
            </h3>
            <ul className="space-y-3">
              {config.productLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`productLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`productLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              <span data-editable="resourcesTitle">{config.resourcesTitle}</span>
            </h3>
            <ul className="space-y-3">
              {config.resourcesLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`resourcesLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`resourcesLinks[${idx}].label`}>{link.label}</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h3>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              <span data-editable="socialTitle">{config.socialTitle}</span>
            </h3>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(config.githubHref)}
                data-editable-href="githubHref"
                data-href={config.githubHref}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(config.twitterHref)}
                data-editable-href="twitterHref"
                data-href={config.twitterHref}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(config.linkedinHref)}
                data-editable-href="linkedinHref"
                data-href={config.linkedinHref}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(config.emailHref)}
                data-editable-href="emailHref"
                data-href={config.emailHref}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <span data-editable="copyrightText">{config.copyrightText}</span>
            </p>
            <p className="text-xs text-muted-foreground max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>
          </div>
          <div className="text-sm font-medium text-foreground">
            <span data-editable="companyName">{config.companyName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
