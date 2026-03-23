import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/components/shared/layout/navigation-items";
import { cn } from "@/lib/utils";

type SidebarProps = {
  compact?: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ compact = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium transition",
              compact ? "justify-center px-2" : "justify-start",
              isActive
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {!compact && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
