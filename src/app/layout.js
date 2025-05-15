import { Toaster } from "@/components/ui/sonner";
import { SWRProviders } from "./providers";
import "@/styles/globals.css";
import AlertDialogBase from "@/components/dialog/alert";
import localFont from "next/font/local";

const SamsungOneKorean = localFont({
  src: [
    {
      path: "../fonts/SamsungOneKorean-400.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SamsungOneKorean-500.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SamsungOneKorean-600.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SamsungOneKorean-700.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-samsung",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const Poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata = {
  title: "삼성전자 스마트 공장",
  description: "삼성전자 스마트 공장 공식 웹사이트",
  openGraph: {
    title: "삼성전자 스마트 공장",
    description: "삼성전자 스마트 공장 공식 웹사이트",
    url: `${process.env.NEXT_PUBLIC_PC_DOMAIN}`,
    siteName: "삼성전자 스마트 공장",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PC_DOMAIN}/images/meta.jpg`,
        width: 1200,
        height: 630,
        alt: "삼성전자 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={` ${SamsungOneKorean.variable} ${Poppins.variable}`}
    >
      <body>
        <SWRProviders>
          {children}
          <Toaster />
          <AlertDialogBase />
        </SWRProviders>
      </body>
    </html>
  );
}
