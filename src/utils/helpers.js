// export const transformFilters = (data) => {
//   return [
//     {
//       PreviewName: "Study Type",
//       name: "studyType",
//       options: data?.study_type?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Species",
//       name: "species",
//       options: data?.species?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Research Topic",
//       name: "researchtopic",
//       options: data?.research_topics?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Physiological Systems",
//       name: "system",
//       options: data?.system?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Organs/Tissues",
//       name: "organ",
//       options: data?.organs?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Methods of Administration",
//       name: "administration_methods",
//       options: data?.administration_methods?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Author Country",
//       name: "country",
//       options: data?.country?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Grant Country",
//       name: "grantCountry",
//       options: data?.grantCountry?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Research Country",
//       name: "researchCountry",
//       options: data?.researchCountry?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Highlight Articles",
//       name: "HighlightArticle",
//       options: data?.HighlightArticle?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Comparison Methods of Administration",
//       name: "CompMethodAdmin",
//       options: data?.CompMethodAdmin?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Dose/Concentration Comparison",
//       name: "doseComparison",
//       options: data?.doseComparison?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Drug/Therapy/Supplement Comparison",
//       name: "drugComparison",
//       options: data?.drugComparison?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Pharmacokinetics (H2 Concentration)",
//       name: "pharmacokinetics",
//       options: data?.pharmacokinetics?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "ERW",
//       name: "isERW",
//       options: data?.isERW?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "ERW Compared",
//       name: "erwCompared",
//       options: data?.erwCompared?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Sex Difference",
//       name: "sexDifference",
//       options: data?.sexDifference?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Responder Classification",
//       name: "responderDifference",
//       options: data?.responderDifference?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Study Focus on H2 Safety",
//       name: "safetyProfile",
//       options: data?.safetyProfile?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Pregnancy/Breastfeeding Status",
//       name: "pregnantBreastfeeding",
//       options: data?.pregnantBreastfeeding?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Unique Hydrogen Safety Methods",
//       name: "safetyofhydrogen",
//       options: data?.safetyofhydrogen?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Presence of Adverse Effects",
//       name: "adverseEffects",
//       options: data?.adverseEffects?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Dose-Dependent Effect",
//       name: "doseDependentEffect",
//       options: data?.doseDependentEffect?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Mechanistic Insights",
//       name: "mechanisticInsights",
//       options: data?.mechanisticInsights?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Measures Gene Expression Changes",
//       name: "geneExpression",
//       options: data?.geneExpression?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//       type: "radio",
//     },
//     {
//       PreviewName: "Outcome Type",
//       name: "outcomeType",
//       options: data?.outcomeType?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Non Experimental Select",
//       name: "NonExperimentalSelect",
//       options: data?.NonExperimentalSelect?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Human/Animal Study (inVivo)",
//       name: "inVivo",
//       options: data?.inVivo?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Clinical Trial Design",
//       name: "clinicalTrialDesign",
//       options: data?.clinicalTrialDesign?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Observational Study",
//       name: "observationalStudy",
//       options: data?.observationalStudy?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Biomaker Markers",
//       name: "marker",
//       options: data?.marker?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//     {
//       PreviewName: "Biomaker Category",
//       name: "category",
//       options: data?.category?.map((item) => ({
//         label: item.name,
//         value: item?.name,
//       })),
//     },
//   ];
// };


export const transformFilters = (data) => {
  const otherFiltersMap = {
    "Dose/Concentration Compared": "doseComparison",
    "Drug/Therapy/Supplement Compared": "drugComparison",
    "ERW Discussed": "isERW",
    "Highlighted Articles": "HighlightArticle",
    "H2 Safety Discussed": "safetyofhydrogen",
    "Methods of Administration Compared": "CompMethodAdmin",
    "Pharmacokinetics Discussed": "pharmacokinetics",
  };

  const sortedOtherFiltersMap = Object.fromEntries(
    Object.entries(otherFiltersMap).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );

  // Helper: recursive sort for hierarchical data (species, disease)
const recursiveSort = (items, mapFn) =>
  Array.isArray(items)
    ? items
        .slice()
        .sort((a, b) => {
          const aName = a.name || a.label || "";
          const bName = b.name || b.label || "";
          return aName.localeCompare(bName);
        })
        .map(mapFn)
    : [];

  const mapSpecies = (item) => ({
    id: item.id,
    name: item.name,
    label: item.name,
    value: item.id,
    children: recursiveSort(item.children, mapSpecies),
  });

  const mapDisease = (item) => ({
    id: item.id,
    name: item.name,
    label: item.name,
    value: item.id,
    children: recursiveSort(item.children, mapDisease),
  });

  return [
    {
      PreviewName: "Authors",
      name: "authors",
      options: (data?.authors || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
    {
      PreviewName: "Author Country",
      name: "countries",
      options: (data?.countries || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
    {
      PreviewName: "Disease",
      name: "diseases",
      options: recursiveSort(data?.diseases, mapDisease),
    },
    {
      PreviewName: "Human Studies",
      name: "clinicalTrialDesign",
      options: (data?.clinicalTrialDesign || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id, // Use ID as value for clinical trial design
          name: item.name,
        })),
    },
    {
      PreviewName: "Methods of Administration",
      name: "administrationMethods",
      options: (data?.administrationMethods || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
    {
      PreviewName: "Organs/Tissues",
      name: "organs",
      options: (data?.organs || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
    {
      PreviewName: "Other Filters",
      name: "otherFilters",
      options: (data?.otherFilters || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          label: item.name,
          value: sortedOtherFiltersMap[item.name] || item.name,
        })),
    },
    {
      PreviewName: "Physiological Systems",
      name: "systems",
      options: (data?.systems || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
    {
      PreviewName: "Research Topic",
      name: "researchTopics",
      options: (data?.researchTopics || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },
   
    {
      PreviewName: "Species",
      name: "species",
      options: recursiveSort(data?.species, mapSpecies),
    },
     {
      PreviewName: "Study Type",
      name: "studyTypes",
      options: (data?.studyTypes || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => ({
          id: item.id,
          label: item.name,
          value: item.id,
          name: item.name,
        })),
    },


  
   
   
   
   
   
    // {
    //   PreviewName: "Grant Country",
    //   name: "grantCountry",
    //   options: data?.grantCountry?.map((item) => ({
    //     label: item.name,
    //     value: item?.name,
    //   })),
    // },
    // {
    //   PreviewName: "Research Country",
    //   name: "researchCountry",
    //   options: data?.researchCountry?.map((item) => ({
    //     label: item.name,
    //     value: item?.name,
    //   })),
    // },

    // Modified Clinical Trial Design
   

    // New Other Filters section
    // {
    //   PreviewName: "Other Filters",
    //   name: "otherFilters",
    //   options: data?.otherFilters?.map((item) => ({
    //     label: item.name,
    //     value: otherFiltersMap[item.name] || item.name, 
    //   })),
    // },
 
    // {
    //   PreviewName: "Other Filters",
    //   name: "otherFilters",
    //   options: data?.otherFilters?.map((item) => ({
    //     label: item.name,
    //     value: item.name,
    //   })),
    // },
    // Preserved Publication Year filter
    // {
    //   PreviewName: "Publication Year",
    //   name: "year",
    //   options: data?.year?.map((item) => ({
    //     label: item.name,
    //     value: item?.name,
    //   })),
    //   type: "radio",
    // },
  ].filter(Boolean);
};



