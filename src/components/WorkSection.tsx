import { Calendar, Briefcase, MapPin } from "lucide-react";

const jobs = [
  {
    title: "Full-Stack Developer",
    current: true,
    date: "2025 - Now",
    company: "Hyper Access",
    location: "Philippines",
    description: "At Hyper Access Solutions, I strengthened my foundation in algorithms, data structures, and core software development practices through hands-on experience.",
  },
  {
    title: "Freelance Developer",
    current: true,
    date: "2024 - Now",
    company: "Freelance",
    location: "Philippines",
    description: "As a freelance developer, I design and develop custom systems across web and mobile platforms, delivering solutions tailored to client requirements.",
  },
  {
    title: "Internship",
    current: false,
    date: "2024 - 2025",
    company: "DOST-PCAARD",
    location: "Philippines",
    description: "During my internship under a DOST-PCAARRD project, I worked as a full-stack developer for a cacao traceability system, building both mobile and backend components while also assisting in research documentation.",
  },
];

const WorkSection = () => (
  <section id="work" className="py-20 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-16">Work</h2>
      <div className="space-y-12">
        {jobs.map((job) => (
          <div key={job.title} className="max-w-2xl ml-auto">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              {job.current && <span className="accent-badge">Current</span>}
            </div>
            <div className="flex flex-wrap gap-4 mb-4 text-sm body-text">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{job.date}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
            </div>
            <p className="body-text leading-relaxed">{job.description}</p>
            <div className="divider mt-8" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkSection;
