import Image from 'next/image';
import { usePremiumContent } from '@/hooks/use-premium-content';
import { Icons } from '@/lib/data/icons';

interface PremiumImageProps {
  premiumSrc: string;
  freeSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function PremiumImage({
  premiumSrc,
  freeSrc,
  alt,
  width,
  height,
  className = '',
}: PremiumImageProps) {
  const { getImageUrl, isPro } = usePremiumContent();
  const imageUrl = getImageUrl(premiumSrc, freeSrc);

  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${!isPro ? 'filter blur-sm' : ''}`}
      />
      {!isPro && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="bg-white p-2 rounded-full">
            <Icons.lock className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      )}
    </div>
  );
} 