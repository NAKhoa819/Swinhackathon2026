import Constants from 'expo-constants';
import { Platform } from 'react-native';

function normalizeHost(host: string): string {
  if (!host) {
    return host;
  }

  return host.replace(/:\d+$/, '');
}

function getExpoHost(): string | null {
  const hostUri = Constants.expoConfig?.hostUri ?? null;
  if (!hostUri) {
    return null;
  }

  const host = normalizeHost(hostUri.split(':')[0] ?? '');
  return host || null;
}

export function getApiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  }

  const expoHost = getExpoHost();
  if (expoHost) {
    return `http://${expoHost}:8000`;
  }

  return 'http://localhost:8000';
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, init);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? `Request failed: ${res.status}`);
  }

  return data as T;
}
