export function shuffleArray(arr) {
  let newArr = arr.slice();
  for (let i = 0; i < newArr.length; i++) {
    let j = Math.floor(Math.random() * newArr.length);
    let temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
  }
  return newArr;
}

function pickRandom(arr, count) {
  let shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
}

function getCorrectIndex(arr, answer) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === answer) return i;
  }
  return 0;
}

// ══════════ QUESTION BANKS ══════════

const scienceBank = {
  'Food Sources': [
    { text: 'Which of these is a plant product?', answer: 'Rice', wrong: ['Milk', 'Eggs', 'Honey'] },
    { text: 'Animals that eat only plants are called?', answer: 'Herbivores', wrong: ['Carnivores', 'Omnivores', 'Decomposers'] },
    { text: 'Which is not a source of protein?', answer: 'Oil', wrong: ['Pulses', 'Eggs', 'Fish'] },
    { text: 'Honey is produced by?', answer: 'Bees', wrong: ['Ants', 'Butterflies', 'Spiders'] },
    { text: 'Which nutrient gives us energy?', answer: 'Carbohydrates', wrong: ['Vitamins', 'Minerals', 'Water'] },
    { text: 'Milk is obtained from?', answer: 'Animals', wrong: ['Plants', 'Fungi', 'Minerals'] },
    { text: 'Sprouting of seeds is called?', answer: 'Germination', wrong: ['Pollination', 'Fermentation', 'Digestion'] },
    { text: 'What type of food does a cow eat?', answer: 'Grass', wrong: ['Meat', 'Fish', 'Insects'] },
    { text: 'Sugar is obtained from?', answer: 'Sugarcane', wrong: ['Wheat', 'Rice', 'Corn'] },
    { text: 'Which vitamin prevents scurvy?', answer: 'Vitamin C', wrong: ['Vitamin A', 'Vitamin D', 'Vitamin K'] },
  ],
  'Components of Food': [
    { text: 'Starch test uses which solution?', answer: 'Iodine', wrong: ['Copper sulphate', 'Lime water', 'Phenolphthalein'] },
    { text: 'Deficiency of Vitamin D causes?', answer: 'Rickets', wrong: ['Scurvy', 'Beriberi', 'Anaemia'] },
    { text: 'Roughage is also called?', answer: 'Dietary fibre', wrong: ['Protein', 'Fat', 'Starch'] },
    { text: 'Iron deficiency causes?', answer: 'Anaemia', wrong: ['Goitre', 'Rickets', 'Scurvy'] },
    { text: 'Fats give how many times more energy than carbs?', answer: '2 times', wrong: ['3 times', '5 times', 'Same'] },
    { text: 'Which food is rich in Vitamin A?', answer: 'Carrot', wrong: ['Rice', 'Bread', 'Sugar'] },
    { text: 'Night blindness is due to lack of?', answer: 'Vitamin A', wrong: ['Vitamin B', 'Vitamin C', 'Vitamin E'] },
    { text: 'Protein is needed for?', answer: 'Growth and repair', wrong: ['Energy only', 'Taste', 'Colour'] },
    { text: 'Goitre is caused by lack of?', answer: 'Iodine', wrong: ['Iron', 'Calcium', 'Zinc'] },
    { text: 'Which is a protective food?', answer: 'Fruits and vegetables', wrong: ['Rice', 'Bread', 'Oil'] },
  ],
};

const sstBank = {
  'Early Humans': [
    { text: 'Early humans were mainly?', answer: 'Hunter-gatherers', wrong: ['Farmers', 'Traders', 'Builders'] },
    { text: 'Fire was discovered during?', answer: 'Stone Age', wrong: ['Iron Age', 'Bronze Age', 'Modern Age'] },
    { text: 'Early humans lived in?', answer: 'Caves', wrong: ['Buildings', 'Tents', 'Boats'] },
    { text: 'The Stone Age tools were made of?', answer: 'Stone', wrong: ['Iron', 'Bronze', 'Copper'] },
    { text: 'Earliest humans originated in?', answer: 'Africa', wrong: ['Europe', 'Asia', 'America'] },
    { text: 'What did early humans paint on cave walls?', answer: 'Animals', wrong: ['Maps', 'Letters', 'Numbers'] },
    { text: 'Domestication of animals began in?', answer: 'Neolithic Age', wrong: ['Paleolithic Age', 'Iron Age', 'Modern Age'] },
    { text: 'The wheel was invented during?', answer: 'Neolithic period', wrong: ['Paleolithic period', 'Medieval period', 'Modern period'] },
    { text: 'Early tools were used for?', answer: 'Hunting', wrong: ['Writing', 'Cooking', 'Flying'] },
    { text: 'Agriculture started about _____ years ago?', answer: '10,000', wrong: ['1,000', '100', '1 million'] },
  ],
  'Early Civilizations': [
    { text: 'Harappan civilization was near which river?', answer: 'Indus', wrong: ['Ganga', 'Yamuna', 'Nile'] },
    { text: 'The Great Bath was found at?', answer: 'Mohenjo-daro', wrong: ['Harappa', 'Lothal', 'Kalibangan'] },
    { text: 'Harappan seals had images of?', answer: 'Animals', wrong: ['Kings', 'Gods', 'Stars'] },
    { text: 'Lothal was famous for its?', answer: 'Dockyard', wrong: ['Temple', 'Fort', 'Palace'] },
    { text: 'Harappan houses were made of?', answer: 'Baked bricks', wrong: ['Wood', 'Mud only', 'Stone'] },
    { text: 'The Harappan script has been?', answer: 'Not deciphered', wrong: ['Fully decoded', 'Partially decoded', 'Written in Sanskrit'] },
    { text: 'Which metal was NOT used by Harappans?', answer: 'Iron', wrong: ['Copper', 'Bronze', 'Gold'] },
    { text: 'Harappan cities had excellent?', answer: 'Drainage system', wrong: ['Roads', 'Temples', 'Armies'] },
    { text: 'Cotton was first grown in?', answer: 'Indian subcontinent', wrong: ['China', 'Egypt', 'Greece'] },
    { text: 'The Indus Valley civilization is also called?', answer: 'Harappan civilization', wrong: ['Vedic civilization', 'Mauryan civilization', 'Gupta civilization'] },
  ],
  'Medieval India': [
    { text: 'Who founded the Mughal Empire?', answer: 'Babur', wrong: ['Akbar', 'Aurangzeb', 'Shah Jahan'] },
    { text: 'Taj Mahal was built by?', answer: 'Shah Jahan', wrong: ['Akbar', 'Babur', 'Jahangir'] },
    { text: 'Akbar\'s policy of religious tolerance was called?', answer: 'Sulh-i-Kul', wrong: ['Din-i-Ilahi', 'Jizya', 'Mansabdari'] },
    { text: 'Which battle established Mughal rule in India?', answer: 'Battle of Panipat', wrong: ['Battle of Plassey', 'Battle of Haldighati', 'Battle of Tarain'] },
    { text: 'The Bhakti movement promoted?', answer: 'Devotion to God', wrong: ['War', 'Trade', 'Science'] },
    { text: 'Rajput kingdoms were known for?', answer: 'Bravery and honour', wrong: ['Trade', 'Farming', 'Fishing'] },
    { text: 'Vijayanagara kingdom was in?', answer: 'South India', wrong: ['North India', 'East India', 'West India'] },
    { text: 'The Delhi Sultanate lasted for about?', answer: '320 years', wrong: ['100 years', '50 years', '500 years'] },
    { text: 'Qutub Minar was built by?', answer: 'Qutb-ud-din Aibak', wrong: ['Akbar', 'Babur', 'Alauddin Khilji'] },
    { text: 'Which Mughal emperor was called "Alamgir"?', answer: 'Aurangzeb', wrong: ['Akbar', 'Jahangir', 'Humayun'] },
  ],
  'Mughal Empire': [
    { text: 'Who was the greatest Mughal emperor?', answer: 'Akbar', wrong: ['Babur', 'Humayun', 'Aurangzeb'] },
    { text: 'Fatehpur Sikri was built by?', answer: 'Akbar', wrong: ['Shah Jahan', 'Babur', 'Jahangir'] },
    { text: 'The Mughal court language was?', answer: 'Persian', wrong: ['Hindi', 'Urdu', 'Arabic'] },
    { text: 'Mansabdari system was introduced by?', answer: 'Akbar', wrong: ['Babur', 'Aurangzeb', 'Shah Jahan'] },
    { text: 'Who defeated Humayun?', answer: 'Sher Shah Suri', wrong: ['Akbar', 'Rana Pratap', 'Shivaji'] },
    { text: 'Red Fort was built by?', answer: 'Shah Jahan', wrong: ['Akbar', 'Aurangzeb', 'Babur'] },
    { text: 'Mughal paintings flourished under?', answer: 'Jahangir', wrong: ['Babur', 'Aurangzeb', 'Shah Jahan'] },
    { text: 'Last major Mughal emperor?', answer: 'Aurangzeb', wrong: ['Akbar', 'Shah Jahan', 'Bahadur Shah'] },
    { text: 'Din-i-Ilahi was founded by?', answer: 'Akbar', wrong: ['Babur', 'Shah Jahan', 'Jahangir'] },
    { text: 'Mughal architecture combined Indian and?', answer: 'Persian styles', wrong: ['Chinese styles', 'Greek styles', 'Roman styles'] },
  ],
  'Modern India': [
    { text: 'East India Company came to India in?', answer: '1600', wrong: ['1700', 'Fact B', '1500'] },
    { text: 'Battle of Plassey was fought in?', answer: '1757', wrong: ['1857', '1947', '1600'] },
    { text: 'Who was the last Mughal emperor?', answer: 'Bahadur Shah Zafar', wrong: ['Akbar', 'Aurangzeb', 'Shah Jahan'] },
    { text: 'Revolt of 1857 started from?', answer: 'Meerut', wrong: ['Delhi', 'Calcutta', 'Bombay'] },
    { text: 'India got independence in?', answer: '1947', wrong: ['1950', '1942', '1930'] },
    { text: 'Who is known as Father of the Nation?', answer: 'Mahatma Gandhi', wrong: ['Nehru', 'Subhas Bose', 'Bhagat Singh'] },
    { text: 'Indian National Congress was formed in?', answer: '1885', wrong: ['1857', '1947', '1919'] },
    { text: 'Quit India Movement started in?', answer: '1942', wrong: ['1930', '1920', '1947'] },
    { text: 'First Governor General of free India?', answer: 'Lord Mountbatten', wrong: ['Nehru', 'Patel', 'Rajagopalachari'] },
    { text: 'Indian Constitution was adopted on?', answer: '26 January 1950', wrong: ['15 August 1947', '26 November 1949', '2 October 1950'] },
  ],
  'British Rule': [
    { text: 'Who introduced the Permanent Settlement?', answer: 'Lord Cornwallis', wrong: ['Lord Dalhousie', 'Lord Curzon', 'Warren Hastings'] },
    { text: 'Doctrine of Lapse was introduced by?', answer: 'Lord Dalhousie', wrong: ['Lord Cornwallis', 'Lord Curzon', 'Lord Canning'] },
    { text: 'First railway in India was built in?', answer: '1853', wrong: ['1900', '1857', '1947'] },
    { text: 'Jallianwala Bagh massacre happened in?', answer: '1919', wrong: ['1857', '1920', '1942'] },
    { text: 'Bengal was partitioned in?', answer: '1905', wrong: ['1857', '1919', '1947'] },
    { text: 'Simon Commission came to India in?', answer: '1928', wrong: ['1919', '1942', '1947'] },
    { text: 'Rowlatt Act was passed in?', answer: '1919', wrong: ['1857', '1930', '1942'] },
    { text: 'Salt March was led by?', answer: 'Mahatma Gandhi', wrong: ['Nehru', 'Patel', 'Bose'] },
    { text: 'First War of Independence was in?', answer: '1857', wrong: ['1919', '1942', '1947'] },
    { text: 'Who was the Viceroy during 1857 revolt?', answer: 'Lord Canning', wrong: ['Lord Dalhousie', 'Lord Curzon', 'Lord Mountbatten'] },
  ],
  'Freedom Struggle': [
    { text: 'Non-Cooperation Movement started in?', answer: '1920', wrong: ['1930', '1942', '1919'] },
    { text: 'Dandi March was related to?', answer: 'Salt tax', wrong: ['Cloth tax', 'Land tax', 'Food tax'] },
    { text: 'INA was led by?', answer: 'Subhas Chandra Bose', wrong: ['Mahatma Gandhi', 'Nehru', 'Bhagat Singh'] },
    { text: '"Do or Die" slogan was given by?', answer: 'Mahatma Gandhi', wrong: ['Nehru', 'Tilak', 'Patel'] },
    { text: 'Bhagat Singh was executed in?', answer: '1931', wrong: ['1920', '1942', '1947'] },
    { text: '"Swaraj is my birthright" was said by?', answer: 'Bal Gangadhar Tilak', wrong: ['Gandhi', 'Nehru', 'Bose'] },
    { text: 'Chauri Chaura incident happened in?', answer: '1922', wrong: ['1920', '1930', '1942'] },
    { text: 'Who wrote "Hind Swaraj"?', answer: 'Mahatma Gandhi', wrong: ['Nehru', 'Tilak', 'Ambedkar'] },
    { text: 'Partition of India was in?', answer: '1947', wrong: ['1950', '1942', '1930'] },
    { text: 'First session of INC was held in?', answer: 'Bombay', wrong: ['Delhi', 'Calcutta', 'Madras'] },
  ],
  'Diversity': [
    { text: 'India has how many states?', answer: '28', wrong: ['29', '30', '26'] },
    { text: 'India is a _____ country.', answer: 'Diverse', wrong: ['Uniform', 'Small', 'Island'] },
    { text: 'Indian Constitution guarantees?', answer: 'Equality', wrong: ['Monarchy', 'Dictatorship', 'Inequality'] },
    { text: 'Unity in Diversity means?', answer: 'Different but united', wrong: ['Same culture', 'One language', 'One religion'] },
    { text: 'Major religions in India include?', answer: 'All of these', wrong: ['Only Hinduism', 'Only Islam', 'Only Christianity'] },
    { text: 'How many languages are in the 8th Schedule?', answer: '22', wrong: ['10', '15', '30'] },
    { text: 'National language of India?', answer: 'No national language', wrong: ['Hindi', 'English', 'Sanskrit'] },
    { text: 'Prejudice means?', answer: 'Pre-judging', wrong: ['Being fair', 'Being kind', 'Understanding'] },
    { text: 'Discrimination is?', answer: 'Treating unequally', wrong: ['Treating equally', 'Helping', 'Supporting'] },
    { text: 'Secularism means?', answer: 'No state religion', wrong: ['One religion', 'No religion', 'Against religion'] },
  ],
  'Government': [
    { text: 'India is a?', answer: 'Republic', wrong: ['Monarchy', 'Dictatorship', 'Colony'] },
    { text: 'Head of India is the?', answer: 'President', wrong: ['King', 'Prime Minister', 'Governor'] },
    { text: 'PM is head of?', answer: 'Government', wrong: ['State', 'Army', 'Judiciary'] },
    { text: 'Parliament has how many houses?', answer: '2', wrong: ['1', '3', '4'] },
    { text: 'Lok Sabha members are?', answer: 'Elected by people', wrong: ['Appointed', 'Nominated', 'Inherited'] },
    { text: 'Rajya Sabha is the?', answer: 'Upper house', wrong: ['Lower house', 'Court', 'Council'] },
    { text: 'Who appoints the PM?', answer: 'President', wrong: ['People directly', 'Supreme Court', 'Governor'] },
    { text: 'Voting age in India is?', answer: '18 years', wrong: ['16 years', '21 years', '25 years'] },
    { text: 'Democratic government means?', answer: 'Rule by the people', wrong: ['Rule by king', 'Rule by army', 'Rule by one person'] },
    { text: 'Election Commission conducts?', answer: 'Elections', wrong: ['Census', 'Budget', 'Laws'] },
  ],
  'The Earth': [
    { text: 'Shape of the Earth is?', answer: 'Geoid', wrong: ['Flat', 'Square', 'Triangular'] },
    { text: 'Earth rotates on its?', answer: 'Axis', wrong: ['Orbit', 'Equator', 'Pole'] },
    { text: 'Revolution of Earth causes?', answer: 'Seasons', wrong: ['Day and night', 'Tides', 'Earthquakes'] },
    { text: 'Rotation of Earth causes?', answer: 'Day and night', wrong: ['Seasons', 'Tides', 'Rainfall'] },
    { text: 'Earth takes ____ hours to rotate once?', answer: '24', wrong: ['12', '48', '365'] },
    { text: 'How many continents are there?', answer: '7', wrong: ['5', '6', '8'] },
    { text: 'Largest ocean is?', answer: 'Pacific', wrong: ['Atlantic', 'Indian', 'Arctic'] },
    { text: 'Largest continent is?', answer: 'Asia', wrong: ['Africa', 'Europe', 'North America'] },
    { text: 'Earth revolves around the?', answer: 'Sun', wrong: ['Moon', 'Mars', 'Stars'] },
    { text: 'Equator divides Earth into?', answer: 'Two hemispheres', wrong: ['Four parts', 'Three parts', 'Six parts'] },
  ],
  'Globe and Maps': [
    { text: 'A globe is a model of?', answer: 'Earth', wrong: ['Moon', 'Sun', 'Mars'] },
    { text: 'Latitude lines run?', answer: 'East to West', wrong: ['North to South', 'Diagonally', 'Randomly'] },
    { text: 'Longitude lines run?', answer: 'North to South', wrong: ['East to West', 'Diagonally', 'Randomly'] },
    { text: 'Prime Meridian passes through?', answer: 'Greenwich', wrong: ['Delhi', 'New York', 'Tokyo'] },
    { text: '0° latitude is the?', answer: 'Equator', wrong: ['Tropic of Cancer', 'Prime Meridian', 'North Pole'] },
    { text: 'Maps use a _____ to show distances.', answer: 'Scale', wrong: ['Compass', 'Legend', 'Grid'] },
    { text: 'North is usually shown at the ____ of a map.', answer: 'Top', wrong: ['Bottom', 'Left', 'Right'] },
    { text: 'A political map shows?', answer: 'Boundaries', wrong: ['Mountains', 'Rainfall', 'Temperature'] },
    { text: 'Total number of longitudes?', answer: '360', wrong: ['180', '90', '100'] },
    { text: 'Total number of latitudes?', answer: '181', wrong: ['360', '90', '100'] },
  ],
  'Environment': [
    { text: 'The thin layer of air around Earth is called?', answer: 'Atmosphere', wrong: ['Lithosphere', 'Hydrosphere', 'Biosphere'] },
    { text: 'Deforestation leads to?', answer: 'Soil erosion', wrong: ['More rain', 'Cleaner air', 'More trees'] },
    { text: 'Water covers ____% of Earth.', answer: '71', wrong: ['50', '29', '90'] },
    { text: 'Ecosystem includes?', answer: 'Living and non-living things', wrong: ['Only plants', 'Only animals', 'Only water'] },
    { text: 'Global warming is caused by?', answer: 'Greenhouse gases', wrong: ['Rain', 'Wind', 'Snow'] },
    { text: 'Ozone layer protects us from?', answer: 'UV rays', wrong: ['Rain', 'Wind', 'Cold'] },
    { text: 'Main greenhouse gas is?', answer: 'Carbon dioxide', wrong: ['Oxygen', 'Nitrogen', 'Hydrogen'] },
    { text: 'Renewable resource example?', answer: 'Solar energy', wrong: ['Coal', 'Petroleum', 'Natural gas'] },
    { text: 'Water pollution is caused by?', answer: 'Factory waste', wrong: ['Clean water', 'Rain', 'Sunlight'] },
    { text: 'National parks protect?', answer: 'Wildlife', wrong: ['Buildings', 'Roads', 'Factories'] },
  ],
  'Democracy': [
    { text: 'Democracy means rule by?', answer: 'People', wrong: ['King', 'Army', 'Priest'] },
    { text: 'India became a republic in?', answer: '1950', wrong: ['1947', '1942', '1930'] },
    { text: 'Who can vote in India?', answer: 'Citizens above 18', wrong: ['Only men', 'Only rich', 'Only educated'] },
    { text: 'Universal Adult Suffrage means?', answer: 'All adults can vote', wrong: ['Only men vote', 'Only rich vote', 'No one votes'] },
    { text: 'Which is not a feature of democracy?', answer: 'Hereditary rule', wrong: ['Elections', 'Freedom', 'Equality'] },
    { text: 'Opposition party\'s role is to?', answer: 'Question the government', wrong: ['Support blindly', 'Do nothing', 'Leave the country'] },
    { text: 'Free press is important for?', answer: 'Democracy', wrong: ['Dictatorship', 'Monarchy', 'Communism'] },
    { text: 'Fundamental Rights are in which part of Constitution?', answer: 'Part III', wrong: ['Part I', 'Part V', 'Part X'] },
    { text: 'Right to Education is a?', answer: 'Fundamental Right', wrong: ['Law only', 'Suggestion', 'Not in Constitution'] },
    { text: 'India follows which type of democracy?', answer: 'Parliamentary', wrong: ['Presidential', 'Military', 'Monarchical'] },
  ],
  'Resources': [
    { text: 'Resources made by humans are called?', answer: 'Human-made', wrong: ['Natural', 'Divine', 'Alien'] },
    { text: 'Coal is a _____ resource.', answer: 'Non-renewable', wrong: ['Renewable', 'Unlimited', 'Free'] },
    { text: 'Wind energy is?', answer: 'Renewable', wrong: ['Non-renewable', 'Limited', 'Harmful'] },
    { text: 'Sustainable development means?', answer: 'Use without depleting', wrong: ['Use everything now', 'Stop using', 'Only for rich'] },
    { text: 'Forests are which type of resource?', answer: 'Natural', wrong: ['Human-made', 'Artificial', 'Synthetic'] },
    { text: 'Iron ore is a?', answer: 'Mineral resource', wrong: ['Plant resource', 'Animal resource', 'Water resource'] },
    { text: 'Tidal energy comes from?', answer: 'Ocean tides', wrong: ['Sun', 'Wind', 'Coal'] },
    { text: 'Petroleum is also called?', answer: 'Black gold', wrong: ['White gold', 'Green gold', 'Red gold'] },
    { text: 'Conservation means?', answer: 'Wise use of resources', wrong: ['Wasting resources', 'Destroying resources', 'Hoarding resources'] },
    { text: 'Solar energy comes from?', answer: 'Sun', wrong: ['Moon', 'Stars', 'Earth'] },
  ],
  'Indian Constitution': [
    { text: 'Who is called the Father of Indian Constitution?', answer: 'Dr. B.R. Ambedkar', wrong: ['Nehru', 'Gandhi', 'Patel'] },
    { text: 'Indian Constitution was adopted on?', answer: '26 November 1949', wrong: ['26 January 1950', '15 August 1947', '2 October 1949'] },
    { text: 'Preamble begins with?', answer: 'We the people of India', wrong: ['The Government of India', 'The President', 'The Parliament'] },
    { text: 'How many Fundamental Rights are there?', answer: '6', wrong: ['5', '7', '10'] },
    { text: 'Right to Equality means?', answer: 'All are equal before law', wrong: ['Rich have more rights', 'Only for adults', 'Only for men'] },
    { text: 'Directive Principles guide the?', answer: 'Government', wrong: ['Courts', 'Army', 'Citizens only'] },
    { text: 'Amendment means?', answer: 'Change in Constitution', wrong: ['New Constitution', 'Removing Constitution', 'Ignoring Constitution'] },
    { text: 'Fundamental Duties were added by which amendment?', answer: '42nd', wrong: ['1st', '10th', '73rd'] },
    { text: 'The Constitution provides for?', answer: 'Federal system', wrong: ['Monarchy', 'Dictatorship', 'Anarchy'] },
    { text: 'Supreme Court is the highest?', answer: 'Court', wrong: ['School', 'Office', 'Hospital'] },
  ],
};

const hindiBank = {
  'संज्ञा': [
    { text: 'संज्ञा के कितने भेद हैं?', answer: '5', wrong: ['3', '4', '7'] },
    { text: '"राम" कौन सी संज्ञा है?', answer: 'व्यक्तिवाचक', wrong: ['जातिवाचक', 'भाववाचक', 'समूहवाचक'] },
    { text: '"सेना" कौन सी संज्ञा है?', answer: 'समूहवाचक', wrong: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक'] },
    { text: '"ईमानदारी" कौन सी संज्ञा है?', answer: 'भाववाचक', wrong: ['व्यक्तिवाचक', 'जातिवाचक', 'द्रव्यवाचक'] },
    { text: '"लड़का" कौन सी संज्ञा है?', answer: 'जातिवाचक', wrong: ['व्यक्तिवाचक', 'भाववाचक', 'समूहवाचक'] },
    { text: '"सोना" कौन सी संज्ञा है?', answer: 'द्रव्यवाचक', wrong: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक'] },
    { text: 'संज्ञा किसे कहते हैं?', answer: 'नाम बताने वाले शब्द', wrong: ['क्रिया शब्द', 'विशेषण', 'सर्वनाम'] },
    { text: '"गंगा" कौन सी संज्ञा है?', answer: 'व्यक्तिवाचक', wrong: ['जातिवाचक', 'भाववाचक', 'समूहवाचक'] },
    { text: '"कक्षा" कौन सी संज्ञा है?', answer: 'समूहवाचक', wrong: ['व्यक्तिवाचक', 'भाववाचक', 'द्रव्यवाचक'] },
    { text: '"मिठास" कौन सी संज्ञा है?', answer: 'भाववाचक', wrong: ['व्यक्तिवाचक', 'जातिवाचक', 'द्रव्यवाचक'] },
  ],
  'सर्वनाम': [
    { text: 'सर्वनाम के कितने भेद हैं?', answer: '6', wrong: ['3', '5', '8'] },
    { text: '"मैं" कौन सा सर्वनाम है?', answer: 'उत्तम पुरुष', wrong: ['मध्यम पुरुष', 'अन्य पुरुष', 'निश्चयवाचक'] },
    { text: '"तुम" कौन सा सर्वनाम है?', answer: 'मध्यम पुरुष', wrong: ['उत्तम पुरुष', 'अन्य पुरुष', 'निश्चयवाचक'] },
    { text: '"वह" कौन सा सर्वनाम है?', answer: 'अन्य पुरुष', wrong: ['उत्तम पुरुष', 'मध्यम पुरुष', 'निश्चयवाचक'] },
    { text: '"कौन" कौन सा सर्वनाम है?', answer: 'प्रश्नवाचक', wrong: ['निश्चयवाचक', 'अनिश्चयवाचक', 'निजवाचक'] },
    { text: '"कोई" कौन सा सर्वनाम है?', answer: 'अनिश्चयवाचक', wrong: ['निश्चयवाचक', 'प्रश्नवाचक', 'निजवाचक'] },
    { text: 'सर्वनाम संज्ञा के स्थान पर?', answer: 'आता है', wrong: ['नहीं आता', 'कभी-कभी', 'केवल लिखित में'] },
    { text: '"यह" कौन सा सर्वनाम है?', answer: 'निश्चयवाचक', wrong: ['अनिश्चयवाचक', 'प्रश्नवाचक', 'निजवाचक'] },
    { text: '"आप" कौन सा सर्वनाम है?', answer: 'निजवाचक', wrong: ['उत्तम पुरुष', 'मध्यम पुरुष', 'प्रश्नवाचक'] },
    { text: '"हम" कौन सा सर्वनाम है?', answer: 'उत्तम पुरुष', wrong: ['मध्यम पुरुष', 'अन्य पुरुष', 'निश्चयवाचक'] },
  ],
  'विलोम शब्द': [
    { text: '"दिन" का विलोम है?', answer: 'रात', wrong: ['सुबह', 'दोपहर', 'शाम'] },
    { text: '"सुख" का विलोम है?', answer: 'दुख', wrong: ['आनंद', 'खुशी', 'प्रसन्नता'] },
    { text: '"आदि" का विलोम है?', answer: 'अंत', wrong: ['शुरू', 'मध्य', 'पहला'] },
    { text: '"जीवन" का विलोम है?', answer: 'मरण', wrong: ['जन्म', 'बचपन', 'बुढ़ापा'] },
    { text: '"अमीर" का विलोम है?', answer: 'गरीब', wrong: ['धनी', 'संपन्न', 'समृद्ध'] },
    { text: '"उत्तर" का विलोम है?', answer: 'दक्षिण', wrong: ['पूर्व', 'पश्चिम', 'ऊपर'] },
    { text: '"सत्य" का विलोम है?', answer: 'असत्य', wrong: ['झूठ', 'सच', 'कपट'] },
    { text: '"लाभ" का विलोम है?', answer: 'हानि', wrong: ['फायदा', 'मुनाफा', 'आय'] },
    { text: '"स्वदेश" का विलोम है?', answer: 'विदेश', wrong: ['देश', 'गाँव', 'शहर'] },
    { text: '"आशा" का विलोम है?', answer: 'निराशा', wrong: ['उम्मीद', 'विश्वास', 'भरोसा'] },
  ],
  'समास': [
    { text: 'समास का अर्थ है?', answer: 'शब्दों का संक्षेपीकरण', wrong: ['शब्दों का विस्तार', 'वाक्य बनाना', 'अर्थ बदलना'] },
    { text: '"राजपुत्र" में कौन सा समास है?', answer: 'तत्पुरुष', wrong: ['द्वंद्व', 'बहुव्रीहि', 'अव्ययीभाव'] },
    { text: '"नीलकमल" में कौन सा समास है?', answer: 'कर्मधारय', wrong: ['तत्पुरुष', 'द्वंद्व', 'बहुव्रीहि'] },
    { text: '"माता-पिता" में कौन सा समास है?', answer: 'द्वंद्व', wrong: ['तत्पुरुष', 'कर्मधारय', 'बहुव्रीहि'] },
    { text: '"दशानन" में कौन सा समास है?', answer: 'बहुव्रीहि', wrong: ['तत्पुरुष', 'द्वंद्व', 'कर्मधारय'] },
    { text: '"यथाशक्ति" में कौन सा समास है?', answer: 'अव्ययीभाव', wrong: ['तत्पुरुष', 'द्वंद्व', 'बहुव्रीहि'] },
    { text: 'समास के कितने भेद हैं?', answer: '6', wrong: ['4', '5', '8'] },
    { text: '"पंचवटी" में कौन सा समास है?', answer: 'द्विगु', wrong: ['तत्पुरुष', 'द्वंद्व', 'बहुव्रीहि'] },
    { text: '"चतुर्भुज" में कौन सा समास है?', answer: 'बहुव्रीहि', wrong: ['द्विगु', 'तत्पुरुष', 'कर्मधारय'] },
    { text: 'समास विग्रह का अर्थ है?', answer: 'समास को तोड़ना', wrong: ['समास बनाना', 'वाक्य बनाना', 'शब्द जोड़ना'] },
  ],
  'वाच्य': [
    { text: 'वाच्य के कितने भेद हैं?', answer: '3', wrong: ['2', '4', '5'] },
    { text: '"राम ने पत्र लिखा" कौन सा वाच्य है?', answer: 'कर्तृवाच्य', wrong: ['कर्मवाच्य', 'भाववाच्य', 'मिश्रवाच्य'] },
    { text: '"पत्र लिखा गया" कौन सा वाच्य है?', answer: 'कर्मवाच्य', wrong: ['कर्तृवाच्य', 'भाववाच्य', 'मिश्रवाच्य'] },
    { text: '"मुझसे चला नहीं जाता" कौन सा वाच्य है?', answer: 'भाववाच्य', wrong: ['कर्तृवाच्य', 'कर्मवाच्य', 'मिश्रवाच्य'] },
    { text: 'कर्तृवाच्य में प्रधान होता है?', answer: 'कर्ता', wrong: ['कर्म', 'भाव', 'क्रिया'] },
    { text: 'कर्मवाच्य में प्रधान होता है?', answer: 'कर्म', wrong: ['कर्ता', 'भाव', 'विशेषण'] },
    { text: 'भाववाच्य में प्रधान होता है?', answer: 'भाव', wrong: ['कर्ता', 'कर्म', 'विशेषण'] },
    { text: '"सीता गाना गाती है" कौन सा वाच्य है?', answer: 'कर्तृवाच्य', wrong: ['कर्मवाच्य', 'भाववाच्य', 'मिश्रवाच्य'] },
    { text: '"गाना गाया गया" कौन सा वाच्य है?', answer: 'कर्मवाच्य', wrong: ['कर्तृवाच्य', 'भाववाच्य', 'मिश्रवाच्य'] },
    { text: 'वाच्य परिवर्तन में बदलता है?', answer: 'क्रिया का रूप', wrong: ['संज्ञा', 'सर्वनाम', 'विशेषण'] },
  ],
  'रस': [
    { text: 'रस के कितने प्रकार हैं?', answer: '9', wrong: ['7', '8', '10'] },
    { text: 'श्रृंगार रस का स्थायी भाव है?', answer: 'रति', wrong: ['क्रोध', 'शोक', 'भय'] },
    { text: 'वीर रस का स्थायी भाव है?', answer: 'उत्साह', wrong: ['क्रोध', 'रति', 'भय'] },
    { text: 'करुण रस का स्थायी भाव है?', answer: 'शोक', wrong: ['रति', 'क्रोध', 'भय'] },
    { text: 'हास्य रस का स्थायी भाव है?', answer: 'हास', wrong: ['रति', 'शोक', 'उत्साह'] },
    { text: 'रौद्र रस का स्थायी भाव है?', answer: 'क्रोध', wrong: ['भय', 'शोक', 'उत्साह'] },
    { text: 'भयानक रस का स्थायी भाव है?', answer: 'भय', wrong: ['क्रोध', 'शोक', 'रति'] },
    { text: 'रस को काव्य की _____ कहते हैं.', answer: 'आत्मा', wrong: ['शरीर', 'मन', 'बुद्धि'] },
    { text: 'शांत रस का स्थायी भाव है?', answer: 'निर्वेद', wrong: ['रति', 'शोक', 'भय'] },
    { text: 'रस के कितने अंग होते हैं?', answer: '4', wrong: ['3', '5', '6'] },
  ],
};

const engBank = {
  'Nouns and Pronouns': [
    { text: 'A noun is a name of a?', answer: 'Person, place or thing', wrong: ['Action', 'Quality', 'None of these'] },
    { text: '"Happiness" is which type of noun?', answer: 'Abstract noun', wrong: ['Common noun', 'Proper noun', 'Collective noun'] },
    { text: '"I" is which type of pronoun?', answer: 'Personal pronoun', wrong: ['Possessive pronoun', 'Relative pronoun', 'Interrogative'] },
    { text: '"Delhi" is which type of noun?', answer: 'Proper noun', wrong: ['Common noun', 'Abstract noun', 'Collective noun'] },
    { text: '"Flock" is which type of noun?', answer: 'Collective noun', wrong: ['Common noun', 'Proper noun', 'Abstract noun'] },
    { text: 'Pronoun replaces a?', answer: 'Noun', wrong: ['Verb', 'Adjective', 'Adverb'] },
    { text: '"Who" is which type of pronoun?', answer: 'Interrogative', wrong: ['Personal', 'Possessive', 'Reflexive'] },
    { text: '"Myself" is which type of pronoun?', answer: 'Reflexive', wrong: ['Personal', 'Possessive', 'Relative'] },
    { text: '"Boy" is which type of noun?', answer: 'Common noun', wrong: ['Proper noun', 'Abstract noun', 'Collective noun'] },
    { text: 'Plural of "child" is?', answer: 'Children', wrong: ['Childs', 'Childes', 'Childeren'] },
  ],
  'Verbs and Tenses': [
    { text: 'Past tense of "go" is?', answer: 'Went', wrong: ['Goed', 'Gone', 'Going'] },
    { text: 'Past tense of "eat" is?', answer: 'Ate', wrong: ['Eated', 'Eaten', 'Eating'] },
    { text: '"She ___ to school daily." (go)', answer: 'goes', wrong: ['go', 'went', 'going'] },
    { text: 'Present continuous uses?', answer: 'is/am/are + verb-ing', wrong: ['was + verb', 'will + verb', 'had + verb'] },
    { text: 'Future tense uses?', answer: 'Will/Shall', wrong: ['Was/Were', 'Is/Are', 'Had/Has'] },
    { text: 'Past tense of "write" is?', answer: 'Wrote', wrong: ['Writed', 'Written', 'Writing'] },
    { text: '"I ___ playing cricket." (present continuous)', answer: 'am', wrong: ['is', 'was', 'will'] },
    { text: 'Past tense of "run" is?', answer: 'Ran', wrong: ['Runned', 'Running', 'Runs'] },
    { text: 'How many main tenses are there?', answer: '3', wrong: ['2', '4', '5'] },
    { text: '"They ___ the movie yesterday."', answer: 'watched', wrong: ['watch', 'are watching', 'will watch'] },
  ],
  'Tenses Advanced': [
    { text: 'Present Perfect uses?', answer: 'has/have + past participle', wrong: ['is + verb-ing', 'was + verb', 'will + verb'] },
    { text: '"She has already ___ lunch."', answer: 'eaten', wrong: ['eat', 'ate', 'eating'] },
    { text: 'Past perfect uses?', answer: 'had + past participle', wrong: ['has + verb', 'will + verb', 'is + verb'] },
    { text: '"I ___ finished before he came."', answer: 'had', wrong: ['have', 'has', 'will'] },
    { text: 'Future Perfect uses?', answer: 'will have + past participle', wrong: ['will + verb', 'has + verb', 'had + verb'] },
    { text: '"By 5 PM, she ___ reached."', answer: 'will have', wrong: ['has', 'had', 'is'] },
    { text: 'Past participle of "break" is?', answer: 'broken', wrong: ['breaked', 'broke', 'breaking'] },
    { text: 'Past participle of "sing" is?', answer: 'sung', wrong: ['singed', 'sang', 'singing'] },
    { text: '"They have ___ to the park."', answer: 'gone', wrong: ['go', 'went', 'going'] },
    { text: 'Past participle of "do" is?', answer: 'done', wrong: ['doed', 'did', 'doing'] },
  ],
  'Active Passive Voice': [
    { text: '"Ram eats an apple." Change to passive.', answer: 'An apple is eaten by Ram', wrong: ['An apple was eaten by Ram', 'Ram is eaten by apple', 'Apple eats Ram'] },
    { text: 'In passive voice, object becomes?', answer: 'Subject', wrong: ['Verb', 'Predicate', 'Object'] },
    { text: '"The letter was written by her." This is?', answer: 'Passive voice', wrong: ['Active voice', 'Future tense', 'None'] },
    { text: '"She sings a song." — Passive?', answer: 'A song is sung by her', wrong: ['She is sung a song', 'A song she sings', 'Song sings her'] },
    { text: 'Passive voice mainly uses?', answer: 'be + past participle', wrong: ['is + verb-ing', 'will + verb', 'have + verb'] },
    { text: '"The cake was baked." Voice?', answer: 'Passive', wrong: ['Active', 'Future', 'None'] },
    { text: '"They play cricket." — Passive?', answer: 'Cricket is played by them', wrong: ['They is played', 'Cricket they play', 'Play is cricketed'] },
    { text: '"He was helped by me." — Active?', answer: 'I helped him', wrong: ['He helped me', 'Me helped he', 'Him I helped'] },
    { text: 'In active voice, _____ does the action.', answer: 'Subject', wrong: ['Object', 'Verb', 'Adverb'] },
    { text: '"The door was opened." This is?', answer: 'Passive voice', wrong: ['Active voice', 'Imperative', 'Exclamatory'] },
  ],
  'Direct Indirect Speech': [
    { text: 'Direct speech uses?', answer: 'Quotation marks', wrong: ['Brackets', 'Dashes', 'Underlines'] },
    { text: '"He said, I am happy." — Indirect?', answer: 'He said that he was happy', wrong: ['He said I am happy', 'He says he is happy', 'He told happy'] },
    { text: '"Said" becomes _____ in indirect.', answer: 'told/said that', wrong: ['say', 'will say', 'saying'] },
    { text: '"Am" changes to _____ in indirect.', answer: 'was', wrong: ['is', 'are', 'will be'] },
    { text: '"She said, I will go." — Indirect?', answer: 'She said she would go', wrong: ['She said I will go', 'She says she goes', 'She told will going'] },
    { text: '"Today" becomes _____ in indirect.', answer: 'That day', wrong: ['This day', 'Tomorrow', 'Yesterday'] },
    { text: '"Here" becomes _____ in indirect.', answer: 'There', wrong: ['Here only', 'Nowhere', 'Everywhere'] },
    { text: '"Tomorrow" becomes _____ in indirect.', answer: 'The next day', wrong: ['Today', 'Yesterday', 'Last day'] },
    { text: '"Now" becomes _____ in indirect.', answer: 'Then', wrong: ['Now only', 'Later', 'Before'] },
    { text: '"This" becomes _____ in indirect.', answer: 'That', wrong: ['This only', 'These', 'Those'] },
  ],
};

// Combine all question banks
const allBanks = {};
for (let key in scienceBank) allBanks[key] = scienceBank[key];
for (let key in sstBank) allBanks[key] = sstBank[key];
for (let key in hindiBank) allBanks[key] = hindiBank[key];
for (let key in engBank) allBanks[key] = engBank[key];

function buildFromBank(levelName, count) {
  let bank = allBanks[levelName];
  if (!bank || bank.length === 0) return null;
  
  let selected = shuffleArray(bank).slice(0, count);
  let questions = [];
  
  for (let i = 0; i < selected.length; i++) {
    let q = selected[i];
    let options = [q.answer, ...q.wrong.slice(0, 3)];
    options = shuffleArray(options);
    questions.push({
      id: i,
      text: q.text,
      options: options,
      correct: getCorrectIndex(options, q.answer)
    });
  }
  
  // If we need more questions than bank has, repeat
  while (questions.length < count) {
    let extra = bank[Math.floor(Math.random() * bank.length)];
    let options = shuffleArray([extra.answer, ...extra.wrong.slice(0, 3)]);
    questions.push({
      id: questions.length,
      text: extra.text,
      options: options,
      correct: getCorrectIndex(options, extra.answer)
    });
  }
  
  return questions;
}

export function generateQuestions(levelName, count, subjectId) {
  if (!count) count = 10;
  if (!subjectId) subjectId = 'math';

  // Try question bank first (for sci, sst, hindi, eng)
  let banked = buildFromBank(levelName, count);
  if (banked) return banked;

  // Math question generator (dynamic)
  let questions = [];
  let levelLower = levelName.toLowerCase();

  for (let i = 0; i < count; i++) {
    let text = "";
    let answer = "";
    let wrongAnswers = [];

    if (levelLower.indexOf('fraction') !== -1) {
      let denom = 5;
      let num1 = Math.floor(Math.random() * 4) + 1;
      let num2 = Math.floor(Math.random() * 4) + 1;
      text = "What is " + num1 + "/" + denom + " + " + num2 + "/" + denom + "?";
      answer = (num1 + num2) + "/" + denom;
      for (let w = 1; w <= 10; w++) wrongAnswers.push(w + "/" + denom);
    } else if (levelLower.indexOf('decimal') !== -1) {
      let n1 = Math.floor(Math.random() * 10) + 1;
      let n2 = Math.floor(Math.random() * 10) + 1;
      text = "What is " + n1 + ".5 + " + n2 + ".5?";
      answer = (n1 + n2 + 1) + ".0";
      for (let w = 1; w <= 25; w++) wrongAnswers.push(w + ".0");
    } else if (levelLower.indexOf('geometry') !== -1 || levelLower.indexOf('quadrilateral') !== -1) {
      let side = Math.floor(Math.random() * 8) + 2;
      text = "Area of square with side " + side + "?";
      answer = (side * side).toString();
      for (let w = 1; w <= 100; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('square') !== -1 || levelLower.indexOf('root') !== -1) {
      let n = Math.floor(Math.random() * 10) + 2;
      text = "What is " + n + " squared?";
      answer = (n * n).toString();
      for (let w = 1; w <= 100; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('cube') !== -1) {
      let n = Math.floor(Math.random() * 6) + 2;
      text = "What is " + n + " cubed?";
      answer = (n * n * n).toString();
      for (let w = 1; w <= 250; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('percentage') !== -1 || levelLower.indexOf('profit') !== -1) {
      let p = Math.floor(Math.random() * 50) + 10;
      let v = Math.floor(Math.random() * 5 + 1) * 100;
      text = "What is " + p + "% of " + v + "?";
      answer = ((p * v) / 100).toString();
      for (let w = 1; w <= 300; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('ratio') !== -1 || levelLower.indexOf('proportion') !== -1) {
      let a = Math.floor(Math.random() * 5) + 1;
      let b = Math.floor(Math.random() * 5) + 1;
      let m = Math.floor(Math.random() * 4) + 2;
      text = "Simplify ratio " + (a * m) + ":" + (b * m);
      answer = a + ":" + b;
      wrongAnswers.push((a + 1) + ":" + b);
      wrongAnswers.push(a + ":" + (b + 1));
      wrongAnswers.push((a * m) + ":" + (b * m));
      wrongAnswers.push((b) + ":" + (a));
    } else if (levelLower.indexOf('linear') !== -1 || levelLower.indexOf('equation') !== -1) {
      let x = Math.floor(Math.random() * 10) + 1;
      let c = Math.floor(Math.random() * 10) + 1;
      text = "Solve: x + " + c + " = " + (x + c);
      answer = x.toString();
      for (let w = 1; w <= 20; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('integer') !== -1) {
      let n1 = Math.floor(Math.random() * 20) - 10;
      let n2 = Math.floor(Math.random() * 20) - 10;
      text = "What is (" + n1 + ") + (" + n2 + ")?";
      answer = (n1 + n2).toString();
      for (let w = -20; w <= 20; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('algebra') !== -1 || levelLower.indexOf('expression') !== -1 || levelLower.indexOf('factoris') !== -1) {
      let a = Math.floor(Math.random() * 5) + 1;
      let b = Math.floor(Math.random() * 5) + 1;
      text = "What is " + a + "x + " + b + "x?";
      answer = (a + b) + "x";
      wrongAnswers.push((a * b) + "x");
      wrongAnswers.push(a + "x");
      wrongAnswers.push(b + "x");
      wrongAnswers.push((a + b + 1) + "x");
    } else if (levelLower.indexOf('exponent') !== -1) {
      let base = Math.floor(Math.random() * 5) + 2;
      let exp = Math.floor(Math.random() * 3) + 2;
      text = "What is " + base + "^" + exp + "?";
      answer = Math.pow(base, exp).toString();
      for (let w = 1; w <= 200; w++) wrongAnswers.push(w.toString());
    } else if (levelLower.indexOf('perimeter') !== -1 || levelLower.indexOf('area') !== -1 || levelLower.indexOf('mensuration') !== -1) {
      let l = Math.floor(Math.random() * 10) + 2;
      let w2 = Math.floor(Math.random() * 10) + 2;
      text = "Perimeter of rectangle with l=" + l + ", w=" + w2 + "?";
      answer = (2 * (l + w2)).toString();
      for (let w = 1; w <= 80; w++) wrongAnswers.push(w.toString());
    } else {
      let n1 = Math.floor(Math.random() * 20) + 1;
      let n2 = Math.floor(Math.random() * 20) + 1;
      text = "What is " + n1 + " + " + n2 + "?";
      answer = (n1 + n2).toString();
      for (let w = 1; w <= 50; w++) wrongAnswers.push(w.toString());
    }

    let options = [answer];
    let attempts = 0;
    while (options.length < 4 && attempts < 100) {
      attempts++;
      let wrong = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      if (options.indexOf(wrong) === -1) options.push(wrong);
    }
    while (options.length < 4) options.push("Option " + Math.random().toFixed(0));

    options = shuffleArray(options);
    questions.push({ id: i, text: text, options: options, correct: getCorrectIndex(options, answer) });
  }

  return questions;
}
