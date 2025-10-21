
import React from 'react';

export const KumruIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      fill="url(#paint0_linear_1_2)"
    />
    <path
      d="M12 6C9.24 6 7 8.24 7 11C7 12.76 7.85 14.33 9.1 15.3L9 15.5V17C9 17.55 9.45 18 10 18H14C14.55 18 15 17.55 15 17V15.5L14.9 15.3C16.15 14.33 17 12.76 17 11C17 8.24 14.76 6 12 6Z"
      fill="url(#paint1_linear_1_2)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A076F9" />
        <stop offset="1" stopColor="#6E44FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1_2"
        x1="7"
        y1="12"
        x2="17"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A076F9" />
        <stop offset="1" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
  </svg>
);
