import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

const NEARBY_METERS = 50;

export type Coords = { lat: number; lng: number };

export function haversineDistance(a: Coords, b: Coords): number {
  const R = 6371e3; // metres
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;
  const x = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

/** Bearing in degrees 0–360 from a to b (0 = North, 90 = East). */
export function bearing(a: Coords, b: Coords): number {
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  let θ = (Math.atan2(y, x) * 180) / Math.PI;
  return (θ + 360) % 360;
}

export function isNearby(distanceMeters: number): boolean {
  return distanceMeters <= NEARBY_METERS;
}

type FindFriendsContextValue = {
  yourLocation: Coords | null;
  locationError: string | null;
  isWatchingLocation: boolean;
  friendLocations: Record<string, Coords>;
  setFriendLocation: (friendId: string, coords: Coords) => void;
  /** Simulate friend nearby (for demo): sets their position to yours so "Explore together" shows. */
  simulateFriendNearby: (friendId: string) => void;
  /** Initialize friend's position when starting to track (e.g. ~400m away for demo). */
  initFriendLocationForTracking: (friendId: string) => void;
  getDistanceToFriend: (friendId: string) => number | null;
  getBearingToFriend: (friendId: string) => number | null;
  isFriendNearby: (friendId: string) => boolean;
};

const FindFriendsContext = React.createContext<FindFriendsContextValue | null>(null);

const OFFSET_ABOUT_400M = { lat: 0.0036, lng: 0.002 }; // ~400m north-east

export function FindFriendsProvider({ children }: { children: React.ReactNode }) {
  const [yourLocation, setYourLocation] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [friendLocations, setFriendLocationsState] = useState<Record<string, Coords>>({});
  const watchIdRef = useRef<number | null>(null);

  const setFriendLocation = useCallback((friendId: string, coords: Coords) => {
    setFriendLocationsState((prev) => ({ ...prev, [friendId]: coords }));
  }, []);

  const simulateFriendNearby = useCallback((friendId: string) => {
    setYourLocation((current) => {
      if (current) setFriendLocationsState((prev) => ({ ...prev, [friendId]: current }));
      return current;
    });
  }, []);

  const initFriendLocationForTracking = useCallback((friendId: string) => {
    setYourLocation((current) => {
      if (current) {
        const simulated: Coords = {
          lat: current.lat + OFFSET_ABOUT_400M.lat,
          lng: current.lng + OFFSET_ABOUT_400M.lng,
        };
        setFriendLocationsState((prev) => ({ ...prev, [friendId]: simulated }));
      }
      return current;
    });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported.");
      return;
    }
    setIsWatchingLocation(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setYourLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationError(null);
      },
      (err) => {
        setLocationError(err.message || "Location unavailable.");
        setYourLocation(null);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      setIsWatchingLocation(false);
    };
  }, []);

  const getDistanceToFriend = useCallback(
    (friendId: string): number | null => {
      const friend = friendLocations[friendId];
      if (!yourLocation || !friend) return null;
      return haversineDistance(yourLocation, friend);
    },
    [yourLocation, friendLocations]
  );

  const getBearingToFriend = useCallback(
    (friendId: string): number | null => {
      const friend = friendLocations[friendId];
      if (!yourLocation || !friend) return null;
      return bearing(yourLocation, friend);
    },
    [yourLocation, friendLocations]
  );

  const isFriendNearby = useCallback(
    (friendId: string): boolean => {
      const d = getDistanceToFriend(friendId);
      return d != null && isNearby(d);
    },
    [getDistanceToFriend]
  );

  const value: FindFriendsContextValue = {
    yourLocation,
    locationError,
    isWatchingLocation,
    friendLocations,
    setFriendLocation,
    simulateFriendNearby,
    initFriendLocationForTracking,
    getDistanceToFriend,
    getBearingToFriend,
    isFriendNearby,
  };

  return (
    <FindFriendsContext.Provider value={value}>{children}</FindFriendsContext.Provider>
  );
}

export function useFindFriends() {
  const ctx = useContext(FindFriendsContext);
  if (!ctx) throw new Error("useFindFriends must be used within FindFriendsProvider");
  return ctx;
}
