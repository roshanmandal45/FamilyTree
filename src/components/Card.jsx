import { motion } from "framer-motion";

export default function Card({ person, onClick, onDetails }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/20 shadow-lg"
    >
      <img
        src={person.img}
        className="w-24 h-24 rounded-full border-4 border-blue-400 glow"
      />
      <h3 className="text-white text-sm font-semibold text-center">{person.name}</h3>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onClick(person)}
          className="text-xs px-2 py-1 bg-blue-500 rounded-lg"
        >
          Explore
        </button>
        <button
          onClick={() => onDetails(person)}
          className="text-xs px-2 py-1 bg-gray-700 rounded-lg"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}