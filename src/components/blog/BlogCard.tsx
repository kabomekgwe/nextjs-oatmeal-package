import Link from "next/link";
import { Heading, Text, Small } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatDate, calculateReadingTime } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt?: string;
  slug: string;
  date: string;
  author?: {
    name: string;
    avatar?: string;
  };
  featuredImage?: string;
  category?: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  date,
  author,
  featuredImage,
  category,
  className,
}: BlogCardProps) {
  const readingTime = excerpt ? calculateReadingTime(excerpt) : 3;

  return (
    <article
      className={cn(
        "group flex flex-col bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden hover:shadow-lg transition-all duration-200",
        className
      )}
    >
      {/* Image */}
      <Link href={`/blog/${slug}`} className="relative aspect-[16/9] overflow-hidden">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#f5f5f4] flex items-center justify-center">
            <span className="text-4xl font-bold text-[#e7e5e4]">O</span>
          </div>
        )}
        {category && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#84cc16]">
            {category}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <Link href={`/blog/${slug}`} className="block mb-3">
          <Heading as="h3" size="xs" className="group-hover:text-[#84cc16] transition-colors line-clamp-2">
            {title}
          </Heading>
        </Link>

        {excerpt && (
          <Text size="sm" color="muted" className="mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </Text>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#e7e5e4]">
          {author && (
            <>
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#ecfccb] flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#65a30d]">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
              <Small weight="medium">{author.name}</Small>
            </>
          )}
          <Small color="muted" className="ml-auto">
            {formatDate(date)} · {readingTime} min read
          </Small>
        </div>
      </div>
    </article>
  );
}
