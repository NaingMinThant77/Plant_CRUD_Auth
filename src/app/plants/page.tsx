import React from "react";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import InventoryTable from "@/components/InventoryTable";

const page = async () => {
  const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <SignUp />
        </div>
      )}
    </>
  );
};

export default page;
