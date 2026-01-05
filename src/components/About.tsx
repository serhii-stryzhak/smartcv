interface AboutProps {
  about: string;
}

export const About = ({ about }: AboutProps) => (
  <section className="section">
    <h2 className="section-title">About</h2>
    <p className="text-secondary leading-relaxed text-balance">{about}</p>
  </section>
);

