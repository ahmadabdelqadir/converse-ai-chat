import { Header } from "@/Components/LayoutArea/Header/Header";
import { Routing } from "@/Components/LayoutArea/Routing/Routing";

// App shell: the header sits on top, the routed page fills the rest.
export function Layout() {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        <Routing />
      </main>
    </div>
  );
}
