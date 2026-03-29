const categories = [
  { label: "Skills", items: ["API Design", "Frontend Architecture", "Backend Logic", "UX and Layout"] },
  { label: "Tools", items: ["VS Code", "Figma", "Postman", "Notion", "AI Tools"] },
  { label: "Tech Stack", items: ["React", "PHP", "C#", "React Native", "JavaScript", "Dart", "SQL"] },
];

const ProficienciesSection = () => (
  <section id="proficiencies" className="py-20 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-16">Proficiencies</h2>
      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="grid grid-cols-[200px_1fr] gap-x-12 items-start">
              <span className="section-label">{cat.label}</span>
              <div className="space-y-1">
                {cat.items.map((item) => (
                  <p key={item} className="body-text">{item}</p>
                ))}
              </div>
            </div>
            <div className="divider mt-8" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProficienciesSection;
