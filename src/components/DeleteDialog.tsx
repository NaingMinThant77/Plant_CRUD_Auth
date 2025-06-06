import { deletePlant } from "@/app/actions/plant.action";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OctagonAlert, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteDialogProp {
  plant: { id: string };
}

export default function DeleteDialgo({ plant }: DeleteDialogProp) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const deletedPlant = await deletePlant(plant!.id);
      console.log("plant deleted: ", deletedPlant);
      toast.success("Plant deleted successfully");
    } catch (error) {
      console.error("error deleting plant", error);
      toast.error("Failed to delete plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TrashIcon className="w-5 h-5 text-destructive cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>
            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-7 w-7 text-destructive" />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px] text-center">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter className="mt-2 sm:justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="submit"
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Plant
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
