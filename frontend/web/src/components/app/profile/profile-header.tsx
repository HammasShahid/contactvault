import MobileSidebar from '../mobile-sidebar';

export function ProfileHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileSidebar />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Profile</h1>
      </div>

      <p className="mt-2 text-muted-foreground">
        Manage your account settings and security.
      </p>
    </div>
  );
}
