import bjjclass from "../../assets/bjjclass.jpg"
import mmaclass from "../../assets/mmaclass.jpg"
import mma2 from "../../assets/mma2.jpg"
import kavanagh from "../../assets/kavanagh.jpg"
import thomas from "../../assets/thomas.jpg"


export default function AboutUs() {
  
  return (
    <>
      <section className="bg-cover bg-center">
        <img src={bjjclass} alt="bjj class" />
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
          <img src={mmaclass} alt="" className="w-[800px]" />
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
          <img src={mma2} alt="" className="w-[400px]" />
        </div>
      </section>
      <section className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Meet the Team</h2>
        <hr className="border-t-2 border-black mx-auto w-4/5 my-6" />
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          <div className="card max-w-xs flex-1">
            {" "}
            <img
              src={kavanagh}
              alt="Coach Kavanagh"
              className="rounded-full w-32 h-32 mx-auto mt-4 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Coach Kavanagh</h3>
              <p className="text-md">
                Head Instructor and founder, specializing in No-Gi Grappling.
              </p>
            </div>
          </div>
          <div className="card max-w-xs flex-1">
            <img
              src={thomas}
              alt="Coach Thomas"
              className="rounded-full w-32 h-32 mx-auto mt-4 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Coach Thomas</h3>
              <p className="text-md">Instructor, specializing in MMA.</p>
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
