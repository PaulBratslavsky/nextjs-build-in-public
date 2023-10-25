import { buttonVariants } from "@/components/ui/button";
import { getStrapiMedia } from "@/lib/api-helpers";
import Link from "next/link";

interface HeroNavItem {
  id: string;
  text: string;
  href: string;
  isButton: boolean;
  isExternal: boolean;
}

interface HeaderProps {
  data: {
    id: string;
    attributes: {
      mainNav: {
        id: string;
        navItem: HeroNavItem[];
      };
      secondaryNav: {
        id: string;
        navItem: HeroNavItem[];
      };
      logo: {
        id: string;
        image: {
          data: {
            id: string;
            attributes: {
              name: string;
              alternativeText: string;
              url: string;
            };
          };
        };
      };
    };
  };
}

const Header = ({ data }: { data: HeaderProps }) => {
  const imageUrl = getStrapiMedia(
    data.data.attributes.logo.image.data.attributes.url
  );

  function renderNavItems(navItems: HeroNavItem[]) {
    return navItems.map((navItem: HeroNavItem) => {
      const { id, text, href, isButton } = navItem;
      if (isButton) {
        return (
          <Link
            key={id}
            href={href}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#ce1f3a] hover:bg-[#e96a7e]"
          >
            {text}
          </Link>
        );
      } else {
        return (
          <Link 
            key={id}
            href={href} className={buttonVariants({ variant: "ghost" })}>
            {text}
          </Link>
        );
      }
    });
  }

  return (
    <header className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <div className="flex h-16 px-8 items-center justify-between">
        <div className="flex items-center">
          {imageUrl && (
            <img src={imageUrl} alt="Eventler logo" className="h-12" />
          )}
        </div>
        <nav className="hidden gap-2 md:flex">
          {data.data.attributes.mainNav.navItem &&
            renderNavItems(data.data.attributes.mainNav.navItem)}
        </nav>
        <div className="flex items-center gap-5">
          {data.data.attributes.secondaryNav.navItem &&
            renderNavItems(data.data.attributes.secondaryNav.navItem)}
        </div>
      </div>
    </header>
  );
};

export default Header;
