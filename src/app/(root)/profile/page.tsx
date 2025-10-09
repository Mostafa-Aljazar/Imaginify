import React from "react";
import { Coins, Clock, History, Image as ImageIcon } from "lucide-react"; // icons

// HEADER
export function Profile_Header() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-primary text-3xl md:text-4xl">Profile</h1>
      <p className="text-muted-foreground text-sm md:text-base">
        Manage your profile and credits
      </p>
    </div>
  );
}

// CARD SECTION
export function Profile_Card() {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
      {/* Credits */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent shadow-md hover:shadow-lg p-6 border rounded-xl transition-all">
        <h2 className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
          <Coins className="w-5 h-5 text-primary" />
          Credits Available
        </h2>
        <p className="font-bold text-gray-800 text-4xl">14</p>
      </div>

      {/* Manipulations */}
      <div className="bg-gradient-to-r from-secondary/10 to-transparent shadow-md hover:shadow-lg p-6 border rounded-xl transition-all">
        <h2 className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
          <Clock className="w-5 h-5 text-secondary" />
          Image Manipulations Done
        </h2>
        <p className="font-bold text-gray-800 text-4xl">6</p>
      </div>
    </div>
  );
}

// RECENT EDITS
export function Profile_Recent_Edits() {
  const recentEdits = [
    {
      id: 1,
      title: "Restored old photo",
      date: "Sep 29, 2025",
      thumb: "https://via.placeholder.com/60x60?text=Img",
    },
    {
      id: 2,
      title: "Removed background",
      date: "Sep 22, 2025",
      thumb: "https://via.placeholder.com/60x60?text=Img",
    },
    {
      id: 3,
      title: "Colorized black & white",
      date: "Sep 15, 2025",
      thumb: "https://via.placeholder.com/60x60?text=Img",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 font-semibold text-primary text-2xl">
        <History className="w-6 h-6 text-primary" />
        Recent Edits
      </h2>

      {recentEdits.length > 0 ? (
        <div className="gap-4 grid">
          {recentEdits.map((edit) => (
            <div
              key={edit.id}
              className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 border rounded-lg transition-all"
            >
              <img
                src={edit.thumb}
                alt={edit.title}
                className="border rounded-md w-14 h-14 object-cover"
              />
              <div className="flex flex-col">
                <p className="font-medium text-gray-800">{edit.title}</p>
                <span className="text-gray-500 text-sm">{edit.date}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 p-6 border-2 border-gray-200 border-dashed rounded-xl min-h-52">
          <p className="text-gray-500">No recent edits yet</p>
        </div>
      )}
    </div>
  );
}

// PAGE
export default function Profile_Page() {
  return (
    <div className="flex flex-col gap-10 mx-auto p-4 md:p-6 max-w-5xl">
      <Profile_Header />
      <Profile_Card />
      <Profile_Recent_Edits />
    </div>
  );
}
