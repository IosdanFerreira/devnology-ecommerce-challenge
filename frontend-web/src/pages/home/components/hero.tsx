import banner from "@/assets/images/banner-3.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Link to="/">
      <img
        src={banner}
        alt="Banner promocional"
        loading="lazy"
        decoding="async"
        className="w-full h-auto max-h-[80vh] object-cover cursor-pointer"
      />
    </Link>
  );
}
