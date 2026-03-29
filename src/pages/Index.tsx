import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProficienciesSection from "@/components/ProficienciesSection";
import WorkSection from "@/components/WorkSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProficienciesSection />
    <WorkSection />
    <EducationSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
