"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { PlantConboBox } from "./combo-box";
import { useState } from "react";
import { editPlant, getPlantById } from "@/app/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

type Plant = Awaited<ReturnType<typeof getPlantById>>;

interface EditDialogProp {
  plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProp) {
  const [formData, setFormData] = useState({
    name: plant?.name,
    description: plant?.description ?? "",
    stock: plant?.stock,
    price: plant?.price,
    category: plant?.category ?? "",
    userId: plant?.userId,
    imageUrl: plant?.imageUrl ?? "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatePlant = await editPlant(plant!.id, formData);
      console.log("plant update: ", updatePlant);
      toast.success("Plant updated successfully");
    } catch (error) {
      console.error("error creating plant", error);
      toast.error("Failed to update plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Plant
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update a Plant?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            Fill out the form below to update a Plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="category">Category</Label>
              <PlantConboBox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => handleChange("imageUrl", url ?? "")}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
