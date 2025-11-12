"use client";
import { useUserStore } from "@/stores/store-user-data";
import { Clock, Coins } from "lucide-react";

export default function Profile_Card() {
  const { user } = useUserStore();

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
      <div className="bg-gradient-to-r from-primary/5 to-transparent shadow hover:shadow-lg p-6 border rounded-xl transition-all">
        <h2 className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
          <Coins className="w-5 h-5 text-primary" />
          Credits Available
        </h2>
        <p className="font-bold text-gray-800 text-4xl">
          {user?.creditsAvailable}
        </p>
      </div>

      <div className="bg-gradient-to-r from-secondary/10 to-transparent shadow hover:shadow-lg p-6 border rounded-xl transition-all">
        <h2 className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
          <Clock className="w-5 h-5 text-secondary" />
          Image Manipulations Done
        </h2>
        <p className="font-bold text-gray-800 text-4xl">
          {user?.imageManipulationsDone}
        </p>
      </div>
    </div>
  );
}
