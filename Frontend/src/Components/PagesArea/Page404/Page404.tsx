import { Link } from "react-router-dom";
import { Logo } from "@/Components/Shared/Logo/Logo";
import { Button } from "@/Components/ui/button";
import { useTitle } from "@/Hooks/useTitle";

// Shown for any route that does not exist.
export function Page404() {
  useTitle("Converse - Page not found");

  return (
    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
      <Logo markOnly className="mb-7 scale-[1.6]" />
      <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-clay">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-[2.6rem] font-medium leading-tight text-ink">
        This page slipped away.
      </h1>
      <p className="mt-3 max-w-sm text-[0.97rem] leading-relaxed text-ink-soft">
        The page you were looking for does not exist. Let&rsquo;s get you back to
        the conversation.
      </p>
      <Link to="/" className="mt-7">
        <Button>Back to chat</Button>
      </Link>
    </div>
  );
}
