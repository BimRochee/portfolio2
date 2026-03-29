import { Calendar, GraduationCap, MapPin } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="py-20 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-16">Education</h2>
      <div className="max-w-2xl ml-auto">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-foreground">BS in Information Technology</h3>
          <span className="accent-badge">Highest</span>
        </div>
        <div className="flex flex-wrap gap-4 mb-4 text-sm body-text">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />2021 - 2025</span>
          <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />USeP</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Philippines</span>
        </div>
        <p className="body-text leading-relaxed">
          For my capstone project, I developed TraKs, a full-stack mobile and web system featuring real-time alerts, onboarding flows, and reporting functionalities. Graduated as Cum Laude.
        </p>
        <div className="divider mt-8" />
      </div>
    </div>
  </section>
);

export default EducationSection;
