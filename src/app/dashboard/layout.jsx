'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from "@iconify/react";
import { useSession, signOut } from '@/lib/auth-client';
import { Button, Drawer } from "@heroui/react";
import FooterBar from '@/components/FooterBar';

const getNavLinks = (role) => {
  if (role === 'admin') {
    return [
      { name: 'Overview', href: '/dashboard/admin', icon: 'lucide:layout-dashboard' },
      { name: 'Manage Users', href: '/dashboard/admin/users', icon: 'lucide:users' },
      { name: 'Manage Tasks', href: '/dashboard/admin/tasks', icon: 'lucide:briefcase' },
      { name: 'Transactions', href: '/dashboard/admin/transactions', icon: 'lucide:receipt' },
    ];
  }
  if (role === 'freelancer') {
    return [
      { name: 'Overview', href: '/dashboard/freelancer', icon: 'lucide:layout-dashboard' },
      { name: 'Browse Tasks', href: '/dashboard/freelancer/browse', icon: 'lucide:search' },
      { name: 'My Proposals', href: '/dashboard/freelancer/proposals', icon: 'lucide:file-text' },
      { name: 'Active Projects', href: '/dashboard/freelancer/active', icon: 'lucide:play-circle' },
      { name: 'My Earnings', href: '/dashboard/freelancer/earnings', icon: 'lucide:wallet' },
      { name: 'Edit Profile', href: '/dashboard/freelancer/profile', icon: 'lucide:user' },
    ];
  }
  return [
    { name: 'Overview', href: '/dashboard/client', icon: 'lucide:layout-dashboard' },
    { name: 'Post a Task', href: '/dashboard/client/post-task', icon: 'lucide:plus-circle' },
    { name: 'My Tasks', href: '/dashboard/client/tasks', icon: 'lucide:folder-open' },
    { name: 'Manage Proposals', href: '/dashboard/client/proposals', icon: 'lucide:inbox' },
  ];
};

const SidebarContent = ({ role, navLinks, pathname, user, handleLogout, isMobile }) => (
  <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">

    {!isMobile && (
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <Link href="/">
          <Image src="/arrow.png" width={120} height={40} alt="Arrow" className="h-8 w-auto" priority />
        </Link>
      </div>
    )}

    {isMobile && (
      <div className="h-16 flex items-center px-3 border-b border-gray-100">
        <Image src="/arrow.png" width={100} height={32} alt="Arrow" className="h-7 w-auto" />
      </div>
    )}

    <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
      <p className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        {role} Dashboard
      </p>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
              ? 'bg-gray-900 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <Icon icon={link.icon} className="text-[18px]" />
            {link.name}
          </Link>
        );
      })}
    </nav>

    <div className="p-2 border-t border-gray-100">
      <div className="flex items-center gap-3 py-2 mb-3">
        <Image
          src={user?.image || "https://ui-avatars.com/api/?name=" + (user?.name || "User")}
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Loading...'}</p>
          <p className="text-xs text-gray-500 truncate capitalize">{role}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl text-sm font-bold transition-colors"
      >
        <Icon icon="lucide:log-out" className="text-lg" />
        Log Out
      </button>
    </div>
  </div>
);

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const role = user?.role || 'client';
  const navLinks = getNavLinks(role);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Icon icon="eos-icons:loading" className="text-3xl text-gray-900 animate-spin" /></div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <div className="hidden lg:block h-full shadow-sm z-10">
        <SidebarContent
          role={role}
          navLinks={navLinks}
          pathname={pathname}
          user={user}
          handleLogout={handleLogout}
          isMobile={false}
        />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-3 shadow-sm">
        <Link href="/">
          <Image src="/arrow.png" width={100} height={32} alt="Arrow" className="h-7 w-auto" />
        </Link>

        <Drawer>
          <Button variant="light" isIconOnly className="text-gray-700 min-w-0 w-10">
            <Icon icon="lucide:menu" className="text-2xl" />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="w-64 p-0">
              <Drawer.Dialog className="h-full rounded-none outline-none">
                <Drawer.CloseTrigger className="absolute top-4 right-4 z-50 bg-gray-100 hover:bg-gray-200 rounded-full p-1" />
                <SidebarContent
                  role={role}
                  navLinks={navLinks}
                  pathname={pathname}
                  user={user}
                  handleLogout={handleLogout}
                  isMobile={true}
                />
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>


      <main className="flex-1 h-full overflow-y-auto flex flex-col pt-16 lg:pt-0">
        
        <div className="max-w-[1200px] w-full mx-auto p-6 md:p-8 flex-1">
          {children}
        </div>

        <div className="mt-auto">
          <FooterBar />
        </div>
        
      </main>

    </div>
  );
}