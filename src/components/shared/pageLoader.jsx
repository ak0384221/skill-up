import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
export default function PageLoader() {
  return (
    <>
      <div className="fixed inset-0 z-1000 flex items-center justify-center ">
        <Trefoil
          size="80"
          stroke="2"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1"
          color="white"
        />
      </div>
    </>
  );
}

// Default values shown
