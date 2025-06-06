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

export async function getPlantById(id: string) {
  return await prisma.plant.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.PlantCreateInput) {
  console.log("creating plant");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newPlant = await prisma.plant.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant:", error);
    throw error;
  }
}

// export async function editPlant(
//   id: string, //identify which plant we are editing
//   data: Prisma.PlantsUpdateInput
// ) {
//   try {
//     const currentUserId = await getUserId();
//     const updatedPlant = await prisma.plants.update({
//       where: { id },
//       data: {
//         ...data,
//         userId: currentUserId,
//       },
//     });
//     revalidatePath("/plants");
//   } catch (error) {
//     console.error("Error updating plant:", error);
//     throw error;
//   }
// }

// export async function deletePlant(
//   id: string //identify which plant we are editing
// ) {
//   try {
//     const currentUserId = await getUserId();
//     if (!currentUserId) return;

//     const deletedPlant = await prisma.plants.delete({
//       where: { id },
//     });
//     revalidatePath("/plants");
//     return deletedPlant;
//   } catch (error) {
//     console.error("Error deleting plant:", error);
//     throw error;
//   }
// }
