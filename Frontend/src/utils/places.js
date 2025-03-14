const places = [
    {
      name: "Grand Canyon, USA",
      description: "The Grand Canyon, located in Arizona, USA, is one of the world's most awe-inspiring natural wonders. Carved over millions of years by the Colorado River, this vast canyon stretches for 277 miles and plunges to depths of over a mile. Its layers of red rock reveal a geological history dating back nearly two billion years. Visitors can explore numerous viewpoints, such as the South Rim and North Rim, which offer breathtaking panoramic vistas. Activities include hiking the Bright Angel Trail, rafting along the river, and witnessing spectacular sunrises and sunsets.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Eiffel Tower, France",
      description: "The Eiffel Tower, an iconic symbol of France, stands in the heart of Paris. Constructed in 1889 by Gustave Eiffel for the World’s Fair, the tower was initially met with criticism but later became one of the most beloved structures in the world. Rising 1,083 feet high, it offers breathtaking views of the city from its observation decks. Visitors can take an elevator or climb the 1,665 steps to the top. The tower lights up beautifully at night, creating a mesmerizing golden glow that attracts millions of tourists each year.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Great Wall of China",
      description: "The Great Wall of China is one of the most impressive architectural feats in human history. Spanning over 13,000 miles, this ancient structure was built over several dynasties to protect China from invasions. Construction began in the 7th century BC and continued for centuries, with the most well-preserved sections built during the Ming Dynasty (1368-1644). The wall winds through mountains, deserts, and plains, showcasing breathtaking landscapes. Visitors often explore famous sections like Badaling, Mutianyu, and Jinshanling, which offer scenic hiking routes.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Santorini, Greece",
      description: "Santorini, a Greek island in the Aegean Sea, is renowned for its stunning white-washed buildings, blue-domed churches, and breathtaking sunsets. Formed by a volcanic eruption around 3,600 years ago, Santorini boasts dramatic cliffs and caldera views that attract millions of visitors annually. The island’s capital, Fira, offers narrow, winding streets lined with boutique shops and charming cafes, while Oia is famous for its postcard-perfect sunset spots.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Machu Picchu, Peru",
      description: "Machu Picchu, an ancient Incan citadel nestled high in the Peruvian Andes, is one of the world’s most remarkable archaeological sites. Built in the 15th century by the Inca emperor Pachacuti, this UNESCO World Heritage Site remained hidden from the world until its rediscovery by explorer Hiram Bingham in 1911. The site consists of over 200 structures, including temples, terraces, and palaces, all built with incredible precision without mortar.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Taj Mahal, India",
      description: "The Taj Mahal, a UNESCO World Heritage Site, is one of the most stunning architectural masterpieces in the world. Located in Agra, India, it was built in the 17th century by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife, Mumtaz Mahal. The structure, made of white marble, is adorned with intricate carvings, calligraphy, and semi-precious stones. Its symmetrical gardens and reflecting pools add to its majestic beauty.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Colosseum, Italy",
      description: "The Colosseum in Rome, Italy, is one of the most iconic structures of ancient Rome. Built in 70-80 AD, this massive amphitheater could hold up to 50,000 spectators and was used for gladiatorial contests, public spectacles, and dramatic performances. Today, the Colosseum stands as a symbol of Rome’s rich history and attracts millions of visitors every year. Walking through its ruins, you can almost hear the echoes of ancient battles.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Mount Fuji, Japan",
      description: "Mount Fuji, Japan’s highest mountain, stands majestically at 12,389 feet. This active volcano, known for its perfectly symmetrical cone, has been a source of artistic inspiration and religious significance for centuries. Every year, thousands of hikers make the pilgrimage to its summit to witness the breathtaking sunrise. Whether admired from Lake Kawaguchi or the Chureito Pagoda, Mount Fuji remains one of the most beautiful natural landmarks in the world.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Christ the Redeemer, Brazil",
      description: "Christ the Redeemer, standing atop Mount Corcovado in Rio de Janeiro, Brazil, is one of the most recognizable statues in the world. Completed in 1931, the 98-foot-tall statue overlooks the city, symbolizing peace and faith. The viewpoint offers stunning panoramic views of Rio, including Sugarloaf Mountain and Copacabana Beach. Millions of tourists visit this iconic landmark every year, making it one of Brazil’s most popular attractions.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Petra, Jordan",
      description: "Petra, also known as the 'Rose City,' is an ancient archaeological site in Jordan, famous for its rock-cut architecture and water conduit system. The city, carved into pink sandstone cliffs, was once a thriving trade hub. Its most famous structure, Al-Khazneh (The Treasury), is an architectural marvel that has stood the test of time. Visitors explore its tombs, temples, and stunning landscapes, making Petra a must-visit historical destination.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Stonehenge, UK",
      description: "Stonehenge, a prehistoric monument in England, consists of a ring of standing stones dating back to around 3000 BC. The purpose of this mysterious structure remains unknown, with theories ranging from an astronomical observatory to a religious site. The alignment of the stones with the summer and winter solstices continues to intrigue historians and archaeologists. Each year, thousands visit Stonehenge to experience its ancient wonder and spiritual energy.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    },
    {
      name: "Niagara Falls, Canada/USA",
      description: "Niagara Falls, one of the most powerful waterfalls in the world, straddles the border between Canada and the USA. With a combined flow rate of over 85,000 cubic feet per second, its sheer force is mesmerizing. Visitors can take boat tours like the famous 'Maid of the Mist' to experience the falls up close. The surrounding areas, including Niagara Parks and Clifton Hill, offer plenty of entertainment and breathtaking scenery.",
      photo: "https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg"
    }
  ];
  
  export default places;
  