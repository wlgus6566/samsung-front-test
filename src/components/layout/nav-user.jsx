"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { removeAccessToken } from "@/lib/token-utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import fetcher from "@/lib/fetcher";
import { useUserStore } from "@/store/user";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { user, clearUser } = useUserStore();

  // 사용자 정보가 없는 경우의 기본값
  const userName = user?.name || "사용자";
  const userEmail = user?.email || "guest@example.com";

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await fetcher("/api/v1/logout", { method: "GET" });

      // 클라이언트 측 토큰 제거
      removeAccessToken();

      // 사용자 정보 초기화
      clearUser();

      // 성공 메시지 표시
      toast.success("로그아웃되었습니다.");

      // 로그인 페이지로 리다이렉트
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);

      // API 호출 실패 시에도 클라이언트 측 토큰은 제거
      removeAccessToken();

      // 사용자 정보 초기화
      clearUser();

      toast.error("로그아웃 중 오류가 발생했습니다.");
      router.push("/login");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
