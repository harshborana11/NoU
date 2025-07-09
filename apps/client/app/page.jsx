import Navbar from "@/components/Navbar";

export default function Home() {
  return (<>
    <Navbar />
    <div className="flex justify-center h-[80vh] gap-5 items-center">
      <span className="Logo text-9xl">NoU</span>
      <p className="text-2xl">NoU – Not Uno is a game inspired by UNO, <br /> built with Next.js and Express.js. <br />
        It's free, open-source, and available on GitHub <br /> feel free to check it out and use it if you'd like.</p>
    </div>

  </>);
}
