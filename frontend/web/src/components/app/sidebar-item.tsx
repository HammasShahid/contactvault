export default function SidebarItem({
  icon: Icon,
  children,
  active = false,
}: {
  icon: any;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
      }`}
    >
      <Icon className="h-5 w-5" />
      {children}
    </button>
  );
}
