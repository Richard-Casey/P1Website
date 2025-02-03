import Youtube from "./Pages/Youtube";

const resources = [
  {
    //-----------A---------
    name: "Acacia - Family Support",
    image: `${process.env.PUBLIC_URL}/images/National/Acacia.png`,
    description:
      "Acacia Family Support provides specialised services for families dealing with depression.",
    website: "https://www.acacia.org.uk/",
    phone: "0121 301 5990",
    category: ["Depression"],
    tags: [
      "Perinatal",
      "Postnatal",
      "Antenatal",
      "Support Groups",
      "Counselling",
      "Young Parents",
    ],
    location: "Birmingham, UK",
  },
  {
    name: "Acacia - LGBTQ",
    image: `${process.env.PUBLIC_URL}/images/National/Acacialgbtq.png`,
    description:
      "The Acacia LGBTQ+ service focuses on providing support for LGBTQ+ parents who are navigating depression.",
    website: "https://www.acacia.org.uk/dads-partners/lgbtq",
    phone: "0121 301 5990",
    category: ["Depression"],
    tags: [
      "Perinatal",
      "Postnatal",
      "Antenatal",
      "Support Groups",
      "Counselling",
    ],
    location: "Birmingham, UK",
  },
  {
    name: "Acacia - Dads & Partners",
    image: `${process.env.PUBLIC_URL}/images/National/Acaciadadspartners.png`,
    description:
      "Acacia Family Support provides specialised services for families dealing with depression.",
    website: "https://www.acacia.org.uk/dads-partners/",
    phone: "0121 301 5990",
    category: ["Depression"],
    tags: ["Support Groups", "Counselling", "Dads", "Partners"],
    location: "Birmingham, UK",
  },
  {
    name: "APP (Action on Postpartum Psychosis)",
    image: `${process.env.PUBLIC_URL}/images/National/app.png`,
    description:
      "Supporting and advocating for mums and families affected by postpartum psychosis (PP)",
    website: "https://www.app-network.org/",
    category: ["Postpartum Psychosis"],
    tags: ["Mental Health", "PP", "Dads", "Co-Parents"],
  },

  //-----------B---------
  {
    name: "Baby Buddy App by best beginnings",
    image: `${process.env.PUBLIC_URL}/images/National/babybuddyapp.png`,
    description: "- For every parent, for every child",
    website: "https://www.bestbeginnings.org.uk/baby-buddy",
    text: "BABYBUDDY to 85258 for free anonymous support via text message.",
    category: ["Smartphone Application"],
    tags: [
      "Support",
      "Practical Help",
      "Co-Parents",
      "Dads",
      "Empowerment",
      "Emotional Support",
    ],
  },
  {
    name: "BBC Tiny Happy People",
    image: `${process.env.PUBLIC_URL}/images/National/bbctinyhappypeople.png`,
    description:
      "Find out all about your child's brain development and how they come to understand the world with BBC Tiny Happy People.",
    website: "https://www.bbc.co.uk/tiny-happy-people",
    facebook: "https://www.facebook.com/bbctinyhappypeople",
    category: ["Child Development"],
    tags: ["Advice", "Tips", "Activities"],
  },
  {
    name: "Brazelton Centre UK",
    image: `${process.env.PUBLIC_URL}/images/National/brazeltoncentreuk.png`,
    description:
      "The Brazelton Centre UK is a national charity dedicated to supporting healthy parent-baby relationships though promoting an understanding of newborn babies’ communication.",
    website: "https://www.brazelton.co.uk/",
    phone: "01223 314429",
    location: "Cambridge Aitizens Advice Bureau - CB1 2BL",
    facebook: "https://www.facebook.com/BrazeltonUK/",
    category: ["Baby Behaviour"],
    tags: [
      "Babies Communication",
      "Parent-Baby Relationship",
      "Activities",
      "Neonatal Behavioural Assessment Scale",
      "Newborn Behavioural Observations system",
    ],
  },

  //-----------C---------
  {
    name: "Campaign Against Living Miserably - CALM",
    image: `${process.env.PUBLIC_URL}/images/National/calm.png`,
    description:
      "We’re the suicide prevention charity on a mission to help people end their misery, not their lives.",
    website: "https://www.thecalmzone.net/",
    phone: "0800 58 58 58 - Open 5pm to Midnight",
    facebook: "https://www.facebook.com/theCALMzone",
    Youtube: "https://www.youtube.com/thecalmzonenet",
    category: ["Suicide Prevention"],
    tags: [
      "Anxiety",
      "Grief",
      "Financial",
      "Depression",
      "Relationships",
      "Mental Health",
    ],
  },
  {
    name: "Cruse Bereavement Support",
    image: `${process.env.PUBLIC_URL}/images/National/cruse.png`,
    description: "Provides support and counseling for those experiencing loss.",
    website: "https://www.cruse.org.uk",
    phone: "0808 808 1677",
    category: ["Bereavement"],
    tags: ["Mental Health", "Counselling", "Peer Support"],
    extraInfo: "Specialises in helping families and children cope with grief.",
  },
  {
    name: "Cry-sis",
    image: `${process.env.PUBLIC_URL}/images/National/crysis.png`,
    description: "Support for parents with crying and sleepless babies.",
    website: "https://www.cry-sis.org.uk/",
    phone: "0800 448 0737",
    email: "info@cry-sis.org.uk",
    facebook: "https://www.cry-sis.org.uk/",
    category: ["Sleep"],
    tags: ["Advice", "Guides", "Resources"],
  },

  //-----------D---------
  {
    name: "DadMatters",
    image: `${process.env.PUBLIC_URL}/images/National/dadmatters.png`,
    description:
      "Engaging dads where they are to help them better understand their baby, their role as a dad and how the transition to fatherhood may affect them and their family.",
    website: "https://dadmatters.org.uk/",
    email: "DadMatters@homestarthost.org.uk",
    facebook: "https://www.facebook.com/DadMattersUK",
    category: ["Dads"],
    tags: [
      "Support",
      "Dad Relationships",
      "Baby Development",
      "Mental Health",
      "Services",
    ],
  },
  {
    name: "Dad Unlimited",
    image: `${process.env.PUBLIC_URL}/images/National/dadsunlimited.png`,
    description:
      "Dads Unlimited supports the emotional safety of men and those they care about through three key areas; supporting male victims of domestic abuse, supporting men with family separation, and supporting men’s mental health. All of our services use an evidence-based, trauma-informed, person-centred approach.",
    website: "https://www.dadsunltd.org.uk/",
    email: "support@dadsunltd.org.uk",
    facebook: "http://facebook.com/dadsunltd",
    category: ["Dads"],
    tags: [
      "Single Dads",
      "Dad Relationships",
      "Baby Development",
      "Mental Health",
      "Access to children",
      "Communication",
      "Domestic Abuse",
      "Parenting",
      "Divorce and Seperation",
      "Co-Parents",
    ],
  },

  //-----------E---------

  //-----------F---------

  //-----------G---------

  //-----------H---------

  //-----------I---------

  //-----------J---------

  //-----------K---------

  //-----------L---------

  //-----------M---------
  {
    name: "Mankind Initiative",
    image: `${process.env.PUBLIC_URL}/images/National/mankind.png`,
    description: "Helping men escape domestic abuse",
    website: "https://mankind.org.uk/",
    phone: "0808 800 1170",
    email: "help@nspcc.org.uk",
    facebook: "https://www.facebook.com/mankindinitiative/",
    Youtube: "https://www.youtube.com/ManKindInitiative",
    category: ["Domestic Abuse"],
    tags: ["Advice", "Relationships", "Support"],
  },

  //-----------N---------
  {
    name: "NSPCC",
    image: `${process.env.PUBLIC_URL}/images/National/nspcc.png`,
    description:
      "We're the UK's leading children’s charity. We’ve been looking out for children for over 140 years – and we couldn’t do it without you.",
    website: "https://www.nspcc.org.uk/",
    phone: "0808 800 5000",
    email: "help@nspcc.org.uk",
    facebook: "https://www.facebook.com/nspcc",
    Youtube: "https://www.youtube.com/user/nspcc",
    category: ["Abuse"],
    tags: ["Advice", "Relationships", "Support", "Parenting"],
  },

  //-----------O---------

  //-----------P---------
  {
    name: "PANDAS Foundation",
    image: `${process.env.PUBLIC_URL}/images/National/pandasfoundation.png`,
    description: "Support for perinatal mental health issues.",
    website: "https://pandasfoundation.org.uk",
    WhatsApp: "07903 508334",
    email: "supportme@pandasfoundation.org.uk",
    Facebook: "https://www.facebook.com/PANDASFoundation/",
    FacebookMumsGroup: "https://www.facebook.com/groups/PANDASClosedGroup/",
    FacebookDadsGroup: "https://www.facebook.com/groups/367885373581814/",
    category: ["Mental Health"],
    tags: ["Perinatal", "Support Groups", "Counselling"],
    extraInfo: "",
  },
  {
    name: "Parents 1st Essex",
    image: `${process.env.PUBLIC_URL}/images/National/p1stessex.png`,
    description: "Offering life changing peer support for parents in Essex.",
    website: "https://parents1st.org.uk/parents-1st-essex",
    category: ["Peer Support"],
    tags: [
      "Workshops",
      "Antenatal",
      "Online Classes",
      "In Person Classes",
      "First Aid",
      "Dads",
      "Partners",
      "Empowerment",
    ],
  },
  {
    name: "Petals",
    image: `${process.env.PUBLIC_URL}/images/National/petals.png`,
    description:
      "The baby loss counselling charity. Petals provide specialist counselling to parents after baby loss.",
    website: "https://www.petalscharity.org/",
    category: ["Baby Loss"],
    tags: ["Miscarriage", "Stillbirth", "Pregnancy After Loss", "Counselling"],
    location: "Colchester, Essex, UK",
  },

  //-----------Q---------

  //-----------R---------
  {
    name: "Refuge UK",
    image: `${process.env.PUBLIC_URL}/images/National/refuge.png`,
    description: "For women and children. Against domestic violence",
    website: "https://mankind.org.uk/",
    phone: "0808 2000 247",
    email: "help@nspcc.org.uk",
    facebook: "https://www.facebook.com/mankindinitiative/",
    Youtube: "https://www.youtube.com/ManKindInitiative",
    category: ["Domestic Abuse"],
    tags: ["Relationships", "Support"],
  },
  {
    name: "Respect",
    image: `${process.env.PUBLIC_URL}/images/National/respect.png`,
    description: "Help for victims of domestic violence and abuse",
    website: "https://www.respect.org.uk/",
    phone: "0808 8024040",
    email: "info@respect.org.uk",
    facebook: "https://www.facebook.com/UKRespect/",
    category: ["Domestic Abuse"],
    tags: ["Depression", "Relationships", "Stress", "Suicide Prevention"],
  },
  {
    name: "Respect - Mens Advice Line",
    image: `${process.env.PUBLIC_URL}/images/National/respectmen.png`,
    description: "Help for male victims of domestic violence and abuse",
    website: "https://mensadviceline.org.uk/",
    phone: "0808 8010327",
    email: "info@mensadviceline.org.uk",
    facebook: "https://www.facebook.com/UKRespect/",
    category: ["Domestic Abuse"],
    tags: ["Depression", "Relationships", "Stress", "Suicide Prevention"],
  },

  //-----------S---------
  {
    name: "Samaritans",
    image: `${process.env.PUBLIC_URL}/images/National/samaritans.png`,
    description:
      "Whatever you're going through, a Samaritan will face it with you. We're here 24 hours a day, 365 days a year.",
    website: "https://www.samaritans.org/",
    phone: "116 123",
    email: "jo@samaritans.org",
    facebook: "https://www.facebook.com/samaritanscharity/",
    Youtube: "https://www.youtube.com/user/samaritans",
    category: ["Suicide Prevention"],
    tags: [
      "Mental Health",
      "Grief",
      "Financial",
      "Depression",
      "Relationships",
      "Stress",
      "Isolation",
      "Physical Illness",
      "Alcohol/Drug Dependency",
    ],
  },
  {
    name: "SHOUT - 85258",
    image: `${process.env.PUBLIC_URL}/images/National/shout.png`,
    description:
      "Shout is the UK's first and only free, confidential, 24/7 text messaging service for anyone who is struggling to cope.",
    website: "https://giveusashout.org/",
    phone: "TEXT - 85258",
    email: "info@giveusashout.org",
    facebook: "https://www.facebook.com/giveusashoutuk/",
    Youtube: "https://www.youtube.com/channel/UCAKR9Z9sMLq2J0d4GNJ_iEg",
    category: ["Mental Health"],
    tags: [
      "Depression",
      "Relationships",
      "Stress",
      "Grief",
      "Suicide Prevention",
      "Sleep",
    ],
  },

  //-----------T---------

  //-----------U---------

  //-----------V---------

  //-----------W---------

  //-----------X---------

  //-----------Y---------

  //-----------Z---------

  //-----------#---------
];

export default resources;
