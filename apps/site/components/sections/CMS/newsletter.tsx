import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function NewsLetter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container grid items-center gap-6 px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Experience the workflow the best frontend teams love.
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Let your team focus on shipping features instead of managing
            infrastructure with automated CI/CD.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign up to get notified when we launch.
            <Link className="underline underline-offset-2" href="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
