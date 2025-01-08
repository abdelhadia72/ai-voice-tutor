import { useProStore } from '@/store/proStore';

export function usePremiumContent() {
  const { isPro } = useProStore();

  const getImageUrl = (premiumUrl: string, fallbackUrl: string) => {
    return isPro ? premiumUrl : fallbackUrl;
  };

  const canAccessPremiumContent = () => {
    return isPro;
  };

  return {
    getImageUrl,
    canAccessPremiumContent,
    isPro,
  };
} 