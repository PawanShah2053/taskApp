"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropDown";

export function ProfilePopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Profile Dropdown */}
          <ProfileDropdown isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  );
}
