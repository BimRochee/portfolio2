import portrait from "@/assets/bim-portrait.jpg";

const HeroSection = () => (
  <section id="about" className="pt-32 pb-20 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
        Bim Rochee P.<br />Agliam
      </h1>
      <div className="flex flex-col items-start gap-8">
        <div className="grid-bg rounded-xl p-1 mx-auto md:mx-0">
          <img
            src={portrait}
            alt="Bim Rochee P. Agliam"
            width={180}
            height={220}
            className="rounded-xl object-cover w-[180px] h-[220px]"
          />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-12 gap-y-2 w-full">
          <span className="section-label">About</span>
          <div className="body-text space-y-1">
            <p>Mobile and Web Developer</p>
            <p>Based in Philippines</p>
            <p>4+ Months of Industry Experience</p>
          </div>
        </div>
        <div className="divider" />
        <p className="body-text max-w-md">
          When I'm not coding, you'll find me on the badminton court, gym, basketball court, or frisbee field.
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
