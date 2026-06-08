"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Input, Popover, Separator, Skeleton } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import favicon from "@/app/icon.svg";

export default function Header() {
  const { data: session, isPending } = useSession();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={favicon} alt="Logo" width={22} height={22} />
          <span className="text-lg font-bold">DISCUSS</span>
        </Link>

        <div className="hidden flex-1 justify-center sm:flex">
          <Input placeholder="搜索…" className="max-w-xs" />
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <Skeleton className="size-8 rounded-full" />
          ) : session?.user ? (
            <Popover>
              <Popover.Trigger>
                <button className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Avatar size="sm">
                    <Avatar.Image
                      src={
                        session.user.image ||
                        "https://avatars.githubusercontent.com/u/172476270?s=40&v=4"
                      }
                      alt={session.user.name || "用户头像"}
                    />
                    <Avatar.Fallback>
                      {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </button>
              </Popover.Trigger>
              <Popover.Content placement="bottom end" offset={8}>
                <Popover.Dialog className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image
                        src={
                          session.user.image ||
                          "https://avatars.githubusercontent.com/u/172476270?s=40&v=4"
                        }
                        alt={session.user.name || "用户头像"}
                      />
                      <Avatar.Fallback>
                        {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="font-medium">{session.user.name}</span>
                  </div>
                  <Separator className="my-3" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onPress={() => void signOut()}
                  >
                    退出登录
                  </Button>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="outline">
                  登录
                </Button>
              </Link>
              <Link href="/login?tab=sign-up">
                <Button size="sm" variant="secondary">
                  注册
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </nav>
  );
}