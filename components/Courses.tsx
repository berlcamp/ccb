export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Bachelor of Science in Criminology",
      description:
        "Prepare for a career in law enforcement, criminal justice, and forensic science.",
    },
    {
      id: 2,
      title: "Bachelor of Science in Information Science",
      description:
        "Learn the latest in data management, information systems, and technology.",
    },
    {
      id: 3,
      title: "Bachelor of Science in Tourism Management",
      description:
        "Develop skills in hospitality, travel management, and customer service.",
    },
    {
      id: 4,
      title: "Bachelor of Science in Physical Education",
      description: "Focus on sports science, coaching, and fitness management.",
    },
  ];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-8 max-w-4xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold mb-2 text-black">
              {course.title}
            </h3>
            <p className="text-black">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
