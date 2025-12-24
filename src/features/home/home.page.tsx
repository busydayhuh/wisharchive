import { About } from "./ui/About";
import { CallToAction } from "./ui/CallToAction";
import { Hero } from "./ui/Hero";
import { RunningString } from "./ui/RunningString";

function Homepage() {
  return (
    <div className="space-y-12 md:space-y-20 xl:space-y-24 border-1 border-gray-700 w-full">
      <Hero />
      <RunningString />
      <About />
      <CallToAction text="Присоединиться" />
    </div>
  );
}

export const Component = Homepage;
