// Author records. Source: the authors' own manuscripts and contact records.
const code = "Centre for Open and Distance Education (CODE), KCA University, Nairobi, Kenya";

export const AUTHORS = {
  ouru: {
    name: "Opiyo Michael Ouru",
    family: "Ouru",
    given: "Opiyo Michael",
    initials: "O. M.",
    email: "michaelouru2@gmail.com",
    orcid: "0009-0006-3625-3888",
    affiliations: ["Instracta eLearning Solutions, Nairobi, Kenya", code],
    corresponding: true,
  },
  riany: {
    name: "Kenneth Goga Riany",
    family: "Riany",
    given: "Kenneth Goga",
    initials: "K. G.",
    email: "rianyken@gmail.com",
    orcid: "0000-0003-3078-5059",
    affiliations: [code],
  },
  omaera: {
    name: "Daisy Chepkoech O'maera",
    family: "O'maera",
    given: "Daisy Chepkoech",
    initials: "D. C.",
    email: "daisyomaera@gmail.com",
    orcid: "0000-0003-3465-3897",
    affiliations: [code],
  },
};

export const AUTHOR_LIST = [AUTHORS.ouru, AUTHORS.riany, AUTHORS.omaera];
