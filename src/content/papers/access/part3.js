export const s3 = [
  {
    h: "9. Design requirements for payer-independent access",
    p: [
      "The preceding sections imply that a provider committed to access must treat each gate as a design constraint and each barrier as a cost to be borne by the provider or its sponsors, not by the learner. We derive seven requirements. Table 2 maps each barrier to the evidence and to the response it implies, and Figure 4 shows which gate each requirement protects.",
    ],
    table: {
      caption: "Table 2. Barriers to access, supporting evidence and design responses",
      head: ["Barrier", "Evidence", "Design response"],
      rows: [
        [
          "Most people under coverage do not use mobile internet",
          "60% usage gap; 13% coverage gap (GSMA, 2024)",
          "R1. Design for low bandwidth and offline use first; treat a good connection as an enhancement",
        ],
        [
          "Data and devices cost more than the target",
          "1 GB at 5.8% of monthly income in Africa against a 2% target (A4AI, 2021); handset costs worsened (GSMA, 2023)",
          "R2. Count the learner's data and device cost as part of price; use mobile-first, lightweight pages and portable packages",
        ],
        [
          "Licences and platforms that lock content in",
          "UNESCO Recommendation on Open Educational Resources (2019); Digital Public Goods Standard",
          "R3. Prefer open licences, open-source components and exportable content so that institutions can host and adapt it without a fee",
        ],
        [
          "Women offline",
          "32% less likely to use mobile internet; 36% of women online (GSMA, 2024b)",
          "R4. Disaggregate all usage and outcome data by sex; design delivery around women's actual channels and schedules",
        ],
        [
          "Disability and assistive technology gaps",
          "2.5 times more likely never to attend school; access to assistive products as low as 3% in some low- and middle-income countries (UNESCO, 2020; WHO & UNICEF, 2022)",
          "R5. Build to WCAG 2.2 and UDL by default and publish test results",
        ],
        [
          "Devices without instruction produce no gain",
          "Peru laptops; targeted instruction effects (UNESCO, 2023; Banerjee et al., 2007; Muralidharan et al., 2019)",
          "R6. Build learning design, practice and feedback into the product, and pair it with facilitator support where possible",
        ],
        [
          "The payer is not the learner",
          "Learning poverty of about 70% (World Bank et al., 2022) alongside data costs of 5.8% of monthly income (A4AI, 2021)",
          "R7. Fund access through sponsors, institutions and cross-subsidy, and report how many learners participated on sponsored terms",
        ],
      ],
    },
    fig: {
      id: "access-3",
      label: "Figure 4.",
      caption:
        "Mapping of the seven design requirements (R1 to R7) to the gates they principally protect. Several requirements protect more than one gate; the large dot marks the principal effect.",
    },
    p2: [
      "Three of these requirements deserve elaboration. R1 reflects the finding that the principal gap is use and not coverage. Designing for low bandwidth does not mean designing for poor quality. It means that the course should degrade gracefully: text and audio first, with compressed images, optional video, and downloadable packages that work offline, so that a learner on a shared handset with intermittent data can complete the course. Content packages that follow open e-learning standards can run on any compliant learning management system and can be distributed through local institutions, which also supports R3.",
      "R5 reflects the observation that accessibility is rarely tested in practice. The standards exist, and testable criteria are available. A provider that states which standard it meets and publishes the results of automated and manual tests, including tests with users who rely on assistive technology, converts a general commitment into one that can be checked. R7 reflects the financing argument in Section 7: if the learner cannot pay, the provider's honest statement of who does is part of the access claim.",
    ],
  },
  {
    h: "10. Reflexive application: Instracta eLearning Solutions",
    subs: [
      {
        h: "10.1 Purpose and caution",
        p: [
          "To test whether the framework can be applied, this section applies it to the provider with which the first author is associated. The exercise is reflexive, and it carries the risk of self-congratulation. It is therefore limited to stating, for each requirement, what the provider has in place, what it does not, and what evidence is currently available. It is not an evaluation and does not claim that the provider's programmes improve learning, which is the subject of the second paper in this series.",
        ],
      },
      {
        h: "10.2 Assessment against the requirements",
        p: [
          "Instracta is a Kenyan learning provider based in Nairobi. Its course authoring tool exports standards-based packages that can run in other learning management systems, which supports R1 and R3, although the provider has not yet published bandwidth benchmarks. Its Moodle theme is released as open source, which supports R3. Its learning management system is in preparation and planned to be built on Moodle, an open-source platform. An accessibility plugin intended to bring a comprehensive set of features to Moodle is planned and not yet released, so R5 is a commitment and not yet a record. Sponsor-funded participation, R7, is what the Instracta Reach initiative is intended to deliver, and it depends on funding that has not yet been secured. R2, R4 and R6 are design intentions for which the provider has no published data, and the evaluation framework that would generate them is set out in the second paper.",
        ],
        table: {
          caption: "Table 3. Provider status against the design requirements (as at October 2026)",
          head: ["Requirement", "In place", "Not yet in place"],
          rows: [
            ["R1 Low bandwidth, offline first", "Standards-based export from the authoring tool", "Published bandwidth and device benchmarks"],
            ["R2 Price includes data and device cost", "Intention stated", "Cost-per-learner analysis including data and devices"],
            ["R3 Open licences and exportable content", "Open-source Moodle theme; exportable packages", "Open licence policy for all content"],
            ["R4 Disaggregation by sex", "Intention stated", "Disaggregated reporting for any cohort"],
            ["R5 WCAG 2.2 and UDL by default", "Planned plugin; commitment", "Released plugin; published test results"],
            ["R6 Pedagogy and facilitator support", "Instructional design practice", "Evaluated learning gains"],
            ["R7 Sponsor-funded participation", "Initiative designed", "Secured sponsor funding; participation data"],
          ],
        },
      },
      {
        h: "10.3 What the exercise shows",
        p: [
          "Two observations follow. First, the framework is operational: it produced a short, checkable list of gaps. Second, most of the gaps are in measurement and publication, not in intention. This is common among small providers and is the reason that Instracta has adopted the evidence ladder described in the second paper. The reflexive application also illustrates the framework's main limitation, which is that it describes conditions and does not weigh them: it does not say which requirement matters most for a given population, and that is an empirical question.",
        ],
      },
    ],
  },
  {
    h: "11. Discussion and implications",
    subs: [
      {
        h: "11.1 For providers",
        p: [
          "For providers, the most useful result is a change in the unit of analysis. The unit is not the platform or the average user but the learner at the margin. A provider who asks, for each programme, which gate is losing the learners who most need it, will make different choices from one who counts registrations. It will choose a lighter format over a richer one, invest in offline packaging before interactivity, publish accessibility tests before launching new features, and treat the price of data as part of its price. It will also look for partners, such as universities, training colleges, employers and community organisations, that can provide the facilitation that the evidence suggests makes technology effective.",
        ],
      },
      {
        h: "11.2 For funders",
        p: [
          "Funders can use the framework as a due-diligence tool. Questions that follow from it include: which gate does this programme address, and which does it assume away? What is the cost per learner who completes, including data and devices? What share of learners are women, people with disabilities, and people outside urban areas, and how do their completion and learning compare? What accessibility standard is met and how was it tested? Who pays for learners who cannot? A provider who can answer these questions with data is easier to fund and easier to hold to account. A provider that cannot should be asked what it will do to find out. Funders can also fund the missing evidence directly: the cost per completing learner in accessible, low-bandwidth delivery is a public-good finding that no single provider has an incentive to produce.",
        ],
      },
      {
        h: "11.3 For policy",
        p: [
          "For policy makers, the data point to a shift in emphasis from coverage to use. Spectrum and infrastructure remain important, but the largest share of people who are not online are under coverage. Policy instruments that reduce the cost of data and entry-level devices, support digital skills, and require accessibility in publicly funded digital learning address the gates that now bind. Kenya's National Digital Masterplan includes targets for connectivity and hubs (ITWeb Africa, 2022). The framework suggests that these targets be complemented by targets for use, for example the share of women and of persons with disabilities using publicly funded learning services, and for learning outcomes. The 2023 Global Education Monitoring Report recommends independent bodies to evaluate education technology and national targets for meaningful connectivity (UNESCO, 2023).",
        ],
      },
      {
        h: "11.4 For research",
        p: [
          "Four questions would most improve the evidence. First, what share of eligible Kenyan learners would complete a low-bandwidth course on a basic smartphone when data costs are met by a sponsor, compared with when they are not (P2)? Second, what is the cost per completing learner of delivering accessible, offline-capable learning in Kenyan languages? Third, how do completion and learning gains differ by sex and disability status, and what design changes narrow the gap (P3 and P4)? Fourth, does facilitator support change learning gains enough to justify its cost (P5)? Each can be tested in pilot programmes with pre-specified outcomes and an independent evaluator, and several could be tested within a single randomised programme, since sponsored and unsponsored arms, and facilitated and unfacilitated arms, can be crossed.",
        ],
      },
      {
        h: "11.5 Illustrative learner vignettes",
        p: [
          "To show how the framework diagnoses exclusion, consider three composite vignettes. They are constructed for illustration from the patterns in the evidence, not drawn from the records of any programme, and they should not be read as data.",
          "The first learner is a young woman in a peri-urban area of Kenya who holds a basic smartphone and a SIM card with intermittent data. She passes the connect gate. At the afford gate she is repeatedly lost: she buys data in small bundles, a ten-hour video course is out of reach, and the handset's storage cannot hold large downloads. A text-and-audio course that can be downloaded once over a free or sponsored connection would keep her in the programme at no extra cost to her. Her use of the service is also likely to be shaped by the time she can find after domestic and care work, which is why completion by sex should be reported.",
          "The second learner is a man with a visual impairment who uses a screen reader. He may connect and afford a service, and is lost at the use gate if course pages lack text alternatives, if interactive elements cannot be operated from the keyboard, or if assessments are image-based. No pricing change helps him. An accessibility standard that is tested with screen-reader users does. The data on assistive technology access (WHO & UNICEF, 2022) imply that he may also lack the assistive product itself, which no course provider can supply, but which a sponsor might.",
          "The third learner is a facilitator at a community training centre who has a laptop and a stable connection, and who can connect, afford and use a service. She is lost at the learn gate if the course she delivers has no practice or feedback and she has not been trained to support learners. A programme that pairs the content with training for facilitators, the kind of teacher support that the Kenyan evidence favours (Piper et al., 2018), has a better chance of turning access into learning. The vignettes illustrate that a single price or platform choice cannot serve all three, and that the gates differ in who can open them.",
        ],
      },
      {
        h: "11.6 Measurement: an access dashboard",
        p: [
          "If access is to be measured at the margin, providers need indicators that follow the gates. We propose a minimal dashboard of eight indicators, each to be reported by sex, disability status, age and location. For connect: the share of enrolled learners who access the service over a mobile connection, and the median bandwidth they experience. For afford: the learner's total data and device cost per completed hour of learning, and the share of learners whose participation was sponsored. For use: the share of learners who start the first lesson within seven days of enrolling, and the accessibility conformance level achieved against WCAG 2.2 as tested by users of assistive technology. For learn: the share who complete, and the mean gain on a pre-specified assessment. None of these indicators requires new technology. Each requires a decision to collect and publish the data, which is where small providers most often fall short.",
          "The dashboard also protects against a subtle risk, which is that a provider optimises a gate that is easy to measure at the expense of one that is not. Enrolment and registration counts are easy; completion by disability status is not. Because funders increasingly ask for reach, providers face an incentive to report reach and not inclusion. A published dashboard makes the trade-off visible and gives funders a basis for rewarding the harder work.",
        ],
      },
    ],
  },
  {
    h: "12. Limitations",
    p: [
      "The paper has limitations that bear on its conclusions. First, it is a narrative review without a registered protocol, and it reports no screening counts. Despite the steps in Section 2, selection bias cannot be excluded. Second, much of the strongest experimental evidence on technology-aided learning comes from India and other regions, and its transfer to Kenya is plausible but untested. The Kenyan randomised evidence cited in the companion papers concerns early-grade literacy and school-based interventions and not adult and workforce learning, where most digital course providers operate. Third, connectivity statistics are mostly modelled or self-reported, change quickly, and in two cases were accessed through secondary reports of the original publication, which are marked in the text. Fourth, several of the effect sizes cited derive from pilots with strong implementation support and may shrink at scale. Fifth, the framework describes conditions and does not weigh them. Sixth, the provider assessment in Section 10 is a self-assessment by an interested party. The propositions in Table 1 are offered so that these limits can be addressed by evidence and not by assertion.",
    ],
  },
  {
    h: "13. Conclusion",
    p: [
      "The central claim of this paper is that access is a property of the delivery system as a whole, and that it should be measured at the margin, at the learner who is hardest to reach, and not at the average user. The data show a region in which networks are expanding faster than use, in which data and handsets remain expensive relative to income, in which women and people with disabilities are disproportionately excluded, and in which technology produces learning when it carries good instruction and little when it does not. A provider that takes these facts seriously will design for low bandwidth, price in the learner's real costs, build accessibility in from the start, pair content with instruction, and look for sponsors so that a skill does not depend on who can pay. It will also report honestly where it falls short. The conditions-of-access framework, the seven requirements and the six propositions offered here are intended to make that kind of reporting possible, and the claim of access something that can be checked.",
    ],
  },
];

export const back = [
  {
    h: "Declarations",
    subs: [
      {
        h: "Declaration of competing interest",
        p: ["The first author is the founder of Instracta eLearning Solutions, whose products and initiatives are discussed in Sections 9 and 10. No other competing interests are declared."],
      },
      {
        h: "Funding",
        p: ["No external funding was received for the preparation of this working paper."],
      },
      {
        h: "Declaration of generative AI use",
        p: ["Drafting of this working paper used generative AI assistance (Claude, Anthropic) for literature searching, structuring and drafting. Bibliographic details were checked against publisher or repository records. The authors reviewed the text and are responsible for its content."],
      },
      {
        h: "Author contributions (CRediT)",
        p: ["Opiyo Michael Ouru: Conceptualization, Methodology, Investigation, Writing: original draft, Writing: review and editing.", "Kenneth Goga Riany: Writing: review and editing.", "Daisy Chepkoech O'maera: Writing: review and editing."],
      },
      {
        h: "Data availability",
        p: ["No new data were generated. All sources are listed in the reference list; the search strings used are given in Appendix A."],
      },
    ],
  },
];

export const appendix = {
  h: "Appendix A. Search strings and source types",
  p: [
    "Searches were conducted in October 2026. The principal strings are listed below. Searches were iterative and results were screened by title and abstract against the criteria in Section 2.3.",
  ],
  table: {
    caption: "Table A1. Principal search strings and source types",
    head: ["Gate", "Search string (abridged)", "Source types"],
    rows: [
      ["Connect and afford", "mobile internet usage gap coverage gap Sub-Saharan Africa; 1 GB data affordability target; Kenya mobile subscriptions Communications Authority; offline population ITU 2023", "GSMA, ITU, A4AI, Communications Authority via secondary reports"],
      ["Use", "mobile gender gap Sub-Saharan Africa; children with disabilities out of school; assistive technology access; MOOC participants socioeconomic status; closing global achievement gaps MOOCs", "GSMA, UNESCO GEM, WHO and UNICEF, Science"],
      ["Learn", "technology-aided instruction randomised India; upgrading education with technology; low-tech learning when school is out; mobile phones adult education Niger; learning interventions Sub-Saharan Africa meta-analysis; inputs incentives complementarities Tanzania", "AEA journals, NBER, Review of Educational Research, Nature Human Behaviour, repository records"],
      ["Context and policy", "learning poverty 2022 update; Kenya youth not in employment education or training; Kenya National Digital Masterplan; UNESCO Recommendation on Open Educational Resources; Digital Public Goods Standard", "World Bank, KNBS via press, UNESCO, DPGA, trade press"],
      ["Theory", "capability approach; multi-level digital divide; material access; ICT4D design-reality gaps", "Books and journals; repository records"],
    ],
  },
};

export const references = [
  "Aker, J. C., Ksoll, C., & Lybbert, T. J. (2012). Can mobile phones improve learning? Evidence from a field experiment in Niger. American Economic Journal: Applied Economics, 4(4), 94–120. https://doi.org/10.1257/app.4.4.94",
  "Alliance for Affordable Internet. (2021, March 4). Mobile data costs fall, but as demand for internet services surges, progress remains too slow. Alliance for Affordable Internet and Web Foundation. https://adi.a4ai.org/mobile-data-costs-fall-but-as-demand-for-internet-services-surges-progress-remains-too-slow/",
  "Angrist, N., Bergman, P., & Matsheng, M. (2022). Experimental evidence on learning using low-tech when school is out. Nature Human Behaviour, 6(7), 941–950. https://doi.org/10.1038/s41562-022-01381-z",
  "Banerjee, A. V., Cole, S., Duflo, E., & Linden, L. (2007). Remedying education: Evidence from two randomized experiments in India. The Quarterly Journal of Economics, 122(3), 1235–1264.",
  "Business Daily. (2023, April 5; updated 2024, June 26). Shrinking job market, skills gap leave Kenya with 3.5 million idle youth. Business Daily Africa. https://www.businessdailyafrica.com/bd/economy/shrinking-job-market-leave-kenya-with-3-5-million-idle-youth--4186568",
  "CAST. (2018). Universal Design for Learning Guidelines, version 2.2. https://udlguidelines.cast.org",
  "Connecting Africa. (2024). Sub-Saharan Africa remains the least connected region globally. https://www.connectingafrica.com/digital-divide/sub-saharan-africa-remains-the-least-connected-region-globally",
  "Connecting Africa. (2024b). Mobile gender gap narrows slightly in sub-Saharan Africa: GSMA. https://connectingafrica.com/digital-divide/mobile-gender-gap-narrows-slightly-in-sub-saharan-africa-gsma",
  "Conn, K. M. (2017). Identifying effective education interventions in Sub-Saharan Africa: A meta-analysis of impact evaluations. Review of Educational Research, 87(5), 863–898. https://doi.org/10.3102/0034654317712025",
  "Digital Public Goods Alliance. (n.d.). Digital Public Goods Standard. https://digitalpublicgoods.net/standard",
  "Duflo, E., Dupas, P., & Kremer, M. (2011). Peer effects, teacher incentives, and the impact of tracking: Evidence from a randomized evaluation in Kenya. American Economic Review, 101(5), 1739–1774.",
  "Escueta, M., Nickow, A. J., Oreopoulos, P., & Quan, V. (2020). Upgrading education with technology: Insights from experimental research. Journal of Economic Literature, 58(4), 897–996. https://doi.org/10.1257/jel.20191507",
  "Evans, D. K., & Popova, A. (2016). What really works to improve learning in developing countries? An analysis of divergent findings in systematic reviews. The World Bank Research Observer, 31(2), 242–270.",
  "GSMA. (2023). The state of mobile internet connectivity 2023: Sub-Saharan Africa. https://www.gsma.com/r/wp-content/uploads/2023/10/State-of-Mobile-Internet-Connectivity-2023-Sub-Saharan-Africa.pdf",
  "GSMA. (2024). The state of mobile internet connectivity report 2024. GSMA. (Figures as reported in Connecting Africa, 2024.)",
  "GSMA. (2024b). The mobile gender gap report 2024. GSMA. (Figures as reported in Connecting Africa, 2024b.)",
  "Hansen, J. D., & Reich, J. (2015). Democratizing education? Examining access and usage patterns in massive open online courses. Science, 350(6265), 1245–1248.",
  "International Telecommunication Union. (2023). Global offline population steadily declines to 2.6 billion people in 2023. Facts and Figures 2023. https://www.itu.int/itu-d/reports/statistics/2023/10/10/ff23-internet-use",
  "ITWeb Africa. (2022, April 13). Kenya launches ten-year ICT masterplan to capitalise on innovation. https://itweb.africa/article/kenya-launches-ten-year-ict-masterplan-to-capitalise-on-innovation/lwrKxq3KpPoqmg1o",
  "ITWeb Africa. (2024, October 9). Kenya's active mobile subscriptions hit 68 million (reporting Communications Authority of Kenya sector statistics to March 2024). https://itweb.africa/article/kenyas-active-mobile-subscriptions-hit-68-million/kLgB1MezrnZq59N4",
  "Kizilcec, R. F., Saltarelli, A. J., Reich, J., & Cohen, G. L. (2017). Closing global achievement gaps in MOOCs. Science, 355(6322), 251–252.",
  "Kleine, D. (2013). Technologies of choice? ICTs, development, and the capabilities approach. MIT Press.",
  "Mbiti, I., Muralidharan, K., Romero, M., Schipper, Y., Manda, C., & Rajani, R. (2019). Inputs, incentives, and complementarities in education: Experimental evidence from Tanzania. The Quarterly Journal of Economics, 134(3), 1627–1673.",
  "McEwan, P. J. (2015). Improving learning in primary schools of developing countries: A meta-analysis of randomized experiments. Review of Educational Research, 85(3), 353–394. https://doi.org/10.3102/0034654314553127",
  "Meyer, A., Rose, D. H., & Gordon, D. (2014). Universal design for learning: Theory and practice. CAST Professional Publishing.",
  "Muralidharan, K., Singh, A., & Ganimian, A. J. (2019). Disrupting education? Experimental evidence on technology-aided instruction in India. American Economic Review, 109(4), 1426–1460. https://doi.org/10.1257/aer.20171112",
  "Piper, B., Zuilkowski, S. S., Dubeck, M., Jepkemei, E., & King, S. J. (2018). Identifying the essential ingredients to literacy and numeracy improvement: Teacher professional development and coaching, student textbooks, and structured teachers' guides. World Development, 106, 324–336.",
  "Pritchett, L., & Sandefur, J. (2015). Learning from experiments when context matters. American Economic Review, 105(5), 471–475. https://doi.org/10.1257/aer.p20151016",
  "Republic of Kenya. (2003). Persons with Disabilities Act, No. 14 of 2003. Government Printer.",
  "Republic of Kenya. (2010). The Constitution of Kenya, 2010. National Council for Law Reporting.",
  "Robeyns, I. (2005). The capability approach: A theoretical survey. Journal of Human Development, 6(1), 93–117.",
  "Sen, A. (1999). Development as freedom. Oxford University Press.",
  "Suri, T., & Jack, W. (2016). The long-run poverty and gender impacts of mobile money. Science, 354(6317), 1288–1292.",
  "UNESCO. (2016). If you don't understand, how can you learn? Global Education Monitoring Report policy paper. UNESCO.",
  "UNESCO. (2019). Recommendation on Open Educational Resources (OER). UNESCO General Conference, 40th session.",
  "UNESCO. (2020). Global education monitoring report 2020: Inclusion and education. All means all. UNESCO.",
  "UNESCO. (2023). Global education monitoring report 2023: Technology in education. A tool on whose terms? UNESCO.",
  "United Nations. (2006). Convention on the Rights of Persons with Disabilities. United Nations General Assembly.",
  "van Deursen, A. J. A. M., & van Dijk, J. A. G. M. (2019). The first-level digital divide shifts from inequalities in physical access to inequalities in material access. New Media & Society, 21(2), 354–375. https://doi.org/10.1177/1461444818797082",
  "van Dijk, J. A. G. M. (2005). The deepening divide: Inequality in the information society. Sage.",
  "W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. W3C Recommendation. https://www.w3.org/TR/WCAG22/",
  "WHO & UNICEF. (2022). Global report on assistive technology. World Health Organization and United Nations Children's Fund.",
  "World Bank, UNESCO, UNICEF, FCDO, USAID, & Bill & Melinda Gates Foundation. (2022). The state of global learning poverty: 2022 update.",
];
