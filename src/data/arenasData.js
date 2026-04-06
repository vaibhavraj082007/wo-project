export const subjectDetails = {
  math: { name: 'Mathematics', icon: '➗', color: 'blue' },
  sci: { name: 'Science', icon: '🔬', color: 'primary' },
  eng: { name: 'English', icon: '📖', color: 'gold' },
  sst: { name: 'Social Studies', icon: '🌍', color: 'secondary' },
  hindi: { name: 'Hindi', icon: 'अ', color: 'purple' },
};

// Arena data organized by class → subject → arenas → levels
export const arenasData = {
  // ═══════════════════ CLASS 6 ═══════════════════
  6: {
    math: [
      {
        id: 1, name: 'Number System', icon: '⚔️', theme: 'blue',
        levels: [
          { id: 1, name: 'Whole Numbers', status: 'completed', stars: 3 },
          { id: 2, name: 'Integers', status: 'completed', stars: 2 },
          { id: 3, name: 'Fractions', status: 'current', stars: 0 },
        ]
      },
      {
        id: 2, name: 'Algebra & Geometry', icon: '🛡️', theme: 'green',
        levels: [
          { id: 4, name: 'Decimals', status: 'locked', stars: 0, unlock: 'Fractions' },
          { id: 5, name: 'Algebra Basics', status: 'locked', stars: 0, unlock: 'Decimals' },
          { id: 6, name: 'Geometry Basics', status: 'locked', stars: 0, unlock: 'Algebra Basics' },
        ]
      },
      {
        id: 3, name: 'Data & Mensuration', icon: '👑', theme: 'purple',
        levels: [
          { id: 7, name: 'Ratio and Proportion', status: 'locked', stars: 0, unlock: 'Geometry Basics' },
          { id: 8, name: 'Data Handling', status: 'locked', stars: 0, unlock: 'Ratio and Proportion' },
          { id: 9, name: 'Mensuration', status: 'locked', stars: 0, unlock: 'Data Handling' },
        ]
      }
    ],
    sci: [
      {
        id: 1, name: 'Food & Materials', icon: '🪴', theme: 'primary',
        levels: [
          { id: 1, name: 'Food Sources', status: 'completed', stars: 3 },
          { id: 2, name: 'Components of Food', status: 'current', stars: 0 },
          { id: 3, name: 'Fibre to Fabric', status: 'locked', stars: 0, unlock: 'Components of Food' },
        ]
      },
      {
        id: 2, name: 'Living World', icon: '🧲', theme: 'green',
        levels: [
          { id: 4, name: 'Living and Non-Living', status: 'locked', stars: 0, unlock: 'Fibre to Fabric' },
          { id: 5, name: 'Plants', status: 'locked', stars: 0, unlock: 'Living and Non-Living' },
          { id: 6, name: 'Body Movements', status: 'locked', stars: 0, unlock: 'Plants' },
        ]
      },
      {
        id: 3, name: 'Physical World', icon: '⚡', theme: 'purple',
        levels: [
          { id: 7, name: 'Light and Shadow', status: 'locked', stars: 0, unlock: 'Body Movements' },
          { id: 8, name: 'Electricity', status: 'locked', stars: 0, unlock: 'Light and Shadow' },
          { id: 9, name: 'Water', status: 'locked', stars: 0, unlock: 'Electricity' },
        ]
      }
    ],
    eng: [
      {
        id: 1, name: 'Grammar Basics', icon: '✏️', theme: 'gold',
        levels: [
          { id: 1, name: 'Nouns and Pronouns', status: 'completed', stars: 2 },
          { id: 2, name: 'Verbs and Tenses', status: 'current', stars: 0 },
          { id: 3, name: 'Adjectives', status: 'locked', stars: 0, unlock: 'Verbs and Tenses' },
        ]
      },
      {
        id: 2, name: 'Sentence Skills', icon: '📚', theme: 'blue',
        levels: [
          { id: 4, name: 'Sentence Formation', status: 'locked', stars: 0, unlock: 'Adjectives' },
          { id: 5, name: 'Vocabulary', status: 'locked', stars: 0, unlock: 'Sentence Formation' },
          { id: 6, name: 'Reading Comprehension', status: 'locked', stars: 0, unlock: 'Vocabulary' },
        ]
      }
    ],
    sst: [
      {
        id: 1, name: 'History', icon: '🏛️', theme: 'secondary',
        levels: [
          { id: 1, name: 'Early Humans', status: 'completed', stars: 3 },
          { id: 2, name: 'Early Civilizations', status: 'current', stars: 0 },
          { id: 3, name: 'Vedic Period', status: 'locked', stars: 0, unlock: 'Early Civilizations' },
        ]
      },
      {
        id: 2, name: 'Geography', icon: '🌎', theme: 'green',
        levels: [
          { id: 4, name: 'The Earth', status: 'locked', stars: 0, unlock: 'Vedic Period' },
          { id: 5, name: 'Globe and Maps', status: 'locked', stars: 0, unlock: 'The Earth' },
          { id: 6, name: 'India Physical', status: 'locked', stars: 0, unlock: 'Globe and Maps' },
        ]
      },
      {
        id: 3, name: 'Civics', icon: '⚖️', theme: 'purple',
        levels: [
          { id: 7, name: 'Diversity', status: 'locked', stars: 0, unlock: 'India Physical' },
          { id: 8, name: 'Government', status: 'locked', stars: 0, unlock: 'Diversity' },
          { id: 9, name: 'Panchayati Raj', status: 'locked', stars: 0, unlock: 'Government' },
        ]
      }
    ],
    hindi: [
      {
        id: 1, name: 'व्याकरण', icon: '✍️', theme: 'purple',
        levels: [
          { id: 1, name: 'संज्ञा', status: 'completed', stars: 3 },
          { id: 2, name: 'सर्वनाम', status: 'current', stars: 0 },
          { id: 3, name: 'क्रिया', status: 'locked', stars: 0, unlock: 'सर्वनाम' },
        ]
      },
      {
        id: 2, name: 'भाषा ज्ञान', icon: '📖', theme: 'blue',
        levels: [
          { id: 4, name: 'विशेषण', status: 'locked', stars: 0, unlock: 'क्रिया' },
          { id: 5, name: 'मुहावरे', status: 'locked', stars: 0, unlock: 'विशेषण' },
          { id: 6, name: 'पर्यायवाची', status: 'locked', stars: 0, unlock: 'मुहावरे' },
        ]
      }
    ],
  },

  // ═══════════════════ CLASS 7 ═══════════════════
  7: {
    math: [
      {
        id: 1, name: 'Number System', icon: '⚔️', theme: 'blue',
        levels: [
          { id: 1, name: 'Integers Advanced', status: 'completed', stars: 3 },
          { id: 2, name: 'Fractions and Decimals', status: 'completed', stars: 2 },
          { id: 3, name: 'Rational Numbers', status: 'current', stars: 0 },
        ]
      },
      {
        id: 2, name: 'Algebra & Geometry', icon: '🛡️', theme: 'green',
        levels: [
          { id: 4, name: 'Simple Equations', status: 'locked', stars: 0, unlock: 'Rational Numbers' },
          { id: 5, name: 'Lines and Angles', status: 'locked', stars: 0, unlock: 'Simple Equations' },
          { id: 6, name: 'Triangles', status: 'locked', stars: 0, unlock: 'Lines and Angles' },
        ]
      },
      {
        id: 3, name: 'Advanced Topics', icon: '👑', theme: 'purple',
        levels: [
          { id: 7, name: 'Perimeter and Area', status: 'locked', stars: 0, unlock: 'Triangles' },
          { id: 8, name: 'Data Handling', status: 'locked', stars: 0, unlock: 'Perimeter and Area' },
          { id: 9, name: 'Exponents', status: 'locked', stars: 0, unlock: 'Data Handling' },
        ]
      }
    ],
    sci: [
      {
        id: 1, name: 'Life Science', icon: '🪴', theme: 'primary',
        levels: [
          { id: 1, name: 'Nutrition in Plants', status: 'completed', stars: 3 },
          { id: 2, name: 'Nutrition in Animals', status: 'current', stars: 0 },
          { id: 3, name: 'Respiration', status: 'locked', stars: 0, unlock: 'Nutrition in Animals' },
        ]
      },
      {
        id: 2, name: 'Physical Science', icon: '🧲', theme: 'green',
        levels: [
          { id: 4, name: 'Heat', status: 'locked', stars: 0, unlock: 'Respiration' },
          { id: 5, name: 'Acids and Bases', status: 'locked', stars: 0, unlock: 'Heat' },
          { id: 6, name: 'Motion and Time', status: 'locked', stars: 0, unlock: 'Acids and Bases' },
        ]
      },
      {
        id: 3, name: 'Natural World', icon: '🌍', theme: 'purple',
        levels: [
          { id: 7, name: 'Weather and Climate', status: 'locked', stars: 0, unlock: 'Motion and Time' },
          { id: 8, name: 'Soil', status: 'locked', stars: 0, unlock: 'Weather and Climate' },
          { id: 9, name: 'Water Cycle', status: 'locked', stars: 0, unlock: 'Soil' },
        ]
      }
    ],
    eng: [
      {
        id: 1, name: 'Grammar', icon: '✏️', theme: 'gold',
        levels: [
          { id: 1, name: 'Tenses Advanced', status: 'completed', stars: 2 },
          { id: 2, name: 'Active Passive Voice', status: 'current', stars: 0 },
          { id: 3, name: 'Prepositions', status: 'locked', stars: 0, unlock: 'Active Passive Voice' },
        ]
      },
      {
        id: 2, name: 'Language Arts', icon: '📚', theme: 'blue',
        levels: [
          { id: 4, name: 'Synonyms Antonyms', status: 'locked', stars: 0, unlock: 'Prepositions' },
          { id: 5, name: 'Idioms and Phrases', status: 'locked', stars: 0, unlock: 'Synonyms Antonyms' },
          { id: 6, name: 'Comprehension', status: 'locked', stars: 0, unlock: 'Idioms and Phrases' },
        ]
      }
    ],
    sst: [
      {
        id: 1, name: 'History', icon: '🏛️', theme: 'secondary',
        levels: [
          { id: 1, name: 'Medieval India', status: 'completed', stars: 3 },
          { id: 2, name: 'Mughal Empire', status: 'current', stars: 0 },
          { id: 3, name: 'Delhi Sultanate', status: 'locked', stars: 0, unlock: 'Mughal Empire' },
        ]
      },
      {
        id: 2, name: 'Geography', icon: '🌎', theme: 'green',
        levels: [
          { id: 4, name: 'Environment', status: 'locked', stars: 0, unlock: 'Delhi Sultanate' },
          { id: 5, name: 'Natural Vegetation', status: 'locked', stars: 0, unlock: 'Environment' },
          { id: 6, name: 'Human Environment', status: 'locked', stars: 0, unlock: 'Natural Vegetation' },
        ]
      },
      {
        id: 3, name: 'Civics', icon: '⚖️', theme: 'purple',
        levels: [
          { id: 7, name: 'Democracy', status: 'locked', stars: 0, unlock: 'Human Environment' },
          { id: 8, name: 'State Government', status: 'locked', stars: 0, unlock: 'Democracy' },
          { id: 9, name: 'Gender Equality', status: 'locked', stars: 0, unlock: 'State Government' },
        ]
      }
    ],
    hindi: [
      {
        id: 1, name: 'व्याकरण', icon: '✍️', theme: 'purple',
        levels: [
          { id: 1, name: 'विलोम शब्द', status: 'completed', stars: 3 },
          { id: 2, name: 'समास', status: 'current', stars: 0 },
          { id: 3, name: 'उपसर्ग प्रत्यय', status: 'locked', stars: 0, unlock: 'समास' },
        ]
      },
      {
        id: 2, name: 'भाषा ज्ञान', icon: '📖', theme: 'blue',
        levels: [
          { id: 4, name: 'वाक्य रचना', status: 'locked', stars: 0, unlock: 'उपसर्ग प्रत्यय' },
          { id: 5, name: 'अलंकार', status: 'locked', stars: 0, unlock: 'वाक्य रचना' },
          { id: 6, name: 'लोकोक्तियाँ', status: 'locked', stars: 0, unlock: 'अलंकार' },
        ]
      }
    ],
  },

  // ═══════════════════ CLASS 8 ═══════════════════
  8: {
    math: [
      {
        id: 1, name: 'Number System', icon: '⚔️', theme: 'blue',
        levels: [
          { id: 1, name: 'Rational Numbers', status: 'completed', stars: 3 },
          { id: 2, name: 'Squares and Roots', status: 'completed', stars: 2 },
          { id: 3, name: 'Cubes and Cube Roots', status: 'current', stars: 0 },
        ]
      },
      {
        id: 2, name: 'Algebra & Geometry', icon: '🛡️', theme: 'green',
        levels: [
          { id: 4, name: 'Linear Equations', status: 'locked', stars: 0, unlock: 'Cubes and Cube Roots' },
          { id: 5, name: 'Quadrilaterals', status: 'locked', stars: 0, unlock: 'Linear Equations' },
          { id: 6, name: 'Algebraic Expressions', status: 'locked', stars: 0, unlock: 'Quadrilaterals' },
        ]
      },
      {
        id: 3, name: 'Advanced Topics', icon: '👑', theme: 'purple',
        levels: [
          { id: 7, name: 'Percentage and Profit', status: 'locked', stars: 0, unlock: 'Algebraic Expressions' },
          { id: 8, name: 'Direct Inverse Proportion', status: 'locked', stars: 0, unlock: 'Percentage and Profit' },
          { id: 9, name: 'Factorisation', status: 'locked', stars: 0, unlock: 'Direct Inverse Proportion' },
        ]
      }
    ],
    sci: [
      {
        id: 1, name: 'Life Science', icon: '🪴', theme: 'primary',
        levels: [
          { id: 1, name: 'Crop Production', status: 'completed', stars: 3 },
          { id: 2, name: 'Microorganisms', status: 'current', stars: 0 },
          { id: 3, name: 'Cell Structure', status: 'locked', stars: 0, unlock: 'Microorganisms' },
        ]
      },
      {
        id: 2, name: 'Physical Science', icon: '🧲', theme: 'green',
        levels: [
          { id: 4, name: 'Force and Pressure', status: 'locked', stars: 0, unlock: 'Cell Structure' },
          { id: 5, name: 'Friction', status: 'locked', stars: 0, unlock: 'Force and Pressure' },
          { id: 6, name: 'Sound', status: 'locked', stars: 0, unlock: 'Friction' },
        ]
      },
      {
        id: 3, name: 'Chemistry', icon: '⚗️', theme: 'purple',
        levels: [
          { id: 7, name: 'Metals and Non-Metals', status: 'locked', stars: 0, unlock: 'Sound' },
          { id: 8, name: 'Coal and Petroleum', status: 'locked', stars: 0, unlock: 'Metals and Non-Metals' },
          { id: 9, name: 'Chemical Effects', status: 'locked', stars: 0, unlock: 'Coal and Petroleum' },
        ]
      }
    ],
    eng: [
      {
        id: 1, name: 'Grammar', icon: '✏️', theme: 'gold',
        levels: [
          { id: 1, name: 'Direct Indirect Speech', status: 'completed', stars: 2 },
          { id: 2, name: 'Clauses', status: 'current', stars: 0 },
          { id: 3, name: 'Modals', status: 'locked', stars: 0, unlock: 'Clauses' },
        ]
      },
      {
        id: 2, name: 'Language Arts', icon: '📚', theme: 'blue',
        levels: [
          { id: 4, name: 'One Word Substitution', status: 'locked', stars: 0, unlock: 'Modals' },
          { id: 5, name: 'Letter Writing', status: 'locked', stars: 0, unlock: 'One Word Substitution' },
          { id: 6, name: 'Essay Writing', status: 'locked', stars: 0, unlock: 'Letter Writing' },
        ]
      }
    ],
    sst: [
      {
        id: 1, name: 'History', icon: '🏛️', theme: 'secondary',
        levels: [
          { id: 1, name: 'Modern India', status: 'completed', stars: 3 },
          { id: 2, name: 'British Rule', status: 'current', stars: 0 },
          { id: 3, name: 'Freedom Struggle', status: 'locked', stars: 0, unlock: 'British Rule' },
        ]
      },
      {
        id: 2, name: 'Geography', icon: '🌎', theme: 'green',
        levels: [
          { id: 4, name: 'Resources', status: 'locked', stars: 0, unlock: 'Freedom Struggle' },
          { id: 5, name: 'Industries', status: 'locked', stars: 0, unlock: 'Resources' },
          { id: 6, name: 'Agriculture', status: 'locked', stars: 0, unlock: 'Industries' },
        ]
      },
      {
        id: 3, name: 'Civics', icon: '⚖️', theme: 'purple',
        levels: [
          { id: 7, name: 'Indian Constitution', status: 'locked', stars: 0, unlock: 'Agriculture' },
          { id: 8, name: 'Parliament', status: 'locked', stars: 0, unlock: 'Indian Constitution' },
          { id: 9, name: 'Judiciary', status: 'locked', stars: 0, unlock: 'Parliament' },
        ]
      }
    ],
    hindi: [
      {
        id: 1, name: 'व्याकरण', icon: '✍️', theme: 'purple',
        levels: [
          { id: 1, name: 'वाच्य', status: 'completed', stars: 3 },
          { id: 2, name: 'रस', status: 'current', stars: 0 },
          { id: 3, name: 'छंद', status: 'locked', stars: 0, unlock: 'रस' },
        ]
      },
      {
        id: 2, name: 'भाषा ज्ञान', icon: '📖', theme: 'blue',
        levels: [
          { id: 4, name: 'संधि', status: 'locked', stars: 0, unlock: 'छंद' },
          { id: 5, name: 'पत्र लेखन', status: 'locked', stars: 0, unlock: 'संधि' },
          { id: 6, name: 'निबंध', status: 'locked', stars: 0, unlock: 'पत्र लेखन' },
        ]
      }
    ],
  },
};
