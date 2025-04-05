import { useState } from "react";
import "../index.css";
export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="about-page">
      <div className="mt-6 max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="mt-6 text-3xl font-bold text-center">
          About Our Project
        </h1>

        {[
          {
            title: "Introduction",
            content:
              "Tirupathi Municipal Corporation is the 1st largest ULB in the Chittoor district of A.P. it is spread over an area of 27.44 Sq.Kms.With a population of 374260 (2011 census). It is known for/famous for its  Spiritual City foot hill  Town of Tirumala Hills and abode of Lord Venkateswara.",
          },
          {
            title: "Location",
            content:
              "It is located 550 Kms. From Capital city and 71 Kms.From District Headquarters. It was established as 3rd grade Municipality in the year 1-4-1886 and upgraded as Municipal Corporation with w.e.f. 2-3-2007 There are no zones/and 50 election wards in this municipality.",
          },
          {
            title: "Topography",
            content:
              "The Geological monument is located in the Tirupathi valley, which is bounded between (13.50’N 79.79.375 E) and (13.45 N 79.75 E). The basin is delimited between the Palakonda – Velikonda and Sanainbatla Srikalahasthi and Nagairi ranges of the EasternGhats. Tirupati Temple, the most famous pilgrimages centre in South India is in the midst of the range of hills. The hills enclose the temple town to give it a form of an amphitheatre setting The topography of the Town is in nature and maximum elevation difference is in the order of 50mtr. And town is hilly terrain & In general it is very deep slope from west south to North east of city. Due to hilly terrain, the velocity of runoff is very high.",
          },
          {
            title: "Climate and Rainfall",
            content:
              "Tirupati region is semi- arid with pronounced variation in temperature. The temperature is high during March – May and low during November – January. The Yearly average minimum and maximum temperatures are about 25 C and 35 C. Difference in Minimum and Maximum monthly temperatures remains, in general, less than about 20 C for the whole year. Variations in minimum and maximum temperatures and also during different months of the year reflect typical semi – arid climate. The variations in the relative humidity throughout the year reflect tropical semi- arid climate. Between july and December, the relative humidity is about 70% to 80% in the morning and about 60 to 65% in the afternoon. During summer, the relative humidity in the afternoon is about 25 to 40%. The annual Reain fall in the region varies between 860 and 1050mm. Rain fall occurs as high as 1450mm with recurrence interval of 4 to 4 years. The S W monsoon (June – September) receives about 45-55% and the NE Monsoon ( October-December) Receives about 30-45% of annual rainfall. The annual Rainfall in the region varies between 860 and 1050mm.",
          },
          {
            title: "Demography",
            content:
              "The population of the town which was 228202 in 2001 increased to 374260 in 2011 with an increase of 6.40 % in the last decade. The sex ratio is 966 females per 1000 males. The literacy rate is 87.55 %.  92.74% of the male population and 82.21 % of the female population are literate.",
          },
          {
            title: "Economy",
            content:
              "The economy is basically tourism-based, being the seat of Lord Sri Venkateswara and surrounded by a host of temples. The surrounding villages of Tirupati are agro-based with dry land, irrigated through wells and tanks",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="about-inner rounded mt-3 rounded-lg shadow-md p-4 cursor-pointer bg-white"
            onClick={() => toggleSection(index)}
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {activeSection === index && (
              <p className="text-white-700 mt-2 whitespace-pre-line">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
