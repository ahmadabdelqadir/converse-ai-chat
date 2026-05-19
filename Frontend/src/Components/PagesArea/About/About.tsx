import { motion } from "framer-motion";
import { Logo } from "@/Components/Shared/Logo/Logo";
import { useTitle } from "@/Hooks/useTitle";

// One labelled section of the about page.
interface SectionProps {
  index: string;
  title: string;
  children: React.ReactNode;
}

function Section({ index, title, children }: SectionProps) {
  return (
    <section className="border-t border-edge py-9 first:border-t-0">
      <div className="grid gap-6 sm:grid-cols-[7rem_1fr]">
        <span className="font-display text-sm font-medium text-clay">{index}</span>
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">{title}</h2>
          <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink-soft">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

// The technologies behind the project.
const stack = [
  "React + TypeScript + Vite",
  "Tailwind CSS",
  "Python FastAPI REST API",
  "MySQL database",
  "OpenAI API",
];

export function About() {
  useTitle("Converse - About");

  return (
    <div className="stream-scroll h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 0.9, 0.32, 1] }}
        className="mx-auto w-full max-w-3xl px-5 py-14"
      >
        {/* Hero */}
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-clay">
          About
        </p>
        <h1 className="mt-3 font-display text-[3rem] font-medium leading-[1.1] text-ink">
          A calm place to think out loud.
        </h1>
        <div className="mt-6">
          <Logo />
        </div>

        {/* Sections */}
        <div className="mt-10">
          <Section index="01" title="The System">
            <p>
              Converse is a conversational AI Chatbot. You type a message, and it
              replies in context. The whole conversation is kept on
              screen, and every reply takes the earlier messages into account.
            </p>
            <p>
              Each conversation and every message is stored in a MySQL database, with
              a role recorded on each message so it is always clear whether the person
              or the chatbot said it. The request to OpenAI is made entirely on the
              server side, so the API key never reaches the browser.
            </p>
            <ul className="mt-4 space-y-1.5">
              {stack.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section index="02" title="The Programmer">
            <p>
              Built by <span className="font-medium text-ink">Ahmad Abd El Qadir</span>,
              a fullstack developer, as the Fourth project of the John Bryce Full Stack
              Web Developer course.
            </p>
            <p>
              The project combines : 
              Python, OOP, MySQL, REST API, React, and
              an integration with generative AI.
            </p>
          </Section>
        </div>

        <p className="mt-10 border-t border-edge pt-6 font-display text-sm text-ink-faint">
          Converse &mdash; conversations, considered.
        </p>
      </motion.div>
    </div>
  );
}
