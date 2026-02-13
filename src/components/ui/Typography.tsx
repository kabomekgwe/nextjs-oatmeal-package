import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Typography components following Oatmeal design system
 * Provides consistent text styling across the application
 */

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  weight?: "normal" | "medium" | "semibold" | "bold";
  balance?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as: Component = "h2",
      size,
      weight = "semibold",
      balance = true,
      children,
      ...props
    },
    ref
  ) => {
    // Default sizes based on heading level
    const defaultSizes: Record<string, string> = {
      h1: "xl",
      h2: "lg",
      h3: "md",
      h4: "sm",
      h5: "xs",
      h6: "xs",
    };

    const finalSize = size || defaultSizes[Component];

    const sizes = {
      xl: "text-4xl sm:text-5xl lg:text-6xl",
      lg: "text-3xl sm:text-4xl lg:text-5xl",
      md: "text-2xl sm:text-3xl lg:text-4xl",
      sm: "text-xl sm:text-2xl lg:text-3xl",
      xs: "text-lg sm:text-xl lg:text-2xl",
    };

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "tracking-tight text-[#1c1917]",
          sizes[finalSize as keyof typeof sizes],
          weights[weight],
          balance && "text-balance",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold";
  color?: "default" | "muted" | "primary";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size = "base",
      weight = "normal",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    };

    const colors = {
      default: "text-[#1c1917]",
      muted: "text-[#78716c]",
      primary: "text-[#84cc16]",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed",
          sizes[size],
          weights[weight],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

// Lead Text Component (for introductory paragraphs)
export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg";
}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    const sizes = {
      sm: "text-lg sm:text-xl",
      base: "text-xl sm:text-2xl",
      lg: "text-2xl sm:text-3xl",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed text-[#78716c]",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Lead.displayName = "Lead";

// Small Text Component (for captions, metadata, etc.)
export interface SmallProps extends React.HTMLAttributes<HTMLSpanElement> {
  weight?: "normal" | "medium";
  color?: "default" | "muted";
}

const Small = React.forwardRef<HTMLSpanElement, SmallProps>(
  (
    {
      className,
      weight = "normal",
      color = "muted",
      children,
      ...props
    },
    ref
  ) => {
    const weights = {
      normal: "font-normal",
      medium: "font-medium",
    };

    const colors = {
      default: "text-[#1c1917]",
      muted: "text-[#78716c]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "text-sm",
          weights[weight],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Small.displayName = "Small";

export { Heading, Text, Lead, Small };