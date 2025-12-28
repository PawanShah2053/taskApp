import { Home, PlusCircle, Compass, User, Heart, Plus } from "lucide-react";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Sidebar() {
  return (
    <aside className="flex w-[260px] flex-col justify-between border-r border-white/5 bg-neutral-950 px-4 py-5">
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 flex-shrink-0">
            <Image
              src="/Logo.png"
              alt="Task App Logo"
              width={400}
              height={400}
              priority
              className="h-full w-auto"
            />
          </div>
        </div>

        <div>
          <SearchBar />
        </div>

        <nav className="space-y-1">
          <SidebarItem icon={<Home size={18} />} label="Home" />
          <SidebarItem icon={<PlusCircle size={18} />} label="Create" active />
          <SidebarItem icon={<Compass size={18} />} label="Explore" />
        </nav>

        <div className="pt-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500">
            Library
          </p>
          <nav className="space-y-1">
            <SidebarItem icon={<User size={18} />} label="Profile" />
            <SidebarItem icon={<Heart size={18} />} label="Liked" />
            <SidebarItem icon={<Plus size={18} />} label="New playlist" />
          </nav>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-gradient-to-br from-purple-600/20 to-orange-500/20 p-3 text-xs text-neutral-200 shadow-lg">
          <p className="font-medium">Model v6 Pro is here!</p>
          <p className="text-neutral-400">
            Pushing boundaries to the world’s best AI music model
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
          <FooterLink text="Pricing" />
          <FooterLink text="Affiliate" />
          <FooterLink text="API" />
          <FooterLink text="About" />
          <FooterLink text="Terms" />
          <FooterLink text="Privacy" />
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${
        active
          ? "bg-neutral-900 text-white"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function FooterLink({ text }: { text: string }) {
  return <span className="cursor-pointer hover:text-neutral-300">{text}</span>;
}
