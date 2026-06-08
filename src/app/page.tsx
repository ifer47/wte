"use client";

import { signIn, signOut, signUp, useSession } from "@/lib/auth-client";
import {
  Alert,
  Button,
  Card,
  Input,
  Label,
  Separator,
  Spinner,
  Tabs,
  TextField,
} from "@heroui/react";
import { useState } from "react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type Mode = "sign-in" | "sign-up";

export default function Home() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const resetMessage = () => setMessage(null);

  const handleSignUp = async () => {
    resetMessage();
    setPending(true);
    const { data, error } = await signUp.email({ email, password, name });
    setPending(false);
    if (error) {
      setMessage({ type: "error", text: error.message ?? "注册失败" });
      return;
    }
    setMessage({
      type: "success",
      text: data?.user ? `欢迎，${data.user.name}` : "注册成功",
    });
  };

  const handleSignIn = async () => {
    resetMessage();
    setPending(true);
    const { data, error } = await signIn.email({ email, password });
    setPending(false);
    if (error) {
      setMessage({ type: "error", text: error.message ?? "登录失败" });
      return;
    }
    setMessage({
      type: "success",
      text: data?.user ? `已登录：${data.user.email}` : "登录成功",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    setMessage(null);
  };

  const handleGitHubSignIn = async () => {
    resetMessage();
    setPending(true);
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    setPending(false);
    if (error) {
      setMessage({
        type: "error",
        text: error.message ?? "GitHub 登录失败",
      });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "sign-up") void handleSignUp();
    else void handleSignIn();
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 py-8">
        <Card className="w-full max-w-sm">
          <Card.Header className="text-center">
            <Card.Title>{session.user.name}</Card.Title>
            <Card.Description>{session.user.email}</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button
              variant="outline"
              className="w-full"
              onPress={() => void handleSignOut()}
            >
              退出登录
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-8">
      <Card className="w-full max-w-sm">
        <Card.Header className="pb-0">
          <Tabs
            selectedKey={mode}
            onSelectionChange={(key) => {
              setMode(key as Mode);
              resetMessage();
            }}
            className="w-full"
            variant="secondary"
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="认证方式" className="w-full">
                <Tabs.Tab id="sign-in">
                  登录
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="sign-up">
                  注册
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </Card.Header>

        <Card.Content>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              isDisabled={pending}
              className="w-full"
              onPress={() => void handleGitHubSignIn()}
            >
              <GitHubIcon className="size-4" />
              GitHub 登录
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted">或</span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {mode === "sign-up" && (
                <TextField name="name">
                  <Label>姓名</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="你的名字"
                    autoComplete="name"
                  />
                </TextField>
              )}

              <TextField name="email" type="email">
                <Label>邮箱</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </TextField>

              <TextField name="password" type="password">
                <Label>密码</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少 8 位"
                  autoComplete={
                    mode === "sign-up" ? "new-password" : "current-password"
                  }
                />
              </TextField>

              {message && (
                <Alert status={message.type === "error" ? "danger" : "success"}>
                  <Alert.Content>
                    <Alert.Description>{message.text}</Alert.Description>
                  </Alert.Content>
                </Alert>
              )}

              <Button
                type="submit"
                isDisabled={pending}
                className="w-full"
              >
                {pending ? (
                  <>
                    <Spinner size="sm" color="current" />
                    处理中…
                  </>
                ) : mode === "sign-up" ? "注册" : "登录"}
              </Button>
            </form>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}