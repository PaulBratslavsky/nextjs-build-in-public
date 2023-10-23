import { buttonVariants, Button } from "@/components/ui/button"
import Link from "next/link"



const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <div className="flex h-16 px-8 items-center justify-between">
        <div className="flex items-center">
          <img src="/eventler_logo_color2.png" alt="Eventler logo" className="h-12" />
        </div>
        <nav className="hidden gap-2 md:flex">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>Home</Link>
          <Link href="/events" className={buttonVariants({ variant: "ghost" })}>Events</Link>
        </nav>
        <div className="flex items-center gap-5">				
            <Button
              color="gray"
              variant="ghost"
              aria-label="Theme"
            >Log in</Button>
            <Button
            variant="default"
              className="bg-[#ce1f3a] hover:bg-[#e96a7e]"
            >Sing up</Button>
        </div>
      </div>
    </header>
  )
}

export default Header