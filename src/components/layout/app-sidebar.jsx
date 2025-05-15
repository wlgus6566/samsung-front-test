"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bell,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ShieldUser,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

// This is sample data.
export const data = {
  user: {
    name: "홍길동",
    email: "test@example.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "관리자 관리",
      url: "/admin",
      icon: ShieldUser,
    },
    {
      title: "메인 관리",
      url: "/main",
      icon: LayoutDashboard,
      items: [
        {
          title: "마케팅배너 관리",
          url: "/main/marketing",
        },
      ],
    },
    {
      title: "KYA 관리",
      url: "/kya",
      icon: SquareTerminal,
      items: [
        {
          title: "정관/규정 관리",
          url: "/kya/regulation",
        },
        {
          title: "경영공시 관리",
          url: "/kya/management",
        },
      ],
    },
    {
      title: "요가 소식 관리",
      url: "/news",
      icon: Bell,
      items: [
        {
          title: "공지사항 관리",
          url: "/news/notices",
        },
        {
          title: "KYA뉴스 관리",
          url: "/news/kya",
        },
        {
          title: "갤러리 관리",
          url: "/news/gallery",
        },
        {
          title: "매거진 관리",
          url: "/news/magazine",
        },
      ],
    },
    {
      title: "대회 관리",
      url: "/contest",
      icon: SquareTerminal,
      items: [
        {
          title: "대회 안내 관리",
          url: "/contest/info",
        },
        {
          title: "대회 일정 관리",
          url: "/contest/schedule",
        },
        {
          title: "대회 결과 관리",
          url: "/contest/result",
        },
      ],
    },
    {
      title: "행사 안내 관리",
      url: "/events",
      icon: SquareTerminal,
      items: [
        {
          title: "행사 안내 관리",
          url: "/events/info",
        },
        {
          title: "세미나/워크샵 관리",
          url: "/events/seminar",
        },
      ],
    },
    {
      title: "요가 회원 관리",
      url: "/members",
      icon: SquareTerminal,
      items: [
        {
          title: "공식인증센터 관리",
          url: "/members/center",
        },
        {
          title: "생활체육요가지도사 관리",
          url: "/members/instructor",
        },
        {
          title: "인증교육기관 관리",
          url: "/members/education",
        },
      ],
    },
  ],
  /*projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],*/
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center h-12 border-b">
        {/*<TeamSwitcher teams={data.teams} />*/}
        <h1 className="px-2 text-xl">대한요가회</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
