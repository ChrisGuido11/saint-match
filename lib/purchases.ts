// RevenueCat mock for Expo Go development
// Replace with actual react-native-purchases when using custom dev client

import AsyncStorage from '@react-native-async-storage/async-storage';

const PRO_STATUS_KEY = '@saint_match_pro_status';

export interface Package {
  identifier: string;
  product: {
    title: string;
    priceString: string;
    description: string;
  };
}

const PACKAGES: Package[] = [
  {
    identifier: 'pro_monthly',
    product: {
      title: 'Pro Monthly',
      priceString: '$7.99/mo',
      description: 'Unlimited daily saint matches, full Virtue Portfolio analytics, and streak protection.',
    },
  },
  {
    identifier: 'pro_annual',
    product: {
      title: 'Pro Annual',
      priceString: '$79/yr',
      description: 'Save 17%! All Pro features for one year.',
    },
  },
];

export async function initPurchases(): Promise<void> {
  // In production, initialize RevenueCat SDK here
  // await Purchases.configure({ apiKey: ... })
}

export async function getOfferings(): Promise<Package[]> {
  return PACKAGES;
}

export async function purchasePro(packageIdentifier: string): Promise<boolean> {
  // Mock purchase for development
  await AsyncStorage.setItem(PRO_STATUS_KEY, 'true');
  return true;
}

export async function restorePurchases(): Promise<boolean> {
  const status = await AsyncStorage.getItem(PRO_STATUS_KEY);
  return status === 'true';
}

export async function checkProStatus(): Promise<boolean> {
  const status = await AsyncStorage.getItem(PRO_STATUS_KEY);
  return status === 'true';
}

export async function resetProStatus(): Promise<void> {
  await AsyncStorage.removeItem(PRO_STATUS_KEY);
}
