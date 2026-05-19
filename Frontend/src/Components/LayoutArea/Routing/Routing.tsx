import { Route, Routes } from "react-router-dom";
import { Home } from "@/Components/PagesArea/Home/Home";
import { About } from "@/Components/PagesArea/About/About";
import { Page404 } from "@/Components/PagesArea/Page404/Page404";

// All client-side routes of the single-page app.
export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
