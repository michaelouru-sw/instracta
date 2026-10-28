const PEOPLE = [
  {
    name: "Michael Ouru",
    role: "Founder and CEO",
    photo: "/team/michael-ouru.jpg",
    bio: "Learning engineer and LMS lead based in Nairobi. Leads Instracta's products and programmes.",
  },
  {
    name: "Dr. Kenneth G. Riany",
    role: "Board Advisor",
    photo: "/team/kenneth-riany.jpg",
    bio: "Advises the board and oversees governance, including the policies on our For funders page.",
  },
];

export default function Leadership() {
  return (
    <section aria-labelledby="leadership-h" className="mt-20">
      <span className="text-xs uppercase tracking-[0.2em] text-[#5AB3C6] font-semibold">Instracta Leadership</span>
      <h2 id="leadership-h" className="mt-3 text-3xl font-bold tracking-tight text-[#1A2B4A]">The people behind the work.</h2>
      <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-3xl">
        {PEOPLE.map((p) => (
          <figure key={p.name} className="m-0">
            <img src={p.photo} alt={`${p.name}, ${p.role}`} width="640" height="800" loading="lazy" className="w-full aspect-[4/5] object-cover rounded-2xl bg-gray-100" />
            <figcaption className="mt-4">
              <div className="text-lg font-semibold text-[#1A2B4A]">{p.name}</div>
              <div className="text-sm font-medium text-[#5AB3C6]">{p.role}</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.bio}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
