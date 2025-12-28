export default function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:bg-white/5">
      {icon}
    </button>
  );
}
