import { TypesManager } from "@/components/TypesManager";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#111]">
      <div className="grid grid-cols-[1fr_5fr] w-full h-full min-h-screen max-w-[1000px]">
        <div className="flex flex-col p-24 border-r-[1px] border-[#333]  h-full">
          types
        </div>
        <div className="flex flex-col h-full p-24">
          <TypesManager />
        </div>
      </div>
    </main>
  );
}
