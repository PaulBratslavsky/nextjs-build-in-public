import { QuoteIcon, CheckCircle2 } from "lucide-react";

export default function Quote() {
  return (
    <div className="bg-muted mt-8 p-8 md:p-12 rounded-3xl grid grid-cols-[4rem,auto] items-center">
      <QuoteIcon className="rotate-180 h-12 w-12 text-muted-foreground/10 fill-foreground/20 self-start" />
      <p className="leading-relaxed text-lg text-muted-foreground">
        "Mus delectus incidunt tincidunt, placerat nobis dolore maiores etiam
        porttitor! Quo auctor laudantium praesent eleifend.Quia dignissimos
        quidem lectus nulla. "
      </p>
    </div>
  );
}
