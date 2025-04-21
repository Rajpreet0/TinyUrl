"use client";
import Image from "next/image";
import Logo from '@/public/logo.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TinyUrlCardComponent from "@/components/TinyUrlCardComponent";
import { useState } from "react";
import { toast } from "sonner";


export default function Home() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleShorten = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: "POST",
        body: JSON.stringify({url}),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (data?.tinyUrl) {
        setShortUrl(data.tinyUrl);
      }

      toast("Tiny Url created.")
    } catch (err) {
      console.error("Fehler beim Kürzen: ", err);
      toast("Tiny Url Creation Failed.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-2 min-h-screen flex flex-col items-center">
      <div className="flex justify-center mt-4">
        <Image src={Logo} alt="Logo" width={200} height={100} />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow mt-12 w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-[500px]">
          <Input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-10 bg-white drop-shadow-2xl"
          />
          <Button
            disabled={loading}
            onClick={handleShorten}
            className="w-full sm:w-auto h-10"
          >
            {loading ? "Loading..." : "Shorten"}
          </Button>
        </div>

        {shortUrl && (
          <div className="pt-12 w-full max-w-[500px]">
            <TinyUrlCardComponent
              siteUrl={`https://tiny-url-mu.vercel.app/t/${shortUrl}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
