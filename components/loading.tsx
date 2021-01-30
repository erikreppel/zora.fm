import { motion } from "framer-motion";

export const Loading = () => (
  <motion.div
    animate={{
      scale: [1, 1, 1, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
  >
    🎵🌞🎵
  </motion.div>
);
