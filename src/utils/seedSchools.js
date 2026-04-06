import { collection, getDocs, limit, query, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';

const starterSchools = [
  {
    name: "Seven Square Academy",
    address: "Mira Road East, Thane, Maharashtra",
    city: "Thane",
    state: "Maharashtra",
  },
  {
    name: "Delhi Public School",
    address: "Mathura Road, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "DAV Public School",
    address: "Sector 14, Gurugram, Haryana",
    city: "Gurugram",
    state: "Haryana",
  },
  {
    name: "Ryan International School",
    address: "Vasant Kunj, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "Podar International School",
    address: "Saraswati Road, Santacruz West, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    name: "St. Xavier's High School",
    address: "Fort, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    name: "Army Public School",
    address: "Dhaula Kuan, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "Amity International School",
    address: "Sector 44, Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
  },
  {
    name: "Apeejay School",
    address: "Sheikh Sarai, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "Don Bosco School",
    address: "Park Circus, Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
  },
  {
    name: "Bal Bharati Public School",
    address: "Ganga Ram Hospital Marg, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "GD Goenka Public School",
    address: "Vasant Kunj, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "Kendriya Vidyalaya",
    address: "JNU Campus, New Delhi",
    city: "New Delhi",
    state: "Delhi",
  },
  {
    name: "Narayana School",
    address: "HSR Layout, Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
  },
  {
    name: "National Public School",
    address: "Indiranagar, Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
  },
  {
    name: "Vibgyor High School",
    address: "Goregaon West, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
  }
];

// Helper to generate prefix tokens for autocomplete
const generateSearchTokens = (text) => {
  const tokens = new Set();
  
  // Clean and split text into words
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 0);
  
  // Add whole string to tokens
  const fullString = words.join(' ');
  for (let i = 1; i <= fullString.length; i++) {
    tokens.add(fullString.substring(0, i));
  }

  // Also add prefix tokens for every individual word so "Public" matches "Delhi Public"
  words.forEach(word => {
    for (let i = 1; i <= word.length; i++) {
      tokens.add(word.substring(0, i));
    }
  });

  return Array.from(tokens);
};

export const checkAndSeedSchools = async () => {
  try {
    const schoolsCol = collection(db, 'schools');
    const q = query(schoolsCol, limit(1));
    const querySnapshot = await getDocs(q);

    // If the collection is empty, write our starter data
    if (querySnapshot.empty) {
      console.log('Seeding schools collection with starter dataset...');
      const batch = writeBatch(db);

      starterSchools.forEach(school => {
        const docRef = doc(schoolsCol); // auto-generate ID
        
        // combine name and address to be fully searchable
        const searchableString = `${school.name} ${school.address}`;
        
        batch.set(docRef, {
          ...school,
          searchKeywords: generateSearchTokens(searchableString)
        });
      });

      await batch.commit();
      console.log('Schools seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding schools:', error);
  }
};
