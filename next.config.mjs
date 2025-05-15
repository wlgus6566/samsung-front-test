/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_URL,
      },
    ],
  },
  // API 요청 리다이렉트 설정 (CORS 해결)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

// 빌드 시 환경 변수 로그 출력
console.log("--- Build Environment Variables ---");
console.log("NODE_ENV:", process.env.NODE_ENV); // 'production'으로 나올 가능성이 높음
console.log(
  "NEXT_PUBLIC_APP_BASE_URL (from build env):",
  process.env.NEXT_PUBLIC_APP_BASE_URL
);
console.log("---------------------------------");

export default nextConfig;
