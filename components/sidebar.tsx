import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "right-0 top-0 flex h-full flex-col border-l-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn">
        <div className="flex items-center gap-x-3 pb-7 pr-4 pt-8">
          <Image src="/mascot.svg" alt="التعويذة" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            معمل القدرات
          </h1>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="تعلم" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="لوحة المتصدرين"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="المهام" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="المتجر" href="/shop" iconSrc="/shop.svg" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
