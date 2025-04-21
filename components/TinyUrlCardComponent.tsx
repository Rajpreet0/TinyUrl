"use client";
import React, { useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from './ui/card';
import { CopyIcon } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from "sonner"


interface TinyUrlCardComponentProps {
    siteUrl: string;
};

const TinyUrlCardComponent: React.FC<TinyUrlCardComponentProps> = ({siteUrl}) => {

    const qrRef = useRef<HTMLCanvasElement>(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(siteUrl);
        toast("Copied to Clipboard");
      };

    const donwloadQR = () => {
        const canvas = qrRef.current;
        if (!canvas) return;
    
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
    
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
    }

  return (
    <div className="w-full h-full px-2">
      <Card className="border-green-400 shadow-green-300 drop-shadow-lg drop-shadow-green-200">
        <CardHeader>
          <CardTitle className="text-center sm:text-left">Your TinyUrl</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Please copy the URL below — it may not be saved.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4">
            <p className="p-4 border rounded-lg text-gray-500 break-all text-center sm:text-left">
              {siteUrl}
            </p>
            <CopyIcon
              onClick={copyToClipboard}
              className="text-gray-500 cursor-pointer hover:text-green-500 transition-all"
              size={20}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div
            onClick={donwloadQR}
            className="w-full flex items-center justify-center cursor-pointer"
          >
            <QRCodeCanvas
              value={siteUrl}
              size={128}
              ref={qrRef}
              className="hover:scale-105 transition-transform"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TinyUrlCardComponent
