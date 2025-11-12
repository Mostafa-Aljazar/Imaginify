"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Image_Uploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setImageUrl(data.url);
      } else {
        console.error("Background removal failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleFileChange}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {file && (
        <div style={{ width: 100, height: 100, position: "relative" }}>
          <Image
            src={URL.createObjectURL(file)}
            alt="Processed"
            width={100}
            height={100}
            className="rounded object-cover"
          />
        </div>
      )}

      {imageUrl && (
        <div>
          <h3>Image with Background Removed:</h3>
          <Image src={imageUrl} alt="Processed" width={100} height={100} />
        </div>
      )}
    </div>
  );
}
