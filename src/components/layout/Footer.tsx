import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

interface FooterProps {
  logo?: {
    src?: string;
    alt?: string;
    text?: string;
  };
  description?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function Footer({
  logo,
  description,
  columns,
  socialLinks = [],
  copyright,
  className,
}: FooterProps) {
  // Return null if no columns provided
  if (!columns || columns.length === 0) {
    return null;
  }

  // Default values
  const logoAlt = logo?.alt || "Oatmeal";
  const logoText = logo?.text || "Oatmeal";
  const logoSrc = logo?.src;
  const defaultCopyright = `© ${new Date().getFullYear()} Oatmeal. All rights reserved.`;
  return (
    <footer className={cn("bg-[#fafaf9] border-t border-[#e7e5e4]", className)}>
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-8 w-auto"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#84cc16] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">O</span>
                  </div>
                  {logoText && (
                    <span className="text-xl font-semibold text-[#1c1917]">
                      {logoText}
                    </span>
                  )}
                </div>
              )}
            </Link>
            {description && (
              <p className="text-[#78716c] text-sm leading-relaxed mb-6 max-w-xs">
                {description}
              </p>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#78716c] hover:text-[#1c1917] transition-colors"
                    aria-label={link.platform}
                  >
                    {link.icon || link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#1c1917] uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#e7e5e4]">
          <p className="text-sm text-[#78716c] text-center">
            {copyright || defaultCopyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
