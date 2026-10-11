"use client";

import { useState } from "react";

const avatarColors = [
  {
    background: "#e6f1ea",
    skin: "#dba782",
    hair: "#263b30",
    shirt: "#008a45",
  },
  {
    background: "#e8eef8",
    skin: "#c98e68",
    hair: "#272c3c",
    shirt: "#526ba2",
  },
  {
    background: "#f5ebdf",
    skin: "#e5b994",
    hair: "#49372f",
    shirt: "#ad7652",
  },
  {
    background: "#f0e9f4",
    skin: "#b97955",
    hair: "#2e2936",
    shirt: "#8568a4",
  },
];

function DefaultAvatar({ user }) {
  const seed = user?.id || user?.name || "Bazar Dor";

  const hash = Array.from(seed).reduce(
    (value, character) =>
      (value * 31 + character.charCodeAt(0)) >>> 0,
    0
  );

  const colors = avatarColors[hash % avatarColors.length];

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="100"
        height="100"
        fill={colors.background}
      />

      <circle
        cx="50"
        cy="44"
        r="37"
        fill="#ffffff"
        opacity="0.35"
      />

      <path
        d="M9 100C11 80 27 71 50 71C73 71 89 80 91 100Z"
        fill={colors.shirt}
      />

      <path
        d="M41 65H59V81C59 89 41 89 41 81Z"
        fill={colors.skin}
      />

      <ellipse
        cx="50"
        cy="44"
        rx="22"
        ry="27"
        fill={colors.skin}
      />

      <path
        d="M28 44C26 22 35 13 50 13C67 13 75 25 72 45C68 37 67 29 61 25C55 36 41 38 30 37Z"
        fill={colors.hair}
      />

      <circle cx="42" cy="48" r="1.8" fill="#333333" />
      <circle cx="58" cy="48" r="1.8" fill="#333333" />

      <path
        d="M45 60C48 63 52 63 55 60"
        stroke="#945e4b"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function UserAvatar({
  user,
  size = 38,
  radius = 10,
}) {
  const [failedImage, setFailedImage] = useState(null);

  const profileImage =
    typeof user?.image === "string"
      ? user.image.trim()
      : "";

  const showProfileImage =
    profileImage && failedImage !== profileImage;

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden bg-[#e6f1ea]"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
      }}
    >
      {showProfileImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profileImage}
          alt={`${user?.name || "User"} profile`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailedImage(profileImage)}
        />
      ) : (
        <DefaultAvatar user={user} />
      )}
    </span>
  );
}