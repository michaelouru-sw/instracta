const NAVY = "#1A2B4A";
const TEAL = "#5AB3C6";
const SAND = "#D4A574";
const GREY = "#9CA3AF";
const LIGHT = "#EEF7FA";
const FONT = "Inter, system-ui, sans-serif";

function Svg({ w, h, children, title }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", height: "auto", fontFamily: FONT }}>
      <title>{title}</title>
      {children}
    </svg>
  );
}

function T({ x, y, children, size = 13, weight = 400, fill = NAVY, anchor = "start" }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>
      {children}
    </text>
  );
}

// Wrap text into lines (rough, char-based) and render as tspans.
function Wrap({ x, y, w, children, size = 12, weight = 400, fill = NAVY, anchor = "start", lh = 1.35 }) {
  const maxChars = Math.floor(w / (size * 0.52));
  const words = String(children).split(" ");
  const lines = [];
  let cur = "";
  words.forEach((wd) => {
    if ((cur + " " + wd).trim().length > maxChars) {
      lines.push(cur.trim());
      cur = wd;
    } else cur = (cur + " " + wd).trim();
  });
  if (cur) lines.push(cur);
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>{l}</tspan>
      ))}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2, color = GREY }) {
  const id = `ah${Math.abs(Math.round(x1 * 7 + y1 * 13 + x2 * 3 + y2))}`;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.8" markerEnd={`url(#${id})`} />
    </g>
  );
}

/* ---------------- ACCESS ---------------- */

function Access1() {
  const gates = [
    ["1 Connect", "Network, power,", "physical access point", "Coverage gap: 13%"],
    ["2 Afford", "Data, device and", "time costs, not only fee", "1 GB = 5.8% of income"],
    ["3 Use", "Language, skills,", "gender, disability", "Women 32% less likely online"],
    ["4 Learn", "Instruction that", "produces measured gain", "Devices alone: no gain"],
  ];
  return (
    <Svg w={820} h={300} title="Four conditions of access: connect, afford, use, learn">
      {gates.map((g, i) => {
        const x = 20 + i * 200;
        const hgt = 150 - i * 0;
        return (
          <g key={i}>
            <rect x={x} y={40} width={170} height={hgt} rx={8} fill={i % 2 ? LIGHT : "#fff"} stroke={NAVY} strokeWidth="1.5" />
            <rect x={x} y={40} width={170} height={34} rx={8} fill={NAVY} />
            <T x={x + 85} y={63} fill="#fff" weight={600} anchor="middle" size={14}>{g[0]}</T>
            <T x={x + 85} y={103} anchor="middle" size={12}>{g[1]}</T>
            <T x={x + 85} y={120} anchor="middle" size={12}>{g[2]}</T>
            <line x1={x + 15} x2={x + 155} y1={140} y2={140} stroke={TEAL} strokeWidth="1" />
            <Wrap x={x + 85} y={162} w={150} size={11} anchor="middle" fill="#8a5a2b" weight={600}>{g[3]}</Wrap>
            {i < 3 && <Arrow x1={x + 172} y1={115} x2={x + 198} y2={115} color={NAVY} />}
            <Arrow x1={x + 85} y1={192} x2={x + 85} y2={232} color={SAND} />
            <T x={x + 85} y={250} anchor="middle" size={11} fill="#6b7280">learners lost here</T>
          </g>
        );
      })}
      <T x={20} y={22} size={13} weight={600}>A learner reaches the outcome only if every gate holds</T>
      <T x={20} y={285} size={11} fill="#6b7280">Figures: GSMA (2024); A4AI (2021); UNESCO (2023). Framework: this paper.</T>
    </Svg>
  );
}

function Access2() {
  // Panel A: SSA mobile internet 2023 stacked bar. Panel B: 1GB cost vs target. Panel C: women online.
  const bw = 520;
  const used = 27, usage = 60, cov = 13;
  return (
    <Svg w={820} h={360} title="Connectivity and affordability indicators for Sub-Saharan Africa">
      <T x={20} y={22} size={13} weight={600}>A. Population by mobile internet status, Sub-Saharan Africa, end 2023 (%)</T>
      <rect x={20} y={36} width={(bw * used) / 100} height={34} fill={TEAL} />
      <rect x={20 + (bw * used) / 100} y={36} width={(bw * usage) / 100} height={34} fill={NAVY} />
      <rect x={20 + (bw * (used + usage)) / 100} y={36} width={(bw * cov) / 100} height={34} fill={SAND} />
      <T x={20 + (bw * used) / 200} y={58} fill="#fff" size={12} weight={600} anchor="middle">27 use</T>
      <T x={20 + (bw * used) / 100 + (bw * usage) / 200} y={58} fill="#fff" size={12} weight={600} anchor="middle">60 covered, not using (usage gap)</T>
      <T x={20 + (bw * (used + usage + cov / 2)) / 100} y={58} fill={NAVY} size={12} weight={600} anchor="middle">13</T>
      <T x={20 + (bw * (used + usage + cov / 2)) / 100} y={86} fill="#6b7280" size={11} anchor="middle">coverage gap</T>

      <T x={20} y={130} size={13} weight={600}>B. Cost of 1 GB mobile data, % of average monthly income</T>
      <T x={20} y={156} size={12}>Africa average (2021)</T>
      <rect x={170} y={143} width={5.8 * 40} height={18} fill={NAVY} />
      <T x={170 + 5.8 * 40 + 8} y={157} size={12} weight={600}>5.8%</T>
      <T x={20} y={184} size={12}>UN target</T>
      <rect x={170} y={171} width={2 * 40} height={18} fill={TEAL} />
      <T x={170 + 2 * 40 + 8} y={185} size={12} weight={600}>2.0%</T>
      <T x={20} y={212} size={12}>Egypt (lowest)</T>
      <rect x={170} y={199} width={0.5 * 40} height={18} fill={GREY} />
      <T x={170 + 0.5 * 40 + 8} y={213} size={12}>0.5%</T>
      <T x={20} y={240} size={12}>Central African Rep.</T>
      <rect x={170} y={227} width={24.4 * 9.5} height={18} fill={SAND} />
      <T x={170 + 24.4 * 9.5 + 8} y={241} size={12} weight={600}>24.4%</T>
      <T x={560} y={157} size={11} fill="#6b7280">Bars in B drawn at two scales for</T>
      <T x={560} y={171} size={11} fill="#6b7280">legibility; read the printed values.</T>

      <T x={20} y={280} size={13} weight={600}>C. Women and mobile internet, Sub-Saharan Africa, 2023</T>
      <rect x={20} y={292} width={300} height={16} fill="#E5E7EB" />
      <rect x={20} y={292} width={300 * 0.36} height={16} fill={TEAL} />
      <T x={20 + 300 * 0.36 + 8} y={305} size={12} weight={600}>36% of women use mobile internet</T>
      <T x={20} y={332} size={12}>Women are 32% less likely than men to use it; about 202 million women are offline.</T>
      <T x={20} y={352} size={11} fill="#6b7280">Sources: GSMA (2024) and GSMA (2024b) as reported by Connecting Africa; A4AI (2021).</T>
    </Svg>
  );
}

function Access3() {
  const reqs = [
    ["R1 Low bandwidth, offline first", [1, 0, 1, 0]],
    ["R2 Price in data and device cost", [0, 1, 0, 0]],
    ["R3 Open licences, exportable content", [0, 1, 0, 0]],
    ["R4 Disaggregate by sex", [0, 0, 1, 0]],
    ["R5 WCAG 2.2 and UDL by default", [0, 0, 1, 1]],
    ["R6 Pedagogy and facilitator support", [0, 0, 0, 1]],
    ["R7 Sponsor-funded participation", [0, 1, 0, 1]],
  ];
  const cols = ["Connect", "Afford", "Use", "Learn"];
  return (
    <Svg w={820} h={360} title="Mapping of design requirements to the four gates">
      <T x={20} y={22} size={13} weight={600}>Which gate each design requirement protects</T>
      {cols.map((c, i) => (
        <T key={c} x={420 + i * 90} y={52} anchor="middle" weight={600} size={13}>{c}</T>
      ))}
      {reqs.map((r, ri) => (
        <g key={ri}>
          <rect x={20} y={64 + ri * 38} width={780} height={34} fill={ri % 2 ? "#fff" : LIGHT} />
          <T x={30} y={86 + ri * 38} size={12.5}>{r[0]}</T>
          {r[1].map((on, ci) => (
            <circle key={ci} cx={420 + ci * 90} cy={81 + ri * 38} r={on ? 9 : 4} fill={on ? NAVY : "#D1D5DB"} />
          ))}
        </g>
      ))}
      <T x={20} y={346} size={11} fill="#6b7280">Large dot: primary protection. Small dot: not a primary effect. Source: derived in this paper (Table 1).</T>
    </Svg>
  );
}

/* ---------------- EVIDENCE ---------------- */

function Evidence1() {
  const steps = [
    ["A Rationale", "ESSA tier 4", "Logic model + planned evaluation", "No claim of impact", 150],
    ["B Before and after", "Below tier 3", "Pre-registered outcomes, validated instrument", "Participants improved", 120],
    ["C Comparison", "Tiers 2 and 3", "Waitlist or matched group, baseline equivalence", "Promising or moderate evidence", 90],
    ["D Randomised", "Tier 1", "Randomised, independent, pre-registered", "Strong evidence in context", 60],
  ];
  return (
    <Svg w={820} h={330} title="Evidence ladder for small providers">
      {steps.map((s, i) => {
        const x = 20 + i * 195;
        const y = s[4] + 30;
        return (
          <g key={i}>
            <rect x={x} y={y} width={185} height={290 - y + 20} fill={i % 2 ? LIGHT : "#fff"} stroke={NAVY} strokeWidth="1.5" />
            <rect x={x} y={y} width={185} height={28} fill={i === 3 ? TEAL : NAVY} />
            <T x={x + 92} y={y + 19} anchor="middle" fill={i === 3 ? NAVY : "#fff"} weight={600} size={13}>{s[0]}</T>
            <T x={x + 92} y={y + 50} anchor="middle" size={11.5} fill="#8a5a2b" weight={600}>{s[1]}</T>
            <Wrap x={x + 92} y={y + 72} w={165} size={11.5} anchor="middle">{s[2]}</Wrap>
            <Wrap x={x + 92} y={y + 125} w={165} size={11.5} anchor="middle" weight={600}>{"Can claim: " + s[3]}</Wrap>
          </g>
        );
      })}
      <T x={20} y={22} size={13} weight={600}>Claims are proportionate to design: higher rungs permit stronger statements</T>
      <T x={20} y={322} size={11} fill="#6b7280">ESSA tiers: CADRE (n.d.). Ladder: this paper.</T>
    </Svg>
  );
}

function Evidence2() {
  const rows = [
    ["Remedial tutors, India (yr 2)", 0.28, 0.28, "Banerjee et al. 2007"],
    ["Computer-assisted maths, India (yr 2)", 0.47, 0.47, "Banerjee et al. 2007"],
    ["Adaptive after-school, maths, India", 0.36, 0.36, "Muralidharan et al. 2019"],
    ["Adaptive after-school, Hindi, India", 0.22, 0.22, "Muralidharan et al. 2019"],
    ["Tracking by achievement, Kenya", 0.14, 0.14, "Duflo et al. 2011"],
    ["Mobile-phone adult education, Niger", 0.19, 0.26, "Aker et al. 2012"],
    ["SMS and calls to parents, Botswana", 0.12, 0.12, "Angrist et al. 2022"],
  ];
  const x0 = 330, sc = 380; // 0 to 0.5 mapped to 0..sc*? use 0.5 -> sc
  const px = (v) => x0 + (v / 0.5) * sc;
  return (
    <Svg w={820} h={350} title="Effect sizes reported in selected randomised evaluations">
      <T x={20} y={22} size={13} weight={600}>Reported effects on learning, standard deviations (SD)</T>
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((v) => (
        <g key={v}>
          <line x1={px(v)} x2={px(v)} y1={36} y2={290} stroke="#E5E7EB" />
          <T x={px(v)} y={308} size={11} anchor="middle" fill="#6b7280">{v.toFixed(1)}</T>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 52 + i * 34;
        return (
          <g key={i}>
            <T x={20} y={y + 4} size={12}>{r[0]}</T>
            {r[1] === r[2] ? (
              <>
                <line x1={x0} x2={px(r[1])} y1={y} y2={y} stroke={TEAL} strokeWidth="4" />
                <circle cx={px(r[1])} cy={y} r={6} fill={NAVY} />
                <T x={px(r[1]) + 12} y={y + 4} size={11.5} weight={600}>{r[1].toFixed(2)}</T>
              </>
            ) : (
              <>
                <line x1={px(r[1])} x2={px(r[2])} y1={y} y2={y} stroke={NAVY} strokeWidth="6" />
                <T x={px(r[2]) + 12} y={y + 4} size={11.5} weight={600}>{r[1].toFixed(2)} to {r[2].toFixed(2)}</T>
              </>
            )}
          </g>
        );
      })}
      <T x={20} y={330} size={11} fill="#6b7280">Effects use different outcomes, populations and time horizons and are not directly comparable. They show orders of magnitude only.</T>
    </Svg>
  );
}

function Evidence3() {
  const boxes = [
    ["Inputs", "Funding, staff,", "platform"],
    ["Activities", "Courses, coaching,", "facilitation"],
    ["Outputs", "Enrolled, completed,", "attrition"],
    ["Outcomes", "Learning, behaviour,", "results"],
    ["Impact", "Skills use, income,", "equity"],
  ];
  const meas = [
    [2, "Level 1: reaction"],
    [3, "Level 2: learning (pre/post)"],
    [3.6, "Level 3: behaviour (3 months)"],
    [4, "Level 4: results"],
  ];
  return (
    <Svg w={820} h={330} title="Logic model with Kirkpatrick measurement points and learning loop">
      {boxes.map((b, i) => {
        const x = 20 + i * 160;
        return (
          <g key={i}>
            <rect x={x} y={50} width={135} height={74} rx={8} fill={i === 3 ? NAVY : LIGHT} stroke={NAVY} />
            <T x={x + 67} y={74} anchor="middle" weight={600} size={13} fill={i === 3 ? "#fff" : NAVY}>{b[0]}</T>
            <T x={x + 67} y={94} anchor="middle" size={11} fill={i === 3 ? "#fff" : NAVY}>{b[1]}</T>
            <T x={x + 67} y={108} anchor="middle" size={11} fill={i === 3 ? "#fff" : NAVY}>{b[2]}</T>
            {i < 4 && <Arrow x1={x + 137} y1={87} x2={x + 158} y2={87} color={NAVY} />}
          </g>
        );
      })}
      {meas.map((m, i) => {
        const x = 20 + 160 * (m[0] - 1) + 67;
        const y = 150 + (i % 2) * 44;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={126} y2={y - 14} stroke={SAND} strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x={x - 80} y={y - 14} width={160} height={26} rx={13} fill={SAND} />
            <T x={x} y={y + 4} anchor="middle" size={11.5} weight={600}>{m[1]}</T>
          </g>
        );
      })}
      <path d="M 700 126 C 700 250, 120 250, 90 128" fill="none" stroke={TEAL} strokeWidth="2" strokeDasharray="6 4" />
      <T x={400} y={265} anchor="middle" size={12} weight={600} fill="#1F5B6B">Learning loop: findings, including null results, revise the design</T>
      <T x={20} y={22} size={13} weight={600}>Measurement points along the results chain</T>
      <T x={20} y={320} size={11} fill="#6b7280">Levels after Kirkpatrick and Kirkpatrick (2006). Disaggregate every point by sex, disability, age and location.</T>
    </Svg>
  );
}

/* ---------------- LOCAL ---------------- */

function Local1() {
  const layers = [
    ["Language and content", "Medium of instruction, cases, assessment", "Visible; most programmes stop here", 0],
    ["Pedagogy", "Fit with classrooms, teacher training, learner expectations", "Adopted by decree, often without function", 1],
    ["Institutions", "Ownership, hosting, data, capability, accountability", "Least visible; decides whether it lasts", 2],
  ];
  return (
    <Svg w={820} h={330} title="Three layers of localisation">
      {layers.map((l, i) => {
        const y = 40 + i * 82;
        return (
          <g key={i}>
            <rect x={20 + i * 0} y={y} width={500} height={70} rx={8} fill={i === 2 ? NAVY : i === 1 ? "#2E4A76" : TEAL} />
            <T x={36} y={y + 26} fill="#fff" weight={700} size={15}>{`Layer ${i + 1}. ${l[0]}`}</T>
            <Wrap x={36} y={y + 46} w={470} size={12} fill="#fff">{l[1]}</Wrap>
            <Wrap x={550} y={y + 30} w={250} size={12} fill={NAVY} weight={600}>{l[2]}</Wrap>
          </g>
        );
      })}
      <T x={20} y={22} size={13} weight={600}>Where localisation succeeds or fails</T>
      <T x={20} y={300} size={11} fill="#6b7280">Design-reality gaps (Heeks, 2002) widen as one moves from layer 1 to layer 3. Framework: this paper.</T>
      <Arrow x1={540} y1={90} x2={540} y2={225} color={SAND} />
    </Svg>
  );
}

function Local2() {
  return (
    <Svg w={820} h={300} title="Reading outcomes by whether the test language is spoken at home, Cote d'Ivoire">
      <T x={20} y={22} size={13} weight={600}>Grade 5 pupils reaching basic reading, Côte d'Ivoire, 2008 (%)</T>
      <T x={20} y={78} size={12.5}>Speak the test language at home</T>
      <rect x={260} y={58} width={55 * 8} height={30} fill={TEAL} />
      <T x={260 + 55 * 8 + 10} y={79} size={13} weight={700}>55%</T>
      <T x={20} y={138} size={12.5}>Do not speak it at home</T>
      <rect x={260} y={118} width={25 * 8} height={30} fill={NAVY} />
      <T x={260 + 25 * 8 + 10} y={139} size={13} weight={700}>25%</T>
      <line x1={260} x2={260} y1={50} y2={160} stroke={GREY} />
      <Wrap x={20} y={196} w={760} size={12.5}>Globally, an estimated 40% of people do not have access to education in a language they speak or understand (UNESCO, 2016). In Kenya, the mother-tongue policy for early primary grades is consistently not followed in practice (Piper et al., 2016).</Wrap>
      <T x={20} y={280} size={11} fill="#6b7280">Source: UNESCO (2016); Piper, Schroeder and Trudell (2016).</T>
    </Svg>
  );
}

function Local3() {
  const nodes = [
    ["Kenyan universities", 150, 70, "Research, evaluation, TVET links"],
    ["Employers and industry", 670, 70, "Skills demand, placements"],
    ["Teachers and trainers", 150, 250, "Co-design, delivery, coaching"],
    ["Funders and sponsors", 670, 250, "Underwrite access, fund evaluation"],
  ];
  return (
    <Svg w={820} h={330} title="Local partnership model around the learner">
      <T x={20} y={22} size={13} weight={600}>Partnerships that carry capability and accountability</T>
      {nodes.map((n, i) => (
        <g key={i}>
          <Arrow x1={n[1] < 400 ? n[1] + 70 : n[1] - 70} y1={n[2] < 160 ? n[2] + 25 : n[2] - 25} x2={n[1] < 400 ? 330 : 490} y2={n[2] < 160 ? 140 : 190} color={TEAL} />
          <rect x={n[1] - 105} y={n[2] - 28} width={210} height={56} rx={8} fill={LIGHT} stroke={NAVY} />
          <T x={n[1]} y={n[2] - 6} anchor="middle" weight={600} size={12.5}>{n[0]}</T>
          <Wrap x={n[1]} y={n[2] + 12} w={190} anchor="middle" size={10.5} fill="#4b5563">{n[3]}</Wrap>
        </g>
      ))}
      <rect x={330} y={130} width={160} height={70} rx={35} fill={NAVY} />
      <T x={410} y={160} anchor="middle" fill="#fff" weight={700} size={14}>Learner</T>
      <T x={410} y={178} anchor="middle" fill="#fff" size={11}>open, local, measured</T>
      <T x={410} y={316} anchor="middle" size={11} fill="#6b7280">Independent evaluator and open licences sit across all four relationships.</T>
    </Svg>
  );
}

export const FIGURES = {
  "access-1": Access1,
  "access-2": Access2,
  "access-3": Access3,
  "evidence-1": Evidence1,
  "evidence-2": Evidence2,
  "evidence-3": Evidence3,
  "local-1": Local1,
  "local-2": Local2,
  "local-3": Local3,
};
