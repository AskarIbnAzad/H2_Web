export const type_constant = {
  PROVIDER: "provider",
  APPLICANT: "applicant",
};

// export const url = ''

export const api_error_messages_to_exit = [
  "Token is not valid",
  "Refresh or Access Token is not valid",
  "Token is Expired",
  "Invalid token",
];

export const role_constant = {
  ADMIN: 1,
  VENDOR: 2,
  USER: 3,
};

export const session_expired = "@session_expired";

export const save_tokens_constant = "@usertokens";

export const signup_methods_constants = {
  EMAIL_PASSWORD: "email_password",
  GOOGLE: "google",
  FACEBOOK: "facebook",
  APPLE: "apple",
};


export const additionalFilters = {
  outcomeType: [
    {
      id: 1,
      name: "Positive",
    },
    {
      id: 2,
      name: "Neutral",
    },
  ],
  HighlightArticle: [
    {
      id: 1,
      name: "True",
    },
    {
      id: 2,
      name: "False",
    },
  ],
  CompMethodAdmin: [
    {
      id: 1,
      name: "True",
    },
    {
      id: 2,
      name: "False",
    },
  ],
  doseComparison: [
    {
      id: 1,
      name: "True",
    },
    {
      id: 2,
      name: "False",
    },
  ],
  drugComparison: [
    {
      id: 1,
      name: "True",
    },
    {
      id: 2,
      name: "False",
    },
  ],
  pharmacokinetics: [
    {
      id: 1,
      name: "True",
    },
    {
      id: 2,
      name: "False",
    },
  ],
  // isERW: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // erwCompared: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // sexDifference: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // responderDifference: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // safetyProfile: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // pregnantBreastfeeding: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // safetyofhydrogen: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // adverseEffects: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // doseDependentEffect: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // mechanisticInsights: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // geneExpression: [
  //   {
  //     id: 1,
  //     name: "True",
  //   },
  //   {
  //     id: 2,
  //     name: "False",
  //   },
  // ],
  // NonExperimentalSelect: [
  //   {
  //     id: 1,
  //     name: "Review Study Type",
  //   },
  //   {
  //     id: 2,
  //     name: "Opinion Piece",
  //   },
  //   {
  //     id: 3,
  //     name: "Hypothesis",
  //   },
  //   {
  //     id: 4,
  //     name: "Therapeutic Delivery Systems",
  //   },
  // ],
  // inVivo: [
  //   {
  //     id: 1,
  //     name: "Human Study",
  //   },
  //   {
  //     id: 2,
  //     name: "Animal Study",
  //   },
  // ],
  clinicalTrialDesign: [
    {
      id: 1,
      name: "Non-Randomized Trial",
    },
    {
      id: 2,
      name: "Double-Blinded",
    },
    {
      id: 3,
      name: "Single-Blinded",
    },
    {
      id: 4,
      name: "Unblinded",
    },
    {
      id: 5,
      name: "Placebo-Controlled",
    },
    {
      id: 6,
      name: "Non-Placebo-Controlled",
    },
    {
      id: 7,
      name: "Crossover",
    },
    {
      id: 8,
      name: "Pilot / Feasibility",
    },
    {
      id: 9,
      name: "Randomized",
    },
    
  ],

  // observationalStudy: [
  //   {
  //     id: 1,
  //     name: "Survey",
  //   },
  //   {
  //     id: 2,
  //     name: "Case Report",
  //   },
  //   {
  //     id: 3,
  //     name: "Longitudinal",
  //   },
  //   {
  //     id: 4,
  //     name: "Case-Control",
  //   },
  //   {
  //     id: 5,
  //     name: "Cross-Sectional",
  //   },
  //   {
  //     id: 5,
  //     name: "Cohort",
  //   },
  //   {
  //     id: 6,
  //     name: "Other",
  //   },
  // ],

  otherFilters: [
    {
      id: 1,
      name: "Highlighted Articles",
    },
    {
      id: 2,
      name: "Methods of Administration Compared",
    },
    {
      id: 3,
      name: "Dose/Concentration Compared",
    },
    {
      id: 4,
      name: "Drug/Therapy/Supplement Compared",
    },
    {
      id: 5,
      name: "Pharmacokinetics Discussed",
    },
    {
      id: 6,
      name: "ERW Discussed",
    },
    {
      id: 7,
      name: "H2 Safety Discussed",
    },
  ],
};
