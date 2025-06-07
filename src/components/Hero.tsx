import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-green-50">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          <Badge className="bg-green-200 text-green-900 rounded-full py-1 border-none">
            New Arrivals 🌿
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight text-green-800">
            Discover Beautiful & Healthy Plants for Your Space
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg text-green-700">
            From herbs to shrubs, explore our curated collection of indoor and
            outdoor plants. Bring life and freshness into your home or garden.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button
              size="lg"
              className="rounded-full text-base bg-green-600 hover:bg-green-700 text-white"
            >
              Shop Now <ArrowUpRight className="!h-5 !w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base text-green-700 border-green-300 hover:bg-green-100"
            >
              <CirclePlay className="!h-5 !w-5 mr-2" /> Watch Garden Tour
            </Button>
          </div>
        </div>
        <div className="w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen bg-[url('/bellis.jpg')] bg-cover bg-center rounded-xl lg:rounded-none" />
      </div>
    </div>
  );
};

export default Hero;
