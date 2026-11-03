import { cn } from "@/lib/cn";

type PhoneFrameProps = { children: React.ReactNode; className?: string };

/** Pure-CSS phone with notch. Width is controlled by the parent via className. */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn("relative aspect-[9/19] w-[260px] rounded-[2.6rem] bg-gray-900 p-2.5 shadow-float ring-1 ring-black/10", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
        <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-900" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
