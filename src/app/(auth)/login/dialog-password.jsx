import { Button } from "@/components/ui/button";
import DialogBase from "@/components/dialog";
import FormInput from "@/components/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string().trim().min(1, "아이디를 입력해 주세요."),
  email: z.string().trim().min(1, "이메일을 입력해 주세요."),
});

export function DialogPassword() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      email: "",
    },
  });

  function onSubmit(values, event) {
    event.preventDefault();
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }
  return (
    <DialogBase
      name="dialog-password"
      title="비밀번호 찾기/재설정"
      description="비밀번호를 찾고자하는 아이디 / 이메일 정보를 입력해주세요."
      // footer={<Button>변경사항 저장</Button>}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormInput
              control={form.control}
              name="userId"
              label="아이디"
              placeholder="admin"
            />
            <FormInput
              control={form.control}
              name="email"
              label="이메일"
              type="email"
              placeholder="admin@example.com"
            />
            <Button type="submit" className="w-full">
              다음
            </Button>
          </div>
        </form>
      </Form>
    </DialogBase>
  );
}
