import { ArrowRight } from "lucide-react";

const links = [
  { label: "Mail", href: "mailto:bimrochee@gmail.com" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

const ContactSection = () => (
  <section id="contact" className="py-20 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-16">Contact</h2>
      <div className="max-w-2xl ml-auto space-y-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 body-text hover:text-foreground transition-colors text-base"
          >
            {link.label} <ArrowRight className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
