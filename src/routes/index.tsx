import { createFileRoute } from "@tanstack/react-router";
import Biriyaniwala from "@/components/Biriyaniwala";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mr. Biriyaniwala — Dum Biryani & Tandoor" },
      { name: "description", content: "Slow-cooked dum biryani, butter chicken, tandoori and more. Scroll the menu, dish by dish." },
      { property: "og:title", content: "Mr. Biriyaniwala — Dum Biryani & Tandoor" },
      { property: "og:description", content: "Slow-cooked dum biryani, butter chicken, tandoori and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Biriyaniwala,
});
