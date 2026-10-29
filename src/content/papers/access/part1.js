export const front = {
  slug: "access",
  number: 1,
  pillar: "Access",
  title: "Skills Should Not Depend on Who Can Pay",
  subtitle:
    "A conditions-of-access framework for digital learning in Kenya and Sub-Saharan Africa: connectivity, affordability, inclusion and instructional quality",
  date: "October 2026",
  series: "Instracta Research Papers, No. 1",
  status: "Working paper",
  highlights: [
    "Access to digital learning is modelled as four conditions that can fail independently: connect, afford, use and learn.",
    "In Sub-Saharan Africa about 60% of people live under mobile broadband coverage but do not use it, against a 13% coverage gap.",
    "Mobile data costs about 5.8% of monthly income in Africa against a 2% affordability target, and women are 32% less likely than men to use mobile internet.",
    "Experimental evidence shows that devices without instruction yield little learning, whereas targeted instruction and low-technology designs can.",
    "Seven design requirements and six testable propositions are derived for payer-independent access.",
  ],
  abstract:
    "Purpose: Digital learning is promoted as a way around shortages of teachers, classrooms and money, yet the conditions under which it widens rather than narrows inequality are rarely stated. This paper develops and tests, against the published evidence, a conditions-of-access framework for Kenya and Sub-Saharan Africa. Design: A theory-building narrative review draws on international agency statistics, systematic reviews and randomised or quasi-experimental studies, interpreted through the capability approach and the digital-divide literature. Findings: Access fails at four sequential and cumulative gates: connection, affordability, use (language, skills, gender, disability) and learning. The binding constraint is increasingly use and cost, not coverage: in 2023, 27% of the Sub-Saharan population used mobile internet, 60% lived under coverage without using it, and 13% lived outside coverage. Data cost 5.8% of monthly income against a 2% target, women were 32% less likely than men to use mobile internet, and children with disabilities were 2.5 times more likely never to attend school. Technology improves learning when it delivers instruction matched to the learner's level and fails when devices are distributed alone. Implications: Seven design requirements and six propositions are derived for providers who wish access to be independent of the learner's ability to pay, together with a measurement agenda centred on the learner who is hardest to reach. Originality: The paper integrates the capability approach, the multi-level digital divide and experimental learning evidence into one operational framework, and applies it reflexively to a Kenyan provider.",
  keywords: [
    "digital learning",
    "access to education",
    "digital divide",
    "capability approach",
    "affordability",
    "inclusive design",
    "Kenya",
    "Sub-Saharan Africa",
  ],
};

export const s1 = [
  {
    h: "1. Introduction",
    subs: [
      {
        h: "1.1 The promise and the problem",
        p: [
          "The promise of digital learning in low- and middle-income countries rests on a simple economic idea. If content can be copied at near-zero marginal cost, then skills need not be rationed by the number of teachers, the size of classrooms or the size of a family's budget. The idea attracts governments, funders and providers because it appears to break the link between what people can pay and what they can learn. It is also incomplete. A course that can be copied freely must still reach a person, in a form that person can use, at a price that person can bear, and it must teach something. Each of these requirements can fail, and the failures are not randomly distributed. They fall most heavily on the learners the technology is meant to serve: the poor, women, people with disabilities, and people in rural areas or outside the dominant language community.",
          "The scale of the underlying need is large. The 2022 update of the State of Global Learning Poverty, produced by the World Bank, UNESCO, UNICEF, the United Kingdom's Foreign, Commonwealth and Development Office, USAID and the Bill & Melinda Gates Foundation, estimated that about 70% of ten-year-olds in low- and middle-income countries could not read and understand a simple text, up from 57% before the pandemic, and projected the figure for Sub-Saharan Africa at 89% (World Bank et al., 2022). The labour-market consequences are visible in Kenya's youth cohort. Figures from the Kenya National Bureau of Statistics, reported by the Business Daily, show about 3.5 million people aged 15 to 34, roughly 19% of that age group, neither employed nor in education or training (Business Daily, 2023). A skills market that reaches only those who can already pay does not touch this population, and may widen the gap between them and their better-resourced peers.",
        ],
      },
      {
        h: "1.2 The gap in the literature",
        p: [
          "Three literatures bear on the problem, and they are seldom brought together. The first, rooted in development economics and philosophy, treats access as a question of capability: what people are actually able to do and be, given the resources and conditions they face (Sen, 1999; Robeyns, 2005). The second, from communication and media studies, shows that the digital divide is not one gap but several, from motivational and material access through skills to the tangible outcomes of use (van Dijk, 2005; van Deursen & van Dijk, 2019). The third, from education economics, uses randomised and quasi-experimental designs to ask what raises learning, and finds that technology helps when it carries good instruction and does not when it replaces it (Escueta et al., 2020; Muralidharan et al., 2019; UNESCO, 2023). Each addresses part of the problem. The capability literature is rich in principle but rarely operational. The digital-divide literature rarely measures learning. The experimental literature measures learning but gives little attention to who is excluded before the experiment begins. A provider who must decide what to build, what to charge and whom to reach needs the three combined.",
        ],
      },
      {
        h: "1.3 Contribution and structure",
        p: [
          "This paper makes three contributions. First, it proposes a conditions-of-access framework with four gates, connect, afford, use and learn, that can be applied to any digital learning programme and that locates where a particular learner is lost. Second, it reviews the evidence for Kenya and Sub-Saharan Africa gate by gate and derives seven design requirements and six testable propositions. Third, it applies the framework reflexively to a Kenyan provider, stating honestly where that provider meets the requirements and where it does not.",
          "The paper proceeds as follows. Section 2 describes the review method and its limits. Section 3 develops the theoretical foundations and the framework. Sections 4 to 7 review the evidence on connection and affordability, on use, on learning, and on the funding of access. Section 8 states the propositions. Section 9 derives design requirements. Section 10 applies the framework to Instracta. Section 11 discusses implications for policy, practice, funders and research. Section 12 sets out limitations, and Section 13 concludes. An author is the founder of the provider discussed in Section 10; this interest is declared in the closing statements and the reader should weigh the argument accordingly.",
        ],
      },
    ],
  },
  {
    h: "2. Method",
    subs: [
      {
        h: "2.1 Type of review",
        p: [
          "This is a theory-building narrative review. It is not a systematic review conducted to a PRISMA protocol, and it reports no screening counts. The purpose is to assemble the strongest available evidence on each condition of access, to integrate it into a framework, and to derive propositions that can be tested. Narrative and conceptual reviews are an accepted form in education and development journals when the aim is synthesis and theory development rather than the estimation of a pooled effect. Their principal weakness is selection: without a protocol, a reviewer can choose evidence that supports a preferred conclusion. The steps below are intended to limit that risk and to allow a reader to reproduce the search.",
        ],
      },
      {
        h: "2.2 Search strategy and sources",
        p: [
          "Searches were conducted in October 2026 using a general web search engine and repository search across publisher and open-access indexes (including the records of the American Economic Association, the National Bureau of Economic Research, the World Bank Open Knowledge Repository, EdTech Hub and Open Development and Education, and IDEAS/RePEc). Search strings combined terms for the four conditions with regional and design terms, for example mobile internet usage gap Sub-Saharan Africa, 1 GB affordability target, children with disabilities out of school, learning poverty, technology-aided instruction randomised, and low-tech learning school closures. Appendix A lists the principal strings. International agency reports were retrieved from the issuing bodies (GSMA, ITU, A4AI, UNESCO, WHO, UNICEF and the World Bank) or from reputable secondary reports of them, which are marked in the text.",
        ],
      },
      {
        h: "2.3 Inclusion, appraisal and synthesis",
        p: [
          "Sources were included if they met at least one of three criteria: they reported population-level statistics from an agency with a mandate and method for collecting them; they reported experimental or quasi-experimental estimates of learning effects in low- or middle-income countries; or they made a substantive theoretical contribution to the study of access, capability or the digital divide. Vendor reports, blogs and promotional material were not used as evidence, although news reports were used to locate primary statistics, and this is flagged. Appraisal used a simple hierarchy: meta-analyses and systematic reviews, then randomised and quasi-experimental studies, then descriptive statistics from agencies, then theory. Effect sizes are reported as the authors state them, in standard deviations, and are not pooled, because outcomes, populations and time horizons differ.",
          "Synthesis proceeded by assigning each finding to one of the four gates, comparing convergent and divergent results within each gate, and then asking what each gate implies for design. Where the Kenyan evidence is thin, which is often, the paper says so and relies on regional or international evidence with an explicit caveat. Several sources could be accessed only through abstracts or catalogue records, and statements about them are confined to what those records report.",
        ],
      },
      {
        h: "2.4 Positionality",
        p: [
          "An author is a practitioner: an instructional designer, learning management system lead and founder of a Kenyan learning provider. Practitioner knowledge informed the choice of questions and the design requirements. It also creates an interest in the conclusions. The paper therefore states its claims in a form that can be checked against sources and presents counter-evidence where it exists.",
        ],
      },
    ],
  },
  {
    h: "3. Theoretical foundations and the conditions-of-access framework",
    subs: [
      {
        h: "3.1 Access as capability",
        p: [
          "The capability approach asks what people are able to do and to be. Sen (1999) argued that the proper measure of development is the expansion of the real freedoms that people enjoy, and that resources matter only through what people can make of them. The same resource can yield very different capabilities for different people, because of personal characteristics, social conditions and environment, which Sen and later writers call conversion factors (Robeyns, 2005). Applied to learning, a platform is a resource. A learner who completes a course and gains a skill she can use has realised a capability. The distance between the two is the substance of the access problem, and it is a distance that conversion factors such as language, disability, gender norms, electricity, time and money determine.",
          "The approach has been applied to information and communication technologies for development. Kleine (2013) used it to argue that evaluations of ICT projects should ask whether technology expands people's real choices, not only whether it is adopted. Its practical value for this paper is to shift attention from the average user to the person with the fewest conversion factors in her favour. It does not tell a provider what to build. The next two literatures help to do so.",
        ],
      },
      {
        h: "3.2 The multi-level digital divide",
        p: [
          "Early discussions of the digital divide treated it as a binary between those with and without a connection. Subsequent work has distinguished levels. The first level concerns physical and material access: devices, connections and the ongoing costs of hardware, software and subscriptions. The second concerns skills and uses. The third concerns the tangible outcomes that different groups obtain from use (van Dijk, 2005). The argument that physical access is giving way to material access is made by van Deursen and van Dijk (2019), who found in a representative Dutch survey that the range of devices people own, their device-related opportunities and the continuing costs of use shape inequalities in skills, uses and outcomes. The finding comes from a high-income country but its logic travels: owning a connection is different from being able to afford to use it for learning.",
          "A corollary is important for African contexts. If the first-level divide is already a matter of material access in the Netherlands, it is more so where handset costs and data prices are high relative to income. The evidence in Section 4 shows that this is so.",
        ],
      },
      {
        h: "3.3 Why the experimental evidence on learning belongs in a theory of access",
        p: [
          "Access theories usually stop at use. The argument of this paper is that they should continue to learning, for two reasons. The first is normative: the purpose of access to education is learning, and an access that delivers none is not access to education in a meaningful sense. The second is empirical: a large body of evidence shows that the same technology yields very different learning depending on how it is used (Escueta et al., 2020; UNESCO, 2023). A theory of access that is silent on instructional quality will therefore overstate what connection and devices achieve. The Global Education Monitoring Report of 2023 states the point in policy terms: the focus should be on learning outcomes, not digital inputs (UNESCO, 2023).",
        ],
      },
      {
        h: "3.4 The framework: four gates",
        p: [
          "We combine the three literatures in a framework with four conditions, or gates, that a learner must pass to realise a capability through digital learning. Figure 1 depicts them.",
        ],
        fig: {
          id: "access-1",
          label: "Figure 1.",
          caption:
            "Conditions-of-access framework. Four gates (connect, afford, use, learn) determine whether a learner realises the capability that a digital learning programme is meant to provide. Examples beneath each gate are indicative evidence reviewed in this paper.",
        },
        list: [
          "Connect. The learner lives within reach of the infrastructure the service needs, such as a mobile network, electricity, or a physical learning point.",
          "Afford. The learner, or someone acting for the learner, can pay the full cost of using the service, including data, devices and time, and not only the course fee.",
          "Use. The learner can operate the service given language, literacy, digital skills, gender norms and any disability. This is the gate addressed by inclusive and universal design.",
          "Learn. The experience leads to learning gains that are measurable and relevant. Reaching a learner with poor instruction is not access to education.",
        ],
        p2: [
          "The gates are sequential in one sense and cumulative in another. A learner who cannot connect never reaches the later gates. A provider who solves three and neglects one still excludes. The framework is deliberately modest. Its purpose is to let a funder, a regulator or a provider ask, of any programme, at which gate a given learner is lost, and what it would cost to open it. It is also a diagnostic of where the evidence is thin: the gates differ in how well they are measured, and the least measured, use and learning among the excluded, are those that matter most.",
        ],
      },
      {
        h: "3.5 Relation to the companion papers",
        p: [
          "This paper is the first of three working papers, each addressing one of the principles on which Instracta's work is organised: access, evidence and local provision. The second paper develops a proportionate evidence standard for judging whether a programme works, which is the standard to which the learn gate is held. The third paper addresses language, pedagogy and institutions, which shape the use gate and the sustainability of any solution. The three are designed to be read together. A programme that is accessible but unevaluated cannot say whether it teaches, and one that is evaluated but built in a language or pedagogy that does not fit will not scale.",
        ],
      },
    ],
  },
  {
    h: "4. Gates 1 and 2: connection and affordability",
    subs: [
      {
        h: "4.1 Coverage is no longer the main gap",
        p: [
          "The most important pattern in the connectivity data is that coverage is no longer the dominant constraint. The GSMA's connectivity series distinguishes a coverage gap, people who live outside mobile broadband coverage, from a usage gap, people who live within coverage but do not use mobile internet. In the 2024 edition, reported at the end of 2023, 27% of the Sub-Saharan African population used mobile internet, 60% lived within coverage but did not use it, and 13% lived outside coverage (GSMA, 2024, as reported by Connecting Africa, 2024). For every person outside coverage, there are more than four people under coverage who are not online. The previous edition had reported that a quarter of the regional population used mobile internet at the end of 2022 (GSMA, 2023). The International Telecommunication Union estimated that about 2.6 billion people, 33% of the world's population, were offline in 2023, and that 37% of people in Africa and 27% in low-income countries used the internet (ITU, 2023).",
          "The implication is that building towers is not the primary task. Making use possible and worthwhile is. A provider that assumes that learners are 'unconnected' and waits for infrastructure misreads the situation, as does a provider that assumes that coverage implies use. Figure 2 summarises the connectivity, cost and gender indicators.",
        ],
        fig: {
          id: "access-2",
          label: "Figure 2.",
          caption:
            "Connectivity, cost and gender indicators for Sub-Saharan Africa. Panel A shows the share of the population using mobile internet, covered but not using it, and outside coverage (end 2023). Panel B shows the cost of 1 GB of mobile data as a share of average monthly income against the UN target. Panel C shows women's use of mobile internet in 2023.",
        },
      },
      {
        h: "4.2 Cost is a principal reason for non-use",
        p: [
          "The Alliance for Affordable Internet (A4AI) uses the target adopted by the UN Broadband Commission that 1 GB of mobile data should cost no more than 2% of average monthly income. In its analysis of 95 low- and middle-income countries, published in 2021, A4AI found that 1 GB in Africa cost on average 5.8% of monthly income, the highest of any region, with variation from 0.5% in Egypt to 24.4% in the Central African Republic. Seven countries met the target for the first time in that analysis, but 52 of the 95 countries had not met it, leaving almost one billion people in places where basic access was unaffordable (A4AI, 2021). The GSMA adds that more than half of countries in its sample had yet to meet the target and that the cost of entry-level internet-enabled handsets, relative to income, worsened significantly in 2022 after several years of improvement (GSMA, 2023).",
          "For learning, the relevant cost is not the course fee. It is the sum of the fee, the data used, the device, electricity, and the time that could otherwise be spent earning. A video-based course of ten hours may consume several gigabytes of data. At 5.8% of monthly income per gigabyte, such a course can cost more than the average learner can pay without displacing other spending. The point is a general one about material access (van Deursen & van Dijk, 2019): where the continuing costs of use are high relative to income, nominal availability does not produce use.",
        ],
      },
      {
        h: "4.3 Kenya: high subscription counts, uncertain individual access",
        p: [
          "Kenya is more connected than the regional average, but headline statistics mislead. The Communications Authority reported 68 million active mobile subscriptions at the end of March 2024, a penetration rate of 132.1%, with 51.3 million mobile data subscriptions, of which 72.6% were on mobile broadband, and 38.7 million mobile money subscriptions (reported in ITWeb Africa, 2024). Subscription counts above 100% reflect people who hold more than one SIM card. They should not be read as individual access, and they say nothing about the quality of connection, the cost of data to the user, or whether the person uses the connection for learning.",
          "Kenya's experience with mobile money demonstrates what happens when a locally relevant service meets high mobile penetration. Suri and Jack (2016) estimated that access to the M-PESA mobile money system increased per capita consumption and lifted about 194,000 households, 2% of Kenyan households, out of poverty, with larger effects for female-headed households. The relevance to learning is not that digital learning will have the same effect. It is that in Kenya a service that works on basic handsets, fits how people actually transact and builds on existing channels can reach large numbers of low-income users, including women, at scale.",
        ],
      },
      {
        h: "4.4 Schools and institutions",
        p: [
          "Schools are in a similar position. The 2023 Global Education Monitoring Report estimated that globally only 40% of primary, 50% of lower secondary and 65% of upper secondary schools were connected to the internet. It reported that almost 9% of the global population lacked electricity in 2021 and that one in four primary schools had no electricity, and that at least half a billion students, 31% of the world's learners and 72% of the poorest, could not be reached by remote learning during the pandemic (UNESCO, 2023). Kenya's National Digital Masterplan 2022 to 2032 sets targets to extend fibre to 40,000 public schools and learning institutions, create 25,000 youth hotspots and establish 1,450 digital innovation hubs (ITWeb Africa, 2022). The targets signal political commitment and a direction of travel. They also imply that, in the medium term, a provider cannot assume that a learner's school or college will be online, or that the learner will have a private device at home.",
        ],
      },
    ],
  },
];
