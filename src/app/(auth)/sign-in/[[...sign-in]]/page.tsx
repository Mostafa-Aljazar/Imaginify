"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Image from "next/image";
import { AI_LOGO } from "@/assets/common";

export default function SignInPage() {
  return (
    <div className="sm:justify-center items-center grid bg-background mx-auto px-4 pt-30 pb-16 w-full grow">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              {/* Start step */}
              <SignIn.Step name="start">
                <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96 text-center">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-center gap-x-2">
                        <span className="font-bold text-primary text-lg">
                          Sign in to Imaginify
                        </span>
                        <Image
                          src={AI_LOGO}
                          width={20}
                          height={20}
                          alt="Imaginify Logo"
                        />
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Welcome back! Please sign in to continue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="gap-y-4 grid">
                    {/* Social logins */}
                    <div className="gap-x-4 grid grid-cols-2">
                      <Clerk.Connection name="github" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:github">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Clerk.Icon className="mr-2 size-4" />
                                  GitHub
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Clerk.Icon className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>

                    {/* Divider */}
                    <p className="flex before:flex-1 after:flex-1 items-center gap-x-3 before:bg-border after:bg-border before:h-px after:h-px text-muted-foreground text-sm">
                      or
                    </p>

                    {/* Email input */}
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-destructive text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="gap-y-4 grid w-full">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                      <Button variant="link" size="sm" asChild>
                        <Clerk.Link navigate="sign-up">
                          Don&apos;t have an account? Sign up
                        </Clerk.Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              {/* Choose strategy step */}
              <SignIn.Step name="choose-strategy">
                <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96 text-center">
                  <CardHeader>
                    <CardTitle>Use another method</CardTitle>
                    <CardDescription>
                      Choose one of the available options below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="gap-y-4 grid">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <SignIn.Action navigate="previous" asChild>
                      <Button disabled={isGlobalLoading}>
                        <Clerk.Loading>
                          {(isLoading) =>
                            isLoading ? (
                              <Loader className="size-4 animate-spin" />
                            ) : (
                              "Go back"
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              {/* Password step */}
              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96 text-center">
                    <CardHeader>
                      <CardTitle>Enter your password</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="gap-y-4 grid">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-destructive text-sm" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="gap-y-4 grid w-full">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) =>
                                isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button type="button" size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                {/* Email code step */}
                <SignIn.Strategy name="email_code">
                  <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96 text-center">
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-muted-foreground text-sm">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="gap-y-4 grid">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>
                        <div className="justify-center gap-y-2 grid">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => (
                                <div
                                  data-status={status}
                                  className="relative flex justify-center items-center shadow-sm border-input border-y border-r first:border-l last:rounded-r-md first:rounded-l-md data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-1 data-[status=selected]:ring-ring w-9 h-9 text-sm transition-all"
                                >
                                  {value}
                                </div>
                              )}
                            />
                          </div>
                          <Clerk.FieldError className="block text-destructive text-sm text-center" />
                          <SignIn.Action
                            asChild
                            resend
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled>
                                Didn&apos;t receive a code? Resend (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button variant="link" size="sm">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="gap-y-4 grid w-full">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) =>
                                isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
