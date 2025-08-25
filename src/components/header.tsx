
'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Code, Menu, MessageCircle, Terminal, User, LogOut, Shield, Bell, BookOpen, BrainCircuit } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AISearch } from './ai-search';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const tools = [
  {
    title: 'AI Exercises',
    href: '/exercises',
    icon: Code,
    description:
      'Generate coding exercises in any language and get instant AI feedback.',
  },
  {
    title: 'AI IDE Teacher',
    href: '/ide-teacher',
    icon: Terminal,
    description:
      'Learn any coding topic with a personalized lesson from your AI tutor.',
  },
  {
    title: 'Code Explainer',
    href: '/code-explainer',
    icon: BrainCircuit,
    description: 'Paste any code snippet to get a detailed, step-by-step explanation.',
  },
  {
    title: 'AI Chatbot',
    href: '/chatbot',
    icon: MessageCircle,
    description:
      'Sasha is here to answer any questions you have, with context from your lessons.',
  },
];

const ADMIN_EMAIL = 'abrar@sashaspath.com';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isAdmin = user && user.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Bot className="h-6 w-6" />
            <span className="text-lg hidden sm:inline-block">Sasha's Path</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
           <AISearch />
        </div>
        
        <div className="flex items-center justify-end space-x-2">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/python/learning-path" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Learning Path
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/workbook" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Workbook
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>AI Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {tools.map((tool) => (
                        <ListItem
                          key={tool.title}
                          title={tool.title}
                          href={tool.href}
                          icon={tool.icon}
                        >
                          {tool.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {isAdmin && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Shield className="h-4 w-4 mr-1" /> Admin
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-3 p-4">
                         <ListItem title="Course Management" href="/admin" icon={Shield}>
                           Manage all courses and their content.
                         </ListItem>
                         <ListItem title="Send Notifications" href="/admin/notifications" icon={Bell}>
                            Send push notifications to all users.
                         </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                     <Bot className="h-6 w-6" />
                     Sasha's Path
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {user ? (
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                  ) : null}
                  <Link href="/python/learning-path" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base">Learning Path</Button>
                  </Link>
                  <Link href="/workbook" onClick={() => setIsMobileMenuOpen(false)}>
                     <Button variant="ghost" className="w-full justify-start text-base">Workbook</Button>
                  </Link>
                   <h3 className="px-4 pt-4 text-sm font-semibold text-muted-foreground">AI Tools</h3>
                   {tools.map((tool) => (
                     <Link href={tool.href} key={tool.title} className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>
                        <tool.icon className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-medium">{tool.title}</p>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                        </div>
                     </Link>
                   ))}
                    {isAdmin && (
                      <>
                        <h3 className="px-4 pt-4 text-sm font-semibold text-muted-foreground">Admin</h3>
                        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-base gap-2">
                                <Shield /> Course Management
                            </Button>
                        </Link>
                        <Link href="/admin/notifications" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-base gap-2">
                                <Bell /> Send Notifications
                            </Button>
                        </Link>
                      </>
                    )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  {user ? (
                     <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    icon: React.ElementType;
  }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
