import { useState, useEffect } from "react";
import { 
  Link2, Copy, CheckCircle2, Share2, 
  Download, Printer, ExternalLink, MessageCircle,
  QrCode
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import IG from '../../assets/social icons/instagram.svg';
import FB from '../../assets/social icons/facebook.svg';
import X from '../../assets/social icons/x.svg';

const StoreLink = () => {
  const [vendorData, setVendorData] = useState(null);
  const [storeUrl, setStoreUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sabisell_vendor'));
    if (data && data.storeLink) {
      setVendorData(data);
      
      // Construct the correct URL depending on environment
      const isFreeHost = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('localhost');
      const url = isFreeHost 
        ? `${window.location.origin}/store/${data.storeLink}` 
        : `${window.location.protocol}//${data.storeLink}.${window.location.host.replace('www.', '')}`;
        
      setStoreUrl(url);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Shop at ${vendorData?.storeName || 'my store'}`,
          text: `Check out my products on SabiSell!`,
          url: storeUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Native sharing is not supported on this browser. Please use the copy button!");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("store-qr-code");
    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${vendorData?.storeName?.replace(/\s+/g, '_') || 'Store'}_QRCode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const printQRCode = () => {
    const canvas = document.getElementById("store-qr-code");
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    const windowContent = '<!DOCTYPE html><html><head><title>Print QR Code</title></head><body style="display:flex; justify-content:center; align-items:center; height:100vh; margin:0;"><img src="' + dataUrl + '" style="width:300px; height:300px;"></body></html>';
    const printWin = window.open('', '', 'width=800,height=600');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    // Slight delay to allow image to render before triggering print
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 250);
  };

  // Social Share Links
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out my store on SabiSell! Shop here: ${storeUrl}`)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Shop my latest products here! 🛍️✨`)}&url=${encodeURIComponent(storeUrl)}`;
  const instagramShareUrl = `https://www.instagram.com/?text=${encodeURIComponent(`Check out my store on SabiSell! Shop here: ${storeUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`;

  if (!vendorData) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 w-full relative bg-sabi-surface">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Store Link & QR Code</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Share your store across social media or print your QR code for physical customers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Store Link & Social Sharing */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Link Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#044e3b] mb-6 border border-emerald-100">
                  <Link2 className="w-6 h-6" />
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-2">Your Unique Store Link</h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  This is the permanent web address for your store. Add it to your Instagram bio, WhatsApp status, or marketing materials.
                </p>

                <div className="flex items-center gap-2 p-1.5 bg-gray-50 border border-gray-200 rounded-2xl mb-6">
                  <div className="flex-1 overflow-x-auto hide-scrollbar pl-4">
                    <span className="text-sm font-bold text-gray-700 whitespace-nowrap select-all">
                      {storeUrl}
                    </span>
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shrink-0 shadow-sm ${
                      isCopied 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-[#044e3b] text-white hover:bg-[#033d2e]'
                    }`}
                  >
                    {isCopied ? (
                      <><CheckCircle2 className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Link</>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleNativeShare}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm text-sm"
                  >
                    <Share2 className="w-4 h-4" /> Share via...
                  </button>
                  <a 
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Store
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Quick Share */}
            <div className="bg-white border border-gray-100 rounded-3xl p-3 sm:p-8 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-6">Quick Share to Socials</h3>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-h-20">
                <a 
                  href={whatsappShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 sm:gap-3 p-4  rounded-xl sm:rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors border border-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                  <span className="font-bold text-xs">WhatsApp</span>
                </a>
                <a 
                  href={instagramShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 sm:gap-3 p-4  rounded-xl sm:rounded-2xl bg-[#C13584]/10 hover:bg-[#C13584]/20 text-[#C13584] transition-colors border border-[#C13584]/20"
                >
                  <img src={IG} alt="Instagram" className="w-5 h-5 sm:w-8 sm:h-8"/>
                  <span className="font-bold text-xs">Instagram</span>
                </a>
                <a 
                  href={twitterShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 sm:gap-3 p-4  rounded-xl sm:rounded-2xl bg-[#000000]/20 hover:bg-[#00000]/20 text-black transition-colors border border-[#000000]/20"
                >
                  <img src={X} alt="X" className="w-5 h-5 sm:w-8 sm:h-8"/>
                  <span className="font-bold text-xs">X/Twitter</span>
                </a>
                <a 
                  href={facebookShareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 sm:gap-3 p-4  rounded-xl sm:rounded-2xl bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors border border-[#4267B2]/20"
                >
                  <img src={FB} alt="Facebook" className="w-5 h-5 sm:w-8 sm:h-8"/>
                  <span className="font-bold text-xs">Facebook</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: QR Code */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF9F5] border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center h-full">
              
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 mb-4 border border-gray-200 shadow-sm">
                <QrCode className="w-6 h-6" />
              </div>
              
              <h2 className="text-xl font-serif text-gray-900 mb-2">Store QR Code</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-[250px]">
                Customers can scan this code with their phone camera to instantly visit your store.
              </p>

              {/* The Actual QR Code Rendered on a Canvas */}
              <div className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 mb-8 relative group">
                <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-[2rem] -m-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <QRCodeCanvas 
                  id="store-qr-code"
                  value={storeUrl}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#044e3b"} // SabiSell Primary Color
                  level={"H"}
                  includeMargin={false}
                />
                
                {/* Optional Center Logo for QR code if you want (Uncomment to use) */}
                {/* {vendorData.logoUrl && vendorData.logoUrl !== "null" && (
                   <img 
                     src={vendorData.logoUrl} 
                     alt="Logo" 
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white object-cover"
                   />
                )} */}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto">
                <button 
                  onClick={downloadQRCode}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </button>
                <button 
                  onClick={printQRCode}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreLink;