"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogPassword } from "@/app/(auth)/login/dialog-password";
import { useDialogStore } from "@/store/dialog";
import FormInput from "@/components/form/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import { useUserStore } from "@/store/user";

const formSchema = z.object({
  managerId: z.string().trim().min(1, "아이디를 입력해 주세요."),
  password: z.string().trim().min(1, "비밀번호를 입력해 주세요."),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const { alert, dialogOpen } = useDialogStore();
  const { setUser } = useUserStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managerId: "",
      password: "",
    },
  });

  async function onSubmit(values, event) {
    event.preventDefault();
    try {
      const res = await fetcher("/api/v1/login", {
        method: "POST",
        body: values,
      });

      // 토큰 저장
      Cookies.set("accessToken", res.accessToken, {
        expires: new Date(res.accessTokenExpiredDt),
      });

      // 사용자 정보를 스토어에 저장
      setUser({
        name: res.name,
        //email: res.email,
      });

      toast(`${res.name}님 환영 합니다.`);
      router.push("/main/marketing");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_LOGIN_001") {
        await alert({
          title: "아이디 또는 비밀번호가 일치하지 않습니다.",
          text: "입력한 내용을 다시 확인해 주세요.",
        });
      } else if (error.code === "ERR_LOGIN_002") {
        await alert({
          title: "휴면 회원 입니다.",
          text: "담당자(emotion@emotion.co.kr)에게 문의해주세요.",
        });
      } else {
        await alert({
          title: "알 수 없는 에러가 발생했습니다.",
          text: "잠시 후 다시 시도해주세요.",
        });
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">대한요가회 관리자 로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormInput
                  control={form.control}
                  name="managerId"
                  label="아이디"
                />
                <FormInput
                  control={form.control}
                  name="password"
                  label="비밀번호"
                  // labelSide={
                  //   <Button
                  //     variant="goust"
                  //     type="button"
                  //     size={"small"}
                  //     className="ml-auto p-0 text-sm underline-offset-4 hover:underline"
                  //     onClick={() => {
                  //       dialogOpen("dialog-password");
                  //     }}
                  //   >
                  //     비밀번호 찾기/재설정
                  //   </Button>
                  // }
                  type="password"
                />
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </div>
              {/* <div className="mt-4 text-center text-sm">
                아이디를 잊어버린 경우,
                <br />
                담당자(emotion@emotion.co.kr)에게 문의해주세요.
              </div> */}
            </form>
          </Form>
        </CardContent>
      </Card>
      <DialogPassword />
    </div>
  );
}
