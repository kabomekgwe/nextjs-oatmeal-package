"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface HeaderProps {
  logo?: {
    src?: string;
    alt?: string;
    text?: string;
  };
  navigation: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
}

export function Header({
  logo,
  navigation,
  cta,
}: HeaderProps) {
  // Return null if no navigation provided
  if (!navigation || navigation.length === 0) {
    return null;
  }

  // Default logo values
  const logoAlt = logo?.alt || "Oatmeal";
  const logoText = logo?.text || "Oatmeal";
  const logoSrc = logo?.src;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[#e7e5e4]"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 py-2",
                    isActive(item.href)
                      ? "text-[#1c1917]"
                      : "text-[#78716c] hover:text-[#1c1917]"
                  )}
                >
                  {item.label}
                </Link>
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#84cc16] rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href={cta.href}>
              <Button size="sm">{cta.label}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#57534e] hover:text-[#1c1917] transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-white border-b border-[#e7e5e4] shadow-lg transition-all duration-200",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <Container className="py-6">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium py-2 transition-colors",
                  isActive(item.href)
                    ? "text-[#84cc16]"
                    : "text-[#57534e] hover:text-[#1c1917]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#e7e5e4]">
              <Link href={cta.href} className="block w-full">
                <Button className="w-full">{cta.label}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
