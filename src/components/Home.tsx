import React from "react";

interface Class {
  day: string;
  time: string;
  title: string;
}

type GroupedClasses = {
  [key: string]: Class[];
};

export default function Home() {
  const classes: Class[] = [
    { day: "Monday", time: "6:00 AM - 7:30 AM", title: "Morning MMA" },
    { day: "Monday", time: "6:00 PM - 7:30 PM", title: "Evening Boxing" },
    { day: "Tuesday", time: "10:00 AM - 11:30 AM", title: "No-Gi Grappling" },
    {
      day: "Wednesday",
      time: "12:00 PM - 1:30 PM",
      title: "Muay Thai Techniques",
    },
    {
      day: "Thursday",
      time: "2:00 PM - 3:30 PM",
      title: "Judo Fundamentals",
    },
    {
      day: "Friday",
      time: "4:00 PM - 5:30 PM",
      title: "Wrestling for Combat",
    },
    {
      day: "Saturday",
      time: "6:00 PM - 7:30 PM",
      title: "Gi Jiu Jitsu Training",
    },
    { day: "Sunday", time: "6:00 AM - 7:30 AM", title: "Cardio Kickboxing" },
  ];

  const groupedClasses: GroupedClasses = classes.reduce(
    (acc: GroupedClasses, cls: Class) => {
      if (!acc[cls.day]) {
        acc[cls.day] = [];
      }
      acc[cls.day].push(cls);
      return acc;
    },
    {}
  );

  return (
    <>
      <main className="bg-gradient-to-b from-[#2E1A47] to-white">
        <section className="p-18 md:p-18">
          <img
            className="mx-auto max-w-full h-auto"
            src="./assets/11th-planet-logo.png"
            alt="11th Planet Logo"
          />
        </section>
        <section className="mb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 p-4 md:p-14 text-xl md:text-4xl text-white text-center">
              <span className="font-bold">Our Story</span>
              <p>
                The long-awaited opening of 11th Planet Jiu-Jitsu is finally
                here. We are a leading MMA and Brazilian Jiu-Jitsu gym based in
                London, specialising in Gi BJJ and No Gi Grappling under our
                Head Coach, Coach Kavanagh and the team!
              </p>
            </div>
            <div className="col-span-1">
              <img
                className="max-w-full h-auto"
                src="./assets/jiujitsu.png"
                alt="Jiu Jitsu action"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          <div className="mt-12 bg-[#2E1A47] text-white p-4 md:p-12 shadow-lg">
            <h2 className="text-lg md:text-xl font-bold mb-2">
              CLASS TIMETABLE
            </h2>
            <p>
              We offer a range of classes for all levels including Kids classes.
              See the full timetable or feel free to contact us to book your
              first lesson.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Find Out More
            </a>
          </div>

          <div className=" md:p-12 shadow-lg bg-white text-black p-12 mb-12">
            <h2 className="text-lg md:text-xl font-bold mb-2">KIDS BJJ</h2>
            <p>
              Led by seasoned instructors, our dedicated kids BJJ classes are
              tailored for young learners. We provide personalized one-on-one
              sessions and comprehensive programs for schools.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Learn More
            </a>
          </div>

          <div className="bg-[#2E1A47] text-white p-4 mt-12 md:p-12 shadow-lg">
            <h2 className="text-lg md:text-xl font-bold mb-2">THE TEAM</h2>
            <p>
              Our team comprises skilled and experienced instructors, including
              World, European, and UK champions. Their expertise is a
              cornerstone of our training excellence.
            </p>
            <a
              href="#"
              className="inline-block mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Meet The Team
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center py-8 md:py-12 text-[#2E1A47]">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            WHAT IS BJJ AND MMA?
          </h2>
          <p className="max-w-4xl text-base md:text-xl leading-relaxed text-center">
            Brazilian Jiu Jitsu (BJJ) is a cornerstone of Mixed Martial Arts
            (MMA) that champions grappling and strategic ground combat. Starting
            upright, the objective is a tactical clinch to the mat, where
            precision control and takedown tactics come into play.
            <br />
            <br />
            BJJ is the cerebral aspect of MMA, demanding mastery over holds,
            joint locks, and calculated pressure to outmaneuver opponents. It’s
            a fusion of mental acuity and physical agility, serving as a
            foundation for a versatile MMA fighter.
            <br />
            <br />
            Engaging in BJJ and MMA not only bolsters your physical conditioning
            but also sharpens mental fortitude. It’s a holistic journey that
            enhances your well-being, boosts confidence, and immerses you in a
            fellowship of like-minded enthusiasts, united by the thrill of the
            sport.
          </p>
        </section>

        <section className="p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-3 md:ml-20 mt-12 md:mt-36">
              <img
                className="max-w-full h-auto"
                src="./assets/BJJ-Friends.png"
                alt="BJJ Friends"
              />
            </div>
            <div className="col-span-3 md:col-span-2 text-xl md:text-4xl bg-[#2E1A47] text-white p-6 md:p-12 shadow-lg text-center">
              <span className="font-bold">Timetable</span>
              <div className="text-base md:text-lg space-y-2 mt-4">
                {Object.entries(groupedClasses).map(
                  ([day, dayClasses], index) => (
                    <div key={index} className="mb-4">
                      <p className="font-bold">{day}:</p>
                      <div className="ml-4">
                        {dayClasses.map((cls, classIndex) => (
                          <p key={classIndex}>
                            {cls.time} - {cls.title}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
