import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["About", "Proficiencies", "Work", "Education", "Projects", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Bim Rochee's Resume</span>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-foreground text-sm">
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          Menu
        </button>
      </div>
      {open && (
        <div className="bg-background border-b border-border px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-3">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-left text-muted-foreground hover:text-foreground transition-colors text-sm">
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
