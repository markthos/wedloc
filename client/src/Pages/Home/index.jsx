// The Home Page
// TODO: Make this shit look good and fancy with animations and pictures/videos


export default function Home() {
    return (
      <>
        <section className="flex min-h-screen flex-col justify-center bg-beige">
          <div className="p-5">
            <h2 className="text-4xl md:text-8xl">Your Memories...</h2>
          </div>
        </section>

        <section className="flex min-h-screen flex-col justify-center bg-lightgray">
          <div className="p-5">
            <h2 className="text-right text-4xl md:text-8xl">...Your Journey</h2>
          </div>
        </section>

        <section className="flex min-h-screen flex-col justify-center">
          <div className="p-5">
            <h2 className="text-center text-4xl md:text-8xl">
              Beautifully Preserved
            </h2>
          </div>
        </section>
      </>
    );
}