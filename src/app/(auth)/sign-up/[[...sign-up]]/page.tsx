"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import { AI_LOGO } from "@/assets/common";

export default function SignUpPage() {
  return (
    <div className="relative sm:justify-center items-center grid bg-background mx-auto px-4 pt-30 pb-16 w-full grow">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              {/* Overlay */}
              {isGlobalLoading && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-background/70 backdrop-blur-sm">
                  <Loader className="size-10 text-primary animate-spin" />
                </div>
              )}

              {/* Start step */}
              <SignUp.Step name="start">
                <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96 text-center">
                  <CardHeader>
                    <div className="flex justify-center gap-x-2">
                      <Image
                        src={AI_LOGO}
                        width={20}
                        height={20}
                        alt="Imaginify Logo"
                      />
                      <span className="font-bold text-primary text-lg">
                        Create your account
                      </span>
                    </div>

                    <CardDescription>
                      Welcome! Please fill in the details to get started
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
                          className="hover:bg-gray-800/50"
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
                          className="hover:bg-gray-600/50"
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

                    {/* Email */}
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-destructive text-sm" />
                    </Clerk.Field>

                    {/* Password */}
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-destructive text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="gap-y-4 grid w-full">
                      <SignUp.Captcha className="empty:hidden" />
                      <SignUp.Action submit asChild>
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
                      </SignUp.Action>
                      <Button variant="link" size="sm" asChild>
                        <Clerk.Link navigate="sign-in">
                          Already have an account? Sign in
                        </Clerk.Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              {/* Continue step */}
              <SignUp.Step name="continue">
                <Card className="bg-background md:bg-gray-50 md:shadow-lg border-amber-400 border-none w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Complete registration</CardTitle>
                    <CardDescription>
                      Set up your account details below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="gap-y-4 grid">
                    {/* Username */}
                    <Clerk.Field name="username" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Username</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-destructive text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <SignUp.Action submit asChild>
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
                    </SignUp.Action>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              {/* Verification step */}
              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="bg-background md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96">
                    <CardHeader>
                      <CardTitle className="text-center">
                        Verify your email
                      </CardTitle>
                      <CardDescription className="text-center">
                        Enter the code sent to your email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="gap-y-4 grid">
                      <div className="justify-center items-center gap-y-2 grid">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">
                            Email code
                          </Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => (
                                <div
                                  data-status={status}
                                  className={cn(
                                    "relative flex justify-center items-center shadow-sm border-input border-y border-r first:border-l last:rounded-r-md first:rounded-l-md w-10 h-10 text-sm transition-all",
                                    {
                                      "z-10 ring-2 ring-ring ring-offset-background":
                                        status === "cursor" ||
                                        status === "selected",
                                    }
                                  )}
                                >
                                  {value}
                                  {status === "cursor" && (
                                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                                      <div className="bg-foreground w-px h-4 animate-caret-blink duration-1000" />
                                    </div>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                          <Clerk.FieldError className="block text-destructive text-sm text-center" />
                        </Clerk.Field>
                        <SignUp.Action
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
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="text-center"
                        >
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
                      </SignUp.Action>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
