// components/News.js
export default function News() {
  const news = [
    {
      id: 1,
      title: "New Academic Program Launch",
      date: "2024-08-30",
      excerpt:
        "We are excited to announce the launch of our new Bachelor of Science in Data Science program starting this fall semester.",
    },
    {
      id: 2,
      title: "Annual Science Fair Highlights",
      date: "2024-08-25",
      excerpt:
        "Our annual science fair showcased incredible student projects and innovations. Congratulations to all participants!",
    },
    {
      id: 3,
      title: "Upcoming Faculty Research Symposium",
      date: "2024-08-15",
      excerpt:
        "Join us for the faculty research symposium where our professors will present their latest research and findings.",
    },
  ];

  return (
    <section className="py-10 bg-[#f0f2f5]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 mb-2">{item.date}</p>
              <p className="text-gray-700">{item.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
