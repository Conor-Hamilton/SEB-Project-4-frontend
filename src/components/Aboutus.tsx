import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AboutUs() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/coaches")
      .then((response) => {
        setCoaches(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the coach data:", error);
      });
  }, []);

  return (
    <>
      <section className="bg-cover bg-center">
        <img src="./assets/bjj-class.jpg" alt="bjj class" />
        <div className="text-center text-white p-8">
          <h1>Welcome to 11th Planet Jiu-Jitsu</h1>
          <p>Mastering the Art of Combat, One Move at a Time.</p>
        </div>
      </section>
      <section className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
        <p
          className="text-lg mx-auto leading-relaxed"
          style={{ maxWidth: "800px" }}
        >
          Founded in 2023 by Coach Kavanagh, 11th Planet Jiu-Jitsu has grown
          from a passionate project into one of London’s premier martial arts
          gyms, specializing in Brazilian Jiu-Jitsu and MMA.
        </p>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />

        <div className="flex justify-center items-center">
          <img src="./assets/mma-class.jpg" alt="" className="w-[800px]" />
        </div>
      </section>
      <section className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Philosophy</h2>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
        <p
          className="text-lg mx-auto leading-relaxed"
          style={{ maxWidth: "800px" }}
        >
          At 11th Planet Jiu-Jitsu, we believe in fostering resilience,
          discipline, and respect through the rigorous study and practice of
          martial arts. Our approach combines traditional techniques with modern
          training methods to prepare our members for any challenge.
        </p>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
        <div className="flex justify-center items-center">
          <img src="./assets/mma-2.jpg" alt="" className="w-[400px]" />
        </div>
      </section>
      <section className="p-8 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-6">Meet the Team</h2>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="rounded-full overflow-hidden inline-block border-2 border-gray-300">
              <img
                src="./assets/kavanagh.jpg"
                alt="Coach Kavanagh"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">Coach Kavanagh</h3>
              <p className="text-md">
                Head Instructor and founder, specializing in No-Gi Grappling.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="rounded-full overflow-hidden inline-block border-2 border-gray-300">
              <img
                src="./assets/kavanagh.jpg"
                alt="Coach Kavanagh"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">Coach Kavanagh</h3>
              <p className="text-md">
                Head Instructor and founder, specializing in No-Gi Grappling.
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
      </section>

      <section className="p-8 bg-gray-100 text-center">
        <h2 className="underline text-3xl">What Our Members Say</h2>
        <br />
        <div className="carousel">
          <blockquote>
            "11th Planet is more than a gym—it's a family. The training is
            top-notch and the support from coaches and fellow members is
            unparalleled."
          </blockquote>
          <br />
          <br />
          <blockquote>
            "Joining 11th Planet Jiu-Jitsu has been a life-changing experience
            for me. The attention to detail in every class helps me improve not
            just physically but mentally as well."
          </blockquote>
          <br />
          <br />
          <blockquote>
            "The environment at 11th Planet Jiu-Jitsu is incredibly welcoming.
            It doesn’t matter if you’re a beginner or an advanced practitioner,
            there’s a place for everyone here."
          </blockquote>
          <br />
          <br />
          <blockquote>
            "What I love most about 11th Planet is the quality of the training.
            The instructors are world-class and genuinely care about your
            progress."
          </blockquote>
          <br />
          <br />
          <blockquote>
            "I've been to several martial arts gyms, but none compare to the
            community and expertise found at 11th Planet. It's not just about
            fighting; it's about growing as a person."
          </blockquote>
        </div>
      </section>
    </>
  );
}
