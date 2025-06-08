import { getPlantById } from "@/app/actions/plant.action";
import React from "react";
import PlantCard from "./PlantCard";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const [id] = (await params).slug.split("--");
  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Title",
    description: plant ? plant.description : "Plant Details",
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await stackServerApp.getUser();
  const [id] = (await params).slug.split("--");
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
};

export default Page;
