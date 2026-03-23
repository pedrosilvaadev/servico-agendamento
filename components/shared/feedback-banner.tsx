import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type FeedbackType = "success" | "error" | "info";

type FeedbackBannerProps = {
  type: FeedbackType;
  message: string;
  className?: string;
};

const feedbackStyles: Record<FeedbackType, string> = {
  success: "border-emerald-300/70 bg-emerald-50 text-emerald-900",
  error: "border-red-300/70 bg-red-50 text-red-900",
  info: "border-sky-300/70 bg-sky-50 text-sky-900",
};

const icons: Record<FeedbackType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function FeedbackBanner({ type, message, className }: FeedbackBannerProps) {
  const Icon = icons[type];

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
        feedbackStyles[type],
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
