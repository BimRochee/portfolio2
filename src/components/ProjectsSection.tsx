import traksIcon from "@/assets/traks-icon.png";
import tracoIcon from "@/assets/traco-icon.png";
import bumblebeeIcon from "@/assets/bumblebee-icon.png";

const projects = [
  { name: "Traks", subtitle: "Tourist Tracker", icon: traksIcon },
  { name: "Traco", subtitle: "Cacao Traceability", icon: tracoIcon },
  { name: "BumbleBee", subtitle: "Smart Gym Guide", icon: bumblebeeIcon },
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-16">Projects</h2>
      <div className="max-w-2xl ml-auto space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="grid-bg rounded-2xl">
            <div className="bg-card/80 backdrop-blur rounded-2xl p-5 flex items-center gap-4 border border-border hover:border-muted-foreground/30 transition-colors">
              <img src={project.icon} alt={project.name} loading="lazy" width={48} height={48} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h3 className="text-foreground font-semibold">{project.name}</h3>
                <p className="text-sm body-text">{project.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
