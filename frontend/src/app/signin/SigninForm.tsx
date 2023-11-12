"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StrapiAuthActionResponse, StrapiAuthResponse } from "@/types/strapi-custom-types";

import { useRouter } from "next/navigation";
import { renderMessage } from "@/lib/render-message";
import { useAppContext } from "@/context/AppContext";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginAction from "@/actions/login-action";

const formSchema = z.object({
  identifier: z.string().min(2).max(50),
  password: z.string().min(8).max(100),
});

const SigninForm = () => {
  const router = useRouter();
  const { setUser } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = (await loginAction(values)) as StrapiAuthActionResponse;
    if (result.ok) {
      setUser(result.data as StrapiAuthResponse);
      renderMessage("Logged in successfully", "success");
      router.push("/dashboard");
    } else result.error && renderMessage(result.error.message, "error");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
      <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                And start creating events
              </p>
            </div>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input placeholder="Eventlerite" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*************" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Use a good, long, unique password. Not pass123.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-primary hover:bg-accent" type="submit">
          Submit
        </Button>
        <FormDescription>
          <Link href="/register" className="hover:text-accent">
            Don't have an account? Register here.
          </Link>
        </FormDescription>
      </form>
    </Form>
  );
};

export default SigninForm;
