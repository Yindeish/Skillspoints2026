export { cn } from "cn"

export type ExpiryCheck = {
  /** true when the current time is between createdAt and expiresAt */
  isValid: boolean;
  /** true when the current time is at or past expiresAt */
  isExpired: boolean;
  /** true when the dates are invalid or expiresAt is not after createdAt */
  isInvalidRange: boolean;
  /** milliseconds left until expiry (0 if already expired) */
  msRemaining: number;
  /** total lifetime in milliseconds (expiresAt - createdAt) */
  lifetimeMs: number;
};

/**
 * Compares the date something was created with the date it expires,
 * and checks both against the current time.
 *
 * @param createdAt - when the thing was created
 * @param expiresAt - when the thing expires
 * @param now - the time to check against (defaults to the current time; handy for tests)
 */
export type ExpiryCheck = {
  /** true when the current time is between createdAt and expiresAt */
  isValid: boolean;
  /** true when the current time is at or past expiresAt */
  isExpired: boolean;
  /** true when the dates are invalid or expiresAt is not after createdAt */
  isInvalidRange: boolean;
  /** milliseconds left until expiry (0 if already expired) */
  msRemaining: number;
  /** total lifetime in milliseconds (expiresAt - createdAt) */
  lifetimeMs: number;
};

/**
 * Compares the date something was created with the date it expires,
 * and checks both against the current time.
 *
 * @param createdAt - when the thing was created
 * @param expiresAt - when the thing expires
 * @param now - the time to check against (defaults to the current time; handy for tests)
 */
export type ExpiryCheck = {
  /** true when the current time is between createdAt and expiresAt */
  isValid: boolean;
  /** true when the current time is at or past expiresAt */
  isExpired: boolean;
  /** true when the dates are invalid or expiresAt is not after createdAt */
  isInvalidRange: boolean;
  /** milliseconds left until expiry (0 if already expired) */
  msRemaining: number;
  /** total lifetime in milliseconds (expiresAt - createdAt) */
  lifetimeMs: number;
};

/**
 * Compares the date something was created with the date it expires,
 * and checks both against the current time.
 *
 * @param createdAt - when the thing was created
 * @param expiresAt - when the thing expires
 * @param now - the time to check against (defaults to the current time; handy for tests)
 */
export function compareExpiry(
  createdAt: Date | string | number,
  expiresAt: Date | string | number,
  now: Date | string | number = new Date(),
): ExpiryCheck {
  const created = new Date(createdAt).getTime();
  const expires = new Date(expiresAt).getTime();
  const current = new Date(now).getTime();

  const isInvalidRange =
    Number.isNaN(created) ||
    Number.isNaN(expires) ||
    Number.isNaN(current) ||
    expires <= created;

  if (isInvalidRange) {
    return {
      isValid: false,
      isExpired: true,
      isInvalidRange: true,
      msRemaining: 0,
      lifetimeMs: 0,
    };
  }

  const isExpired = current >= expires;

  return {
    isValid: !isExpired && current >= created,
    isExpired,
    isInvalidRange: false,
    msRemaining: Math.max(0, expires - current),
    lifetimeMs: expires - created,
  };
}
