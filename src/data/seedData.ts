import { Post } from '../types';
import { FESTIVE_ARTWORKS } from '../utils/festiveArtworks';

export const COUNTRIES_LIST = [
  { name: 'Nepal', code: 'NP', flag: '🇳🇵' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮' },
  { name: 'Cyprus', code: 'CY', flag: '🇨🇾' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    userName: 'Aarav & Sunita Sharma',
    familyName: 'Sharma Niwas',
    country: 'Nepal',
    countryCode: '🇳🇵',
    city: 'Kathmandu (Baluwatar)',
    category: 'dashain_tika',
    title: 'Four Generations United for Vijaya Dashami Tika & Jamara',
    story: 'Today our home in Baluwatar was filled with joyous laughter and blessings. Our 92-year-old grandfather placed the auspicious scarlet Tika and fresh golden Jamara on all 24 family members. Smelling the fresh barley sprouts, eating hot crispy Sel Roti, and feeling the warmth of elders reminded us why Dashain is the soul of our nation.',
    blessings: 'May Goddess Durga Bhavani bless every Nepali brother and sister worldwide with long life, fearless courage, and endless peace!',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.dashain_tika,
    mediaAlt: 'Auspicious Dashain Tika and Jamara brass thali',
    timestamp: '2 hours ago',
    likesCount: 142,
    viewsCount: 680,
    isFeatured: true,
    isApproved: true,
    comments: [
      {
        id: 'c-1',
        userName: 'Ramesh Poudel',
        country: '🇳🇵 Nepal',
        text: 'Jay Durga Mata! So heartwarming to see four generations together. Shubhakamana!',
        timestamp: '1 hour ago'
      },
      {
        id: 'c-2',
        userName: 'Pooja Karki',
        country: '🇦🇺 Australia',
        text: 'Missing Kathmandu so much seeing this thali. Happy Dashain from Sydney!',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    userName: 'Prabin & Anjali Giri',
    familyName: 'Giri Parivar',
    country: 'United States',
    countryCode: '🇺🇸',
    city: 'Dallas, Texas',
    category: 'tihar_lights',
    title: '108 Diyas and Handcrafted Rangoli in Texas for Laxmi Puja',
    story: 'Even thousands of miles away from Nepal, the devotion and festive light inside our hearts remains boundless! We gathered over forty Nepali diaspora families in our neighborhood, lit 108 clay oil diyas along the pathway to welcome Mata Laxmi, and finished an intricate 6-foot floral Rangoli mandala. The entire street glowed with warmth.',
    blessings: 'Wishing wealth of happiness, good health, and sparkling prosperity to every home across the globe on this auspicious Tihar!',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.tihar_lights,
    mediaAlt: 'Glowing Tihar Rangoli and oil lamps',
    timestamp: '5 hours ago',
    likesCount: 218,
    viewsCount: 1040,
    isFeatured: true,
    isApproved: true,
    comments: [
      {
        id: 'c-3',
        userName: 'Sushil Giri (Platform Manager)',
        country: '🇳🇵 Nepal',
        text: 'Incredible dedication preserving our sacred roots in Texas! Jai Laxmi Mata. Proud of the Giri Parivar.',
        timestamp: '3 hours ago'
      },
      {
        id: 'c-4',
        userName: 'David Miller',
        country: '🇺🇸 USA',
        text: 'Our Nepali neighbors have the most beautiful celebration on our whole block. Happy Tihar!',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    userName: 'Bikash Gurung',
    familyName: 'Gurung Heritage House',
    country: 'Nepal',
    countryCode: '🇳🇵',
    city: 'Pokhara (Sarangkot)',
    category: 'dashain_tika',
    title: 'Touching the Sky on Traditional Bamboo Linge Ping',
    story: 'In our village above Pokhara, we erected the traditional 4-bamboo pole Linge Ping at the crest of the hill. As the ancient proverb goes: once a year on Dashain, every person must leave the ground and touch the sky on the swing to cleanse the spirit! The view of Machapuchare and Annapurna behind the swing took everyone\'s breath away.',
    blessings: 'May your spirits soar as high as the Himalayas! Subha Vijaya Dashami to all.',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.himalayan_village_ping,
    mediaAlt: 'Bamboo swing Linge Ping on Nepali hills',
    timestamp: '7 hours ago',
    likesCount: 189,
    viewsCount: 890,
    isFeatured: true,
    isApproved: true,
    comments: [
      {
        id: 'c-5',
        userName: 'Suman Shrestha',
        country: '🇬🇧 UK',
        text: 'The feeling of swinging on a Linge Ping in Sarangkot is unmatched in the universe.',
        timestamp: '5 hours ago'
      }
    ]
  },
  {
    id: 'post-4',
    userName: 'Shristi & Rohan Thapa',
    familyName: 'Thapa House',
    country: 'United Kingdom',
    countryCode: '🇬🇧',
    city: 'London (Richmond)',
    category: 'bhai_tika',
    title: 'Sacred Seven-Coloured Saptarangi Tika & Makhamali Malas',
    story: 'My brother flew in from Edinburgh, and we continued our family tradition. I prepared the auspicious circle of water and mustard oil to ward off Yamaraj, placed the sacred 7-color Saptarangi Tika on his forehead, and garlanded him with the eternal purple Makhamali flowers our aunt sent from Dhankuta.',
    blessings: 'Praying for the eternal bond, long life, and divine protection of all brothers and sisters worldwide.',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.bhai_tika,
    mediaAlt: 'Sacred Bhai Tika seven colored tika and kalash',
    timestamp: '11 hours ago',
    likesCount: 164,
    viewsCount: 770,
    isFeatured: false,
    isApproved: true,
    comments: [
      {
        id: 'c-6',
        userName: 'Alisha Rai',
        country: '🇨🇦 Canada',
        text: 'Bhai Tika is pure love. Blessings to both of you from Toronto!',
        timestamp: '9 hours ago'
      }
    ]
  },
  {
    id: 'post-5',
    userName: 'Manish Adhikari',
    familyName: 'Adhikari Parivar',
    country: 'Australia',
    countryCode: '🇦🇺',
    city: 'Sydney (Parramatta)',
    category: 'jamara_ghatasthapana',
    title: 'Ghatasthapana Barley Jamara Flourishing Under the Southern Sun',
    story: 'On the sacred day of Ghatasthapana, we purified the clay vessel, sowed clean barley and maize seeds in dark room conditions with holy water. Today, the divine tender yellow-green shoots have grown tall and vibrant! It proves that our sacred rituals travel with us wherever our journey takes us.',
    blessings: 'Subhakamana for peace, prosperity and wisdom to our entire global Nepali community.',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.dashain_tika,
    mediaAlt: 'Ghatasthapana Jamara shoots',
    timestamp: '14 hours ago',
    likesCount: 135,
    viewsCount: 610,
    isFeatured: false,
    isApproved: true,
    comments: []
  },
  {
    id: 'post-6',
    userName: 'Puja Shrestha & Nepali Youth Club',
    familyName: 'Shrestha Niwas',
    country: 'Japan',
    countryCode: '🇯🇵',
    city: 'Tokyo (Shinjuku)',
    category: 'deusi_bhailo',
    title: 'Authentic Deusi Bhailo Night with Madal and Harmonium in Tokyo',
    story: 'We dressed in traditional Daura Suruwal and Gunyo Cholo, picked up the traditional Madal drum, and visited Nepali students and families across Tokyo singing "Aha bhana mera bhaiho Deusi re!". The tears of joy in the eyes of senior community members who haven\'t heard live Deusi in years was priceless.',
    blessings: 'Hariyo gobar le lipeko, Laxmi Puja ko din ma... May happiness always knock on your door!',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.diaspora_gathering,
    mediaAlt: 'Global diaspora Deusi Bhailo feast',
    timestamp: '18 hours ago',
    likesCount: 295,
    viewsCount: 1420,
    isFeatured: true,
    isApproved: true,
    comments: [
      {
        id: 'c-7',
        userName: 'Kenji Sato',
        country: '🇯🇵 Japan',
        text: 'Such beautiful Nepali music and culture! Thank you for sharing with us in Tokyo.',
        timestamp: '12 hours ago'
      }
    ]
  },
  {
    id: 'post-7',
    userName: 'Hemant & Deepa KC',
    familyName: 'KC Family',
    country: 'Canada',
    countryCode: '🇨🇦',
    city: 'Toronto (Scarborough)',
    category: 'diaspora_gathering',
    title: 'Connecting Baglung Village to Toronto via Festival Live Call',
    story: 'We set up our tablet right next to our brass puja thali with Sel Roti, mutton curry, and aloo achar. At 7 AM Toronto time (4:45 PM in Nepal), our parents gave us digital Tika while chanting the sacred Dashain Ashirwad mantra. Distance disappeared in seconds.',
    blessings: 'No border or ocean can weaken the bond of Nepali families. Happy Dashain & Tihar to all!',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.diaspora_gathering,
    mediaAlt: 'Toronto Nepali family festive gathering',
    timestamp: '1 day ago',
    likesCount: 172,
    viewsCount: 840,
    isFeatured: false,
    isApproved: true,
    comments: []
  },
  {
    id: 'post-8',
    userName: 'Nabin & Karuna Basnet',
    familyName: 'Basnet Parivar',
    country: 'United Arab Emirates',
    countryCode: '🇦🇪',
    city: 'Dubai (Downtown)',
    category: 'tihar_lights',
    title: 'Sayapatri Garlands and Sweet Distribution Across the Emirates',
    story: 'We handcrafted fresh marigold Sayapatri garlands and shared Nepali festival sweets (Laddoo, Rasgulla, and fresh Sel Roti) with our international colleagues and neighbors here in Dubai. Seeing people of 12 nationalities admire our Tihar diyas was deeply humbling.',
    blessings: 'May the light of Deepawali dispel all darkness and hatred from our world!',
    mediaType: 'image',
    mediaUrl: FESTIVE_ARTWORKS.tihar_lights,
    mediaAlt: 'Tihar festival lights celebration in Dubai',
    timestamp: '2 days ago',
    likesCount: 203,
    viewsCount: 950,
    isFeatured: false,
    isApproved: true,
    comments: []
  }
];

export const FESTIVAL_CALENDAR_INFO = [
  {
    festival: 'Bada Dashain',
    days: [
      { name: 'Day 1: Ghatasthapana', desc: 'Planting sacred barley seeds in sand to sprout golden Jamara under divine silence.' },
      { name: 'Day 7: Fulpati', desc: 'Royal procession welcoming nine sacred plants into the sanctum sanctorum.' },
      { name: 'Day 8: Maha Ashtami & Kalratri', desc: 'Veneration of Goddess Durga\'s power and triumph over negative forces.' },
      { name: 'Day 9: Maha Navami', desc: 'Worship of Vishwakarma, craft instruments, vehicles, and tools of livelihood.' },
      { name: 'Day 10: Vijaya Dashami (Tika)', desc: 'Elders bestow vibrant red Akshata Tika, auspicious Jamara, and Vedic blessings.' },
      { name: 'Day 15: Kojagrat Purnima', desc: 'Vigil night welcoming Goddess Laxmi to bless homes that remain awake with light.' }
    ]
  },
  {
    festival: 'Tihar (Deepawali & Yama Panchak)',
    days: [
      { name: 'Day 1: Kaag Tihar', desc: 'Honoring crows as sacred messengers between heaven and earth.' },
      { name: 'Day 2: Kukur Tihar', desc: 'Garlanding loyal dogs celebrating devotion, guardianship, and soul protection.' },
      { name: 'Day 3: Gai Tihar & Laxmi Puja', desc: 'Veneration of the sacred cow in morning; lighting oil diyas to welcome Goddess Laxmi at night.' },
      { name: 'Day 4: Govardhan Puja & Mha Puja', desc: 'Worship of ox, mountain of nature, and Newari purification of the inner self.' },
      { name: 'Day 5: Bhai Tika', desc: 'Sisters place seven-colored Saptarangi Tika and Makhamali malas on brothers for eternal life.' }
    ]
  }
];

export const FESTIVAL_CALENDAR_INFO_NEPALI = [
  {
    festival: 'बडा दसैँ',
    days: [
      { name: 'पहिलो दिन: घटस्थापना', desc: 'पवित्र बालुवामा जौ र मकैका गेडा छरेर कलश स्थापना गरी पहेंलो जमरा उमार्ने वैदिक शुभारम्भ।' },
      { name: 'सातौं दिन: फूलपाती', desc: 'शुभ साइतमा नौ प्रकारका औषधीय वनस्पती र फूलपाती हर्षोल्लासका साथ भित्र्याउने परम्परा।' },
      { name: 'आठौं दिन: महाअष्टमी तथा कालरात्रि', desc: 'माता दुर्गा भवानीको उग्र शक्तिको आराधना गरी नकारात्मक तत्वमाथि विजयको संकल्प।' },
      { name: 'नवौं दिन: महानवमी', desc: 'शिल्पी भगवान विश्वकर्मा र जीवनयापनका साधन, हतियार तथा सवारीसाधनको विशेष पूजा।' },
      { name: 'दशौं दिन: विजया दशमी (टीका)', desc: 'मान्यजन र अग्रजहरूबाट रातो अक्षता, सुनौलो जमरा र वैदिक मन्त्रोच्चारणसहित आशिर्वाद ग्रहण।' },
      { name: 'पन्ध्रौं दिन: कोजाग्रत पूर्णिमा', desc: 'रातभर जाग्राम बसी धन र ऐश्वर्यकी देवी महालक्ष्मीको स्वागत र दसैँ समापन।' }
    ]
  },
  {
    festival: 'तिहार (दीपावली तथा यमपञ्चक)',
    days: [
      { name: 'पहिलो दिन: काग तिहार', desc: 'सन्देशवाहक पंक्षी कागलाई मीठा-मीठा अन्न दिएर पूजा गरी यमराजको दूतको सम्मान।' },
      { name: 'दोस्रो दिन: कुकुर तिहार', desc: 'मानव जातिको सबैभन्दा बफादार साथी कुकुरलाई सयपत्री माला र टीका लगाई पूजा।' },
      { name: 'तेस्रो दिन: गाई तिहार तथा लक्ष्मी पूजा', desc: 'बिहान गौमाताको पूजा; साँझ घर-आँगन दियो र बत्तीले झलमल्ल पारी धनधान्यकी देवी लक्ष्मीको स्वागत।' },
      { name: 'चौथो दिन: गोवर्धन पूजा तथा म्ह पूजा', desc: 'गोरु र प्रकृतिको पर्वत गोवर्धनको पूजा, तथा नेवारी समुदायद्वारा आफ्नै आत्माको शुद्धिकरण (म्ह पूजा)।' },
      { name: 'पाँचौं दिन: पावन भाइटीका', desc: 'दिदीबहिनीहरूद्वारा दाजुभाइलाई सप्तरङ्गी टीका, मखमली माला र ओखर फोरी दीर्घायुको प्रार्थना।' }
    ]
  }
];

