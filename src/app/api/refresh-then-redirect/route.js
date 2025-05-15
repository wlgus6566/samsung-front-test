// app/api/refresh-then-redirect/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TOKEN_CONFIG } from "@/lib/token-utils";

export async function GET(req) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get("to") || "/";
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", APP_BASE_URL));
  }

  const response = await fetch(TOKEN_CONFIG.REFRESH_API_ENDPOINT, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", APP_BASE_URL));
  }

  const { data } = await response.json();
  const accessToken = data?.accessToken;
  const maxAge = 60 * 15; // 15분

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", APP_BASE_URL));
  }

  const absoluteRedirectUrl = new URL(redirectTo, APP_BASE_URL);
  const res = NextResponse.redirect(absoluteRedirectUrl);
  res.cookies.set("accessToken", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return res;
}
