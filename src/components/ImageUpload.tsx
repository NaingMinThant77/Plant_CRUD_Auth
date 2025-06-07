import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "postImage";
}
const ImageUpload = ({ endpoint, onChange, value }: ImageUploadProps) => {
  if (value) {
    return (
      <div className="relative size-40">
        <Image
          src={value}
          alt="Upload"
          width={160}
          height={160}
          className="rounded-md w-full h-full object-cover"
        />
        <Button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
        >
          <XIcon />
        </Button>
      </div>
    );
  }
  return (
    <div className="w-100 flex items-center">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");

          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
