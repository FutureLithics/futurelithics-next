export const mycorrhizalData = {
    nodes: [
      // Mycorrhizal types
      {id: "MycorrhizalNetwork", type: "root", parent: null},
      { id: "ECTO", label: "Ectomycorrhizal", type: "group", parent: "MycorrhizalNetwork" },
      { id: "ARBUS", label: "Arbuscular", type: "group", parent: "MycorrhizalNetwork" },
      { id: "TRUFFLE", label: "Truffle-like", type: "group", parent: "MycorrhizalNetwork" },
  
      // Genera
      { id: "Boletus", type: "genus", parent: "ECTO" },
      { id: "Amanita", type: "genus", parent: "ECTO" },
      { id: "Cantharellus", type: "genus", parent: "ECTO" },
      { id: "Russula", type: "genus", parent: "ECTO" },
      { id: "Glomus", type: "genus", parent: "ARBUS" },
      { id: "Tuber", type: "genus", parent: "TRUFFLE" },
  
      // Fungi species
      { id: "Boletus edulis", type: "fungus", parent: "Boletus" },
      { id: "Boletus pinophilus", type: "fungus", parent: "Boletus" },
      { id: "Amanita muscaria", type: "fungus", parent: "Amanita" },
      { id: "Cantharellus cibarius", type: "fungus", parent: "Cantharellus" },
      { id: "Russula cyanoxantha", type: "fungus", parent: "Russula" },
      { id: "Glomus intraradices", type: "fungus", parent: "Glomus" },
      { id: "Tuber melanosporum", type: "fungus", parent: "Tuber" },
      { id: "Tuber aestivum", type: "fungus", parent: "Tuber" },
  
      // Tree species
      { id: "Oak", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Pine", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Birch", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Spruce", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Maple", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Beech", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Willow", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Apple", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Hazel", type: "tree", parent: "MycorrhizalNetwork" },
      { id: "Larch", type: "tree", parent: "MycorrhizalNetwork" }
    ],
  
    links: [
        {
          source: "Boletus edulis",
          target: "Oak",
          benefits: ["Nitrogen uptake", "Pathogen resistance", "Soil aggregation"],
          interactionStrength: 0.9
        },
        {
          source: "Boletus edulis",
          target: "Beech",
          benefits: ["Drought tolerance", "Nutrient cycling", "Mycelial stability"],
          interactionStrength: 0.8
        },
        {
          source: "Boletus pinophilus",
          target: "Pine",
          benefits: ["Phosphorus transport", "Cold resistance", "Root depth"],
          interactionStrength: 0.85
        },
        {
          source: "Boletus pinophilus",
          target: "Larch",
          benefits: ["Frost resilience", "Water conservation", "Carbon trading"],
          interactionStrength: 0.78
        },
        {
          source: "Amanita muscaria",
          target: "Birch",
          benefits: ["Nitrogen mobilization", "Water uptake", "Seedling support"],
          interactionStrength: 0.75
        },
        {
          source: "Amanita muscaria",
          target: "Pine",
          benefits: ["Stress reduction", "Improved growth", "Soil microbiome enhancement"],
          interactionStrength: 0.7
        },
        {
          source: "Cantharellus cibarius",
          target: "Beech",
          benefits: ["Water retention", "Microbial balance", "Soil health"],
          interactionStrength: 0.7
        },
        {
          source: "Cantharellus cibarius",
          target: "Maple",
          benefits: ["Soil stability", "Enhanced nutrient access", "Reduced drought stress"],
          interactionStrength: 0.68
        },
        {
          source: "Russula cyanoxantha",
          target: "Spruce",
          benefits: ["Phosphorus sharing", "Stress buffering", "Organic matter processing"],
          interactionStrength: 0.72
        },
        {
          source: "Russula cyanoxantha",
          target: "Willow",
          benefits: ["Water uptake", "Toxin tolerance", "Root system support"],
          interactionStrength: 0.65
        },
        {
          source: "Glomus intraradices",
          target: "Apple",
          benefits: ["Fruit-yield boost", "Calcium uptake", "Soil aeration"],
          interactionStrength: 0.82
        },
        {
          source: "Glomus intraradices",
          target: "Maple",
          benefits: ["Improved sugar transport", "Drought resistance", "Root expansion"],
          interactionStrength: 0.76
        },
        {
          source: "Tuber melanosporum",
          target: "Hazel",
          benefits: ["Truffle production", "Organic-carbon trade", "Pathogen defense"],
          interactionStrength: 0.9
        },
        {
          source: "Tuber melanosporum",
          target: "Oak",
          benefits: ["Carbon exchange", "Enhanced root biomass", "Fungal persistence"],
          interactionStrength: 0.88
        },
        {
          source: "Tuber aestivum",
          target: "Oak",
          benefits: ["Mycelial connectivity", "Carbon exchange", "Stress tolerance"],
          interactionStrength: 0.85
        },
        {
          source: "Tuber aestivum",
          target: "Hazel",
          benefits: ["Mycorrhizal stability", "Symbiotic fruiting", "Root mutualism"],
          interactionStrength: 0.83
        }
      ]
  };