import React from "react";

export default function Title() {
  return (
    <div className="absolute z-10 w-full">
      <div className="pt-2 font-bold text-[50px] text-center">
        Welcome to the 3DLibrary!
      </div>
      <div className="text-center text-[12px]">
        Add a book to get started! (It may take some time...)
      </div>
      <h4 className="fixed z-20 bottom-4 right-8">Drag to Inspect! -</h4>
    </div>
  );
}
