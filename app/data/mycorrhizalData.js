export const mycorrhizalData = {
    nodes: [
      // Mycorrhizal types
      {id: 0, label: "MycorrhizalNetwork", type: "root", parent: null},
      { id: 1, label: "ECTO", name: "Ectomycorrhizal", type: "group", parent: 0},
      { id: 2, label: "ARBUS", name: "Arbuscular", type: "group", parent: 0 },
      { id: 3, label: "TRUFFLE", name: "Truffle-like", type: "group", parent: 0 },
  
      // Genera
      { id: 4, name: "Boletus", type: "genus", parent: 1 },
      { id: 5, name: "Amanita", type: "genus", parent: 1 },
      { id: 6, name: "Cantharellus", type: "genus", parent: 1 },
      { id: 7, name: "Russula", type: "genus", parent: 1 },
      { id: 8, name: "Glomus", type: "genus", parent: 2 },
      { id: 9, name: "Tuber", type: "genus", parent: 3 },
  
      // Fungi species
      { id: 10, name: "Boletus edulis", type: "fungus", parent: 4 },
      { id: 11, name: "Boletus pinophilus", type: "fungus", parent: 4 },
      { id: 12, name: "Amanita muscaria", type: "fungus", parent: 5 },
      { id: 13, name: "Cantharellus cibarius", type: "fungus", parent: 6 },
      { id: 14, name: "Russula cyanoxantha", type: "fungus", parent: 7 },
      { id: 15, name: "Glomus intraradices", type: "fungus", parent: 8 },
      { id: 16, name: "Tuber melanosporum", type: "fungus", parent: 9 },
      { id: 17, name: "Tuber aestivum", type: "fungus", parent: 9 },
  
      // Tree species
      { id: 18, name: "Oak", type: "tree", parent: 0 },
      { id: 19, name: "Pine", type: "tree", parent: 0 },
      { id: 20, name: "Birch", type: "tree", parent: 0 },
      { id: 21, name: "Spruce", type: "tree", parent: 0 },
      { id: 22, name: "Maple", type: "tree", parent: 0 },
      { id: 23, name: "Beech", type: "tree", parent: 0 },
      { id: 24, name: "Willow", type: "tree", parent: 0 },
      { id: 25, name: "Apple", type: "tree", parent: 0 },
      { id: 26, name: "Hazel", type: "tree", parent: 0 },
      { id: 27, name: "Larch", type: "tree", parent: 0 }
    ],
  
    links: [
        {
          source: 10,
          target: 18,
          benefits: ["Nitrogen uptake", "Pathogen resistance", "Soil aggregation"],
          interactionStrength: 0.9
        },
        {
          source: 10,
          target: 23,
          benefits: ["Drought tolerance", "Nutrient cycling", "Mycelial stability"],
          interactionStrength: 0.8
        },
        {
          source: 11,
          target: 19,
          benefits: ["Phosphorus transport", "Cold resistance", "Root depth"],
          interactionStrength: 0.85
        },
        {
          source: 11,
          target: 27,
          benefits: ["Frost resilience", "Water conservation", "Carbon trading"],
          interactionStrength: 0.78
        },
        {
          source: 12,
          target: 20,
          benefits: ["Nitrogen mobilization", "Water uptake", "Seedling support"],
          interactionStrength: 0.75
        },
        {
          source: 12,
          target: 19,
          benefits: ["Stress reduction", "Improved growth", "Soil microbiome enhancement"],
          interactionStrength: 0.7
        },
        {
          source: 13,
          target: 23,
          benefits: ["Water retention", "Microbial balance", "Soil health"],
          interactionStrength: 0.7
        },
        {
          source: 13,
          target: 22,
          benefits: ["Soil stability", "Enhanced nutrient access", "Reduced drought stress"],
          interactionStrength: 0.68
        },
        {
          source: 14,
          target: 21,
          benefits: ["Phosphorus sharing", "Stress buffering", "Organic matter processing"],
          interactionStrength: 0.72
        },
        {
          source: 14,
          target: 24,
          benefits: ["Water uptake", "Toxin tolerance", "Root system support"],
          interactionStrength: 0.65
        },
        {
          source: 15,
          target: 25,
          benefits: ["Fruit-yield boost", "Calcium uptake", "Soil aeration"],
          interactionStrength: 0.82
        },
        {
          source: 15,
          target: 22,
          benefits: ["Improved sugar transport", "Drought resistance", "Root expansion"],
          interactionStrength: 0.76
        },
        {
          source: 16,
          target: 26,
          benefits: ["Truffle production", "Organic-carbon trade", "Pathogen defense"],
          interactionStrength: 0.9
        },
        {
          source: 16,
          target: 18,
          benefits: ["Carbon exchange", "Enhanced root biomass", "Fungal persistence"],
          interactionStrength: 0.88
        },
        {
          source: 17,
          target: 18,
          benefits: ["Mycelial connectivity", "Carbon exchange", "Stress tolerance"],
          interactionStrength: 0.85
        },
        {
          source: 17,
          target: 26,
          benefits: ["Mycorrhizal stability", "Symbiotic fruiting", "Root mutualism"],
          interactionStrength: 0.83
        }
      ]
  };