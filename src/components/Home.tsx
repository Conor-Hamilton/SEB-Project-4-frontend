import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { IClasses } from "../interfaces/classes";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [classes, setClasses] = useState<IClasses[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/classes")
      .then((response) => response.json())
      .then((data) => {
        const sortedClasses = data.sort((a: IClasses, b: IClasses) => {
          return (
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
          );
        });
        setClasses(sortedClasses);
      })
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(format(addDays(startOfWeekDate, i), "EEEE"));
  }

  return (
    <>
      <main className="bg-gradient-to-b from-[#2E1A47] to-white">
        <section className="p-18 md:p-18 mb-24">
          <img
            className="mx-auto max-w-full h-auto"
            src="./assets/11th-planet-logo.png"
            alt="11th Planet Logo"
          />
        </section>
        <section className="mb-44">
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

        <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-44">
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
            <Link
              to="/aboutus"
              className="inline-block mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Meet The Team
            </Link>
          </div>
        </section>

        <section className="flex flex-col items-center py-8 md:py-12 text-[#2E1A47] mb-12">
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

        <section className="flex flex-col items-center py-6 md:py-12">
          <h2 className="text-xl md:text-4xl font-bold text-[#2E1A47] underline mb-6">
            Timetable
          </h2>
          <div className="grid grid-cols-2 gap-6 md:gap-12 bg-[#2E1A47] text-white p-6 md:p-12 shadow-lg w-full md:max-w-4xl">
            {days.map((day) => (
              <div key={day} className="col-span-1">
                <h3 className="text-lg md:text-xl font-semibold underline text-center">
                  {day}
                </h3>
                <div className="flex flex-col space-y-1">
                  {classes
                    .filter(
                      (c) => format(new Date(c.start_time), "EEEE") === day
                    )
                    .map((c) => (
                      <div
                        key={c.id}
                        className="p-2 bg-white text-[#2E1A47] rounded shadow"
                      >
                        <p className="font-semibold">{c.title}</p>
                        <p>{`${format(new Date(c.start_time), "p")} - ${format(
                          new Date(c.end_time),
                          "p"
                        )}`}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
