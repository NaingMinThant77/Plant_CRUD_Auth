import { getPlantById } from "@/app/actions/plant.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type Plant = Awaited<ReturnType<typeof getPlantById>>;

type PlantCardProps = {
  plant: Plant;
};

const PlantCard = ({ plant }: PlantCardProps) => {
  if (!plant) {
    return <div className="text-destructive">Plant data is not available</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-none">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Image section */}
        <div className="w-full md:w-2/5 flex justify-center items-start">
          {plant.imageUrl?.startsWith("http") ||
          plant.imageUrl?.startsWith("/") ? (
            <div className="rounded-lg overflow-hidden w-full max-w-sm">
              <Image
                src={plant.imageUrl}
                alt={plant.name}
                width={300}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="w-[300px] h-[300px] bg-muted flex items-center justify-center rounded-lg">
              <span className="text-xs text-muted-foreground">
                No image available
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <CardContent className="space-y-4">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
              {plant.name}
            </CardTitle>
            <h2 className="text-lg sm:text-xl font-semibold text-primary">
              Price: ${plant.price}
            </h2>
            <Badge>{plant.category}</Badge>
            <CardDescription className="text-muted-foreground whitespace-pre-wrap">
              {plant.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default PlantCard;
