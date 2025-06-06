export const mycorrhizalData = {
    nodes: [
      // Root node
      { id: 0, label: "MycorrhizalNetwork", type: "root", parent: null },

      // Mycorrhizal types
      { id: 1,
        label: "ECTO", 
        name: "Ectomycorrhizal",
        description: `Ectomycorrhizal fungi are a type of mycorrhizal fungus that form a symbiotic 
                      relationship with the roots of trees and other plants. They are characterized by 
                      their ability to form a network of hyphae that extend into the soil, where they can 
                      absorb nutrients and water from the soil.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Mycorrhizal_root_tips_%28amanita%29.jpg',
        link: 'https://en.wikipedia.org/wiki/Ectomycorrhiza',
        type: "group", 
        parent: 0 
      },
      { 
        id: 2, 
        label: "ARBUS", 
        name: "Arbuscular", 
        description: `Arbuscular mycorrhizal fungi are a type of mycorrhizal fungus that form a symbiotic 
                      relationship with the roots of trees and other plants. They are characterized by 
                      their ability to penetrate the cortical cells of the root, where they can absorb 
                      nutrients and water from the soil.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Arbuscule.png',
        link: 'https://en.wikipedia.org/wiki/Arbuscular_mycorrhiza',
        type: "group", 
        parent: 0 
      },
      // Genera
      { id: 4, 
        name: "Boletus",
        description: `Boletus is a genus of mushrooms that are known for their large size and 
                      variety of species. The name Boletus is derived from the ancient Greek word for mushroom,
                      and are generally classified by having hymenial pores rather than gills. Most species 
                      of boletes are found to be ectomycorrhizal.`,
        image: 'https://www.mushroomexpert.com/images/kuo5/boletes_01_thumb.jpg',
        link: 'https://www.mushroomexpert.com/boletes.html',
        type: "genus", 
        parent: 1 
      },
      { id: 5, 
        name: "Amanita",
        description: `Amanita are a wide genus of mushroom most well known for featuring some of the most deadly, toxic species
                      throughout the world (although featuing a few choice edibles) and are generally classified by having 
                      detached gills, a white spore print, and a universal veil. Most species of amanitas are found to be 
                      arbuscular mycorrhizal.`,
        image: 'https://www.mushroomexpert.com/images/nadon/nadon_amanita_jacksonii_01_thumb.jpg',
        link: 'https://www.mushroomexpert.com/amanita.html',
        type: "genus", 
        parent: 2
      },
      { id: 6,
        name: "Cantharellus",
        description: `Cantharellus mushrooms contain a variety of easily identified choice edibles. Characteristics include
                      false gills running along the underside and often have a trumpet-like shape. Nearly all species of 
                      cantharellus are found to be ectomycorrhizal.`,
        image: 'https://www.mushroomexpert.com/images/kuo/cantharellus_cinnabarinus_01.jpg',
        link: 'https://www.mushroomexpert.com/cantharellaceae.html',
        type: "genus", 
        parent: 1 
      },
      { id: 7,
        name: "Russula",
        description:`Russula is a genus of mushrooms that can be generally identified by brightly colored caps, lack of veil or
                     or latex, and white to yellow-brown spore print. WHile many species of russula are edible, some can cause 
                     severe gastrointestinal distress and some are toxic, although few species are deadly. The mushrooms tend to
                     form ectomycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Russulamexicana.jpg/500px-Russulamexicana.jpg',
        link: 'https://en.wikipedia.org/wiki/Russula',
        type: "genus", 
        parent: 1 
      },
      { id: 8,
        name: "Glomus",
        description: `Glomus are a genus of arbuscular mycorrhizal fungi that are often found and used in agricultural soils.
                      Glomus fungi are often considered to be obligate symbiotes, in that they cannot be grown absent a plant host.
                      While many form positive relationships with host plants, some are parasitic. The spores also tend to produce
                      an electric current prior to propagation.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Glomus_australe_fornerly_Endogone_australis.jpg/500px-Glomus_australe_fornerly_Endogone_australis.jpg',
        link: 'https://en.wikipedia.org/wiki/Glomus_(fungus)',
        type: "genus",
        parent: 2 
      },
      { id: 9,
         name: "Tuber",
         description: `Tuber fungi are ancient fungi known primarily for including several highly desirable edible species, specifically
                       Truffles. Tubers grow and fruit underground, and are known to be ectomycorrhizal.`,
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Tuber_gibbosum_85547.jpg/500px-Tuber_gibbosum_85547.jpg',
         link: 'https://en.wikipedia.org/wiki/Tuber_(fungus)',
         type: "genus", 
         parent: 1 
      },
  
      // Fungi species
      { id: 10,
        name: "Boletus edulis",
        description: `Boletus edulis, also known as the porcini mushroom, is a highly desirable edible mushroom that is known
                      for its large size and variety of species. It is known to be ectomycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Boletus_edulis_IT.jpg/500px-Boletus_edulis_IT.jpg',
        link: 'https://en.wikipedia.org/wiki/Boletus_edulis',
        type: "fungus", 
        parent: 4 
      },
      { id: 11,
        name: "Boletus pinophilus",
        description: `Boletus pinophilus, also known as the pinewood king bolete mushroom, is a highly desirable edible 
                      and variety of porcini mushroom that is known for its large size. It is known to be ectomycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Boletus_edulis_IT.jpg/500px-Boletus_edulis_IT.jpg',
        link: 'https://en.wikipedia.org/wiki/Boletus_edulis',
        type: "fungus", 
        parent: 4
      },
      { 
        id: 12, 
        name: "Amanita muscaria",
        description: `Amanita muscaria, also known as the fly agaric mushroom, is a psychoactive mushroom that is distinguished
                      by its bright red cap with white spots. It is known to be arbuscular mycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/500px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg',
        link: 'https://en.wikipedia.org/wiki/Amanita_muscaria',
        type: "fungus", 
        parent: 5 
      },
      { 
        id: 13, 
        name: "Cantharellus cibarius",
        description: `Cantharellus cibarius, also known as the chanterelle mushroom, is a choice edible mushroom that is known
                      for its false gills and trumpet-like shape. They often come in a distinctive golden yellow color that 
                      can lead to misidentification, specific with toxic jack-o-lanterns. It is known to be ectomycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chanterelle_Cantharellus_cibarius.jpg/500px-Chanterelle_Cantharellus_cibarius.jpg',
        link: 'https://en.wikipedia.org/wiki/Cantharellus_cibarius',
        type: "fungus", 
        parent: 6 
      },
      { 
        id: 14, 
        name: "Russula cyanoxantha", 
        description: `Russula cyanoxantha, also known as the charcoal burner mushroom, is an edible mushroom that is known
                      for its variegated cap, slightly greasy gills, andd yellow spore print. It is known to be arbuscular mycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Russula_cyanoxantha.JPG',
        link: 'https://en.wikipedia.org/wiki/Russula_cyanoxantha',
        type: "fungus", 
        parent: 7 
      },
      { 
        id: 15,
        name: "Rhizophagus irregularis",
        description: `Rhizophagus irregularis, also known as the irregular rhizophagus, is an arbuscular mycorrhizal fungus that is often
                      used in agricultural soils as an inoculant to improve soil health.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/R%C3%A9seau_de_mycorhize_%C3%A0_l%27int%C3%A9rieur_d%27une_racine.tif/lossy-page1-500px-R%C3%A9seau_de_mycorhize_%C3%A0_l%27int%C3%A9rieur_d%27une_racine.tif.jpg',
        link: 'https://en.wikipedia.org/wiki/Rhizophagus_irregularis',
        type: "fungus", 
        parent: 8 
      },
      { 
        id: 16,
        name: "Tuber melanosporum",
        description: `Tuber melanosporum, also known as the black truffle, is a highly desirable edible mushroom that is known
                      for its black cap and dark brown spores. It is known to be ectomycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Truffe_nature.JPG/500px-Truffe_nature.JPG',
        link: 'https://en.wikipedia.org/wiki/Tuber_melanosporum',
        type: "fungus", 
        parent: 9 
      },
      { 
        id: 17, 
        name: "Tuber aestivum", 
        description: `Tuber aestivum, also known as the summer truffle, is a highly desirable edible mushroom that is known
                      for its warted, brown cap and brown-blackish spore print. It is known to be ectomycorrhizal.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tuber_aestivum_Valnerina_018.jpg/500px-Tuber_aestivum_Valnerina_018.jpg',
        link: 'https://en.wikipedia.org/wiki/Tuber_aestivum',
        type: "fungus", 
        parent: 9 
      },
  
      // Tree species
      { 
        id: 18,
        name: "Oak",
        description: `Oak is a type of tree that is known for its strong, durable wood. It is often involved in a variety of 
                      ectomycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Angel_Oak_Tree_in_SC.jpg/1920px-Angel_Oak_Tree_in_SC.jpg',
        link: 'https://en.wikipedia.org/wiki/Oak',
        type: "tree", 
        parent: 0 
      },
      { 
        id: 19,
        name: "Pine",
        description: `Pine is an evergreen tree often used for lumber. It is often involved in a variety of 
                      mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pinus_densiflora_Kumgangsan.jpg/500px-Pinus_densiflora_Kumgangsan.jpg',
        link: 'https://en.wikipedia.org/wiki/Pine',
        type: "tree",
        parent: 0
      },
      {
        id: 20,
        name: "Birch",
        description: `Birch are deciduous hardwood trees related to beech-oak trees. They grow primarily in temparate climates in the 
                      northern hemisphere. Birch are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Betula_pendula_001.jpg/500px-Betula_pendula_001.jpg',
        link: 'https://en.wikipedia.org/wiki/Birch',
        type: "tree",
        parent: 0
      },
      { 
        id: 21,
        name: "Spruce",
        description: `Spruce are evergreen coniferous trees related to Pine bu featuring different leaf/needle characteristics. 
                      They are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Sitka_01.JPG/500px-Sitka_01.JPG',
        link: 'https://en.wikipedia.org/wiki/Spruce',
        type: "tree", 
        parent: 0
      },
      {
        id: 22, 
        name: "Maple", 
        description: `Maple are deciduous hardwood trees known for their large, broad leaves and their ability to produce 
                      a variety of syrups. Maples are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Acer_pseudoplatanus_002.jpg/500px-Acer_pseudoplatanus_002.jpg',
        link: 'https://en.wikipedia.org/wiki/Maple',
        type: "tree", 
        parent: 0 
      },
      { 
        id: 23,
        name: "Beech",
        description: `Beech are deciduous trees often used in construction. The logs are often used for a veriety of culinary applications,
                      specifically for in smoking. Beech are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Fagus_sylvatica_Purpurea_JPG4a.jpg/500px-Fagus_sylvatica_Purpurea_JPG4a.jpg',
        link: 'https://en.wikipedia.org/wiki/Beech',
        type: "tree", 
        parent: 0 
      },
      { 
        id: 24,
        name: "Willow",
        description: `Willow are deciduous trees that are often planted for their beauty in landscaping. They can also be planted
                      next to outhouses for expediting composting of human waste. Willow are sometimes involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Salix_alba_Morton.jpg',
        link: 'https://en.wikipedia.org/wiki/Willow',
        type: "tree", 
        parent: 0
      },
      { 
        id: 25,
        name: "Apple",
        description: `Apple are deciduous trees known for their fruit. Apple are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Apfelbaum_Winterrambour_Hochstamm.jpg/500px-Apfelbaum_Winterrambour_Hochstamm.jpg',
        link: 'https://en.wikipedia.org/wiki/Apple',
        type: "tree", 
        parent: 0
      },
      { 
        id: 26,
        name: "Hazel",
        description: `Hazel are deciduous trees are well known for their fruit, the hazelnut.
                      Hazel are often involved in a variety of mycorrhizal associations.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Corylus_avellana_0001.JPG/500px-Corylus_avellana_0001.JPG',
        link: 'https://en.wikipedia.org/wiki/Hazel',
        type: "tree", 
        parent: 0
      },
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