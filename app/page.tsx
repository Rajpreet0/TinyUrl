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
    <div className="w-full p-2 min-h-screen">
      <div className="w-full flex items-center mt-4 p-2 justify-center"> 
        <Image src={Logo} alt="Logo" width={200} height={100}/>
      </div>

      <div className="w-full p-2 mt-12 h-[50vh] flex flex-col  items-center justify-center">
        <div className="flex gap-4 items-center">
         <Input 
            type="text" 
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)} 
            className="w-[350px] drop-shadow-2xl h-[40px] bg-white"/>
         <Button  
          disabled={loading}
          onClick={handleShorten}
          className="cursor-pointer">{loading ? "Loading..." : "Shorten"}</Button>
        </div>
       
       {shortUrl &&  (
          <div className="pt-12 w-[500px]">
            <TinyUrlCardComponent
              siteUrl={`http://localhost:3000/t/${shortUrl}`}/>
          </div>
        )}

      </div>
    </div>
  );
}
