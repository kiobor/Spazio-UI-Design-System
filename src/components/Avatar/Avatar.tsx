import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    return (
      <span
        className={cn(avatarVariants({ size }), className)}
        ref={ref}
        role={!showImage ? "img" : undefined}
        aria-label={!showImage ? alt : undefined}
        {...props}
      >
        {showImage ? (
          <img
            className="h-full w-full object-cover"
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-medium text-muted-foreground">{fallback}</span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants, type AvatarProps };
