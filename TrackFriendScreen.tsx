import { Screen } from "../components/Screen";
import { ArrowLeft, Check, Navigation } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useChat } from "../context/ChatContext";
import { useFindFriends } from "../context/FindFriendsContext";
import { useEffect, useMemo, useState } from "react";

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function TrackFriendScreen() {
  const navigate = useNavigate();
  const { friendId } = useParams<{ friendId: string }>();
  const { getThread } = useChat();
  const {
    yourLocation,
    locationError,
    isWatchingLocation,
    getDistanceToFriend,
    getBearingToFriend,
    isFriendNearby,
    initFriendLocationForTracking,
    simulateFriendNearby,
    friendLocations,
  } = useFindFriends();

  const friend = friendId ? getThread(friendId) : null;
  const [initialized, setInitialized] = useState(false);

  const distance = friendId ? getDistanceToFriend(friendId) : null;
  const bearingDeg = friendId ? getBearingToFriend(friendId) : null;
  const nearby = friendId ? isFriendNearby(friendId) : false;
  const hasFriendPosition = friendId && friendLocations[friendId];

  useEffect(() => {
    if (friendId && yourLocation && !initialized) {
      initFriendLocationForTracking(friendId);
      setInitialized(true);
    }
  }, [friendId, yourLocation, initialized, initFriendLocationForTracking]);

  const showDemoNearby = useMemo(
    () => !!friendId && !!yourLocation && !nearby && hasFriendPosition,
    [friendId, yourLocation, nearby, hasFriendPosition]
  );

  if (!friendId || !friend) {
    navigate("/find", { replace: true });
    return null;
  }

  return (
    <Screen title="Track Friend">
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button
          onClick={() => navigate("/find")}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {locationError ? (
          <div className="text-center">
            <p className="text-white/80 font-medium mb-2">Location needed</p>
            <p className="text-white/50 text-sm mb-4">{locationError}</p>
            <p className="text-white/40 text-xs max-w-[280px]">
              Allow location access in your browser or device settings to find {friend.name}.
            </p>
          </div>
        ) : !yourLocation && isWatchingLocation ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-fuchsia-500/50 border-t-fuchsia-400 animate-spin mx-auto mb-4" />
            <p className="text-white/70 text-sm">Getting your location…</p>
          </div>
        ) : nearby ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-6">
              <Check size={48} className="text-emerald-400" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight font-serif italic mb-2">
              You're close!
            </h2>
            <p className="text-emerald-300/90 text-lg font-semibold mb-1">
              Explore together and have fun
            </p>
            <p className="text-white/50 text-sm">You and {friend.name} are nearby.</p>
          </div>
        ) : (
          <>
            <div
              className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative"
              style={{
                transform: bearingDeg != null ? `rotate(${bearingDeg}deg)` : undefined,
              }}
            >
              <Navigation
                size={80}
                className="text-fuchsia-400 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                strokeWidth={2}
              />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">{friend.name}</h2>
            {distance != null && (
              <p className="text-3xl font-black text-fuchsia-300 tracking-tighter mb-2">
                {formatDistance(distance)}
              </p>
            )}
            <p className="text-white/50 text-sm mb-8">
              {bearingDeg != null
                ? "Arrow points to your friend"
                : "Waiting for location…"}
            </p>

            {showDemoNearby && (
              <button
                type="button"
                onClick={() => friendId && simulateFriendNearby(friendId)}
                className="px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
              >
                Simulate: they're nearby
              </button>
            )}
          </>
        )}
      </div>
    </Screen>
  );
}
