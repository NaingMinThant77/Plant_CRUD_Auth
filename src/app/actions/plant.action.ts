"use server";
import { Prisma } from "@/generated/prisma";
import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";

export async function getPlants(searchTerm?: string | undefined) {
  try {
    const currentUserId = await getUserId();
    const whereClause: Prisma.PlantWhereInput = { userId: currentUserId };

    if (searchTerm) {
      whereClause.name = { contains: searchTerm, mode: "insensitive" };
    }

    const userPlants = await prisma.plant.findMany({
      where: whereClause,
    });

    return { success: true, userPlants };
  } catch (error) {
    console.error(
      "Error in getPlants",
      error instanceof Error ? error.message : error
    );
    throw new Error("Failed to fetch plants");
  }
}
