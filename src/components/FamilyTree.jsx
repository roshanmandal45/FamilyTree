// 🌟 FAMILY TREE HERO PAGE WITH GRANDPARENTS, SPOUSES, CHILDREN, AND FOOTER
// Path: src/components/FamilyTree.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// 🧬 DATA STRUCTURE
const data = {
  grandparents: [
    {
      id: 1,
      name: "Grandfather A",
      img: "https://i.pravatar.cc/150?img=1",
      details: "Head of the family",
      spouse: { id: 2, name: "Grandmother B", img: "https://i.pravatar.cc/150?img=2", details: "Matriarch" },
      children: [
        {
          id: 3,
          name: "C",
          img: "https://i.pravatar.cc/150?img=3",
          details: "Eldest Son",
          spouse: { id: 4, name: "Wife C", img: "https://i.pravatar.cc/150?img=8", details: "Homemaker" },
          children: [
            { id: 7, name: "C Child1", img: "https://i.pravatar.cc/150?img=10", details: "Baby" },
            { id: 8, name: "C Child2", img: "https://i.pravatar.cc/150?img=11", details: "Baby" },
          ],
        },
        {
          id: 5,
          name: "D",
          img: "https://i.pravatar.cc/150?img=4",
          details: "Second Son",
          spouse: { id: 6, name: "Wife D", img: "https://i.pravatar.cc/150?img=12", details: "Teacher" },
          children: [
            { id: 9, name: "D Child1", img: "https://i.pravatar.cc/150?img=13", details: "Baby" },
            { id: 10, name: "D Child2", img: "https://i.pravatar.cc/150?img=14", details: "Baby" },
            { id: 11, name: "D Child3", img: "https://i.pravatar.cc/150?img=15", details: "Baby" },
          ],
        },
        {
          id: 12,
          name: "E",
          img: "https://i.pravatar.cc/150?img=5",
          details: "Daughter",
          spouse: { id: 13, name: "Husband E", img: "https://i.pravatar.cc/150?img=16", details: "Engineer" },
          children: [
            { id: 14, name: "E Child1", img: "https://i.pravatar.cc/150?img=17", details: "Baby" },
            { id: 15, name: "E Child2", img: "https://i.pravatar.cc/150?img=18", details: "Baby" },
            { id: 16, name: "E Child3", img: "https://i.pravatar.cc/150?img=19", details: "Baby" },
          ],
        },
      ],
    },
  ],
};

// 👤 CARD COMPONENT
const Card = ({ person, onClick, onDetails }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex flex-col items-center gap-2 border border-white/20"
  >
    <img src={person.img} className="w-20 h-20 rounded-full border-2 border-blue-400" />
    <h3 className="text-white text-sm font-semibold text-center">{person.name}</h3>
    <div className="flex gap-2 mt-2">
      <button onClick={() => onClick(person)} className="text-xs px-2 py-1 bg-blue-500 rounded-lg">Explore</button>
      <button onClick={() => onDetails(person)} className="text-xs px-2 py-1 bg-gray-700 rounded-lg">View Details</button>
    </div>
  </motion.div>
);

export default function FamilyTree() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [detail, setDetail] = useState(null);

  const handleExplore = (person) => {
    if (person.children && person.children.length > 0) {
      setHistory([...history, current]);
      setCurrent(person);
    }
  };

  const goBack = () => {
    const prev = history[history.length - 1] || null;
    setHistory(history.slice(0, -1));
    setCurrent(prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center p-6">

      <h1 className="text-3xl font-bold text-white mb-4 tracking-wide">Family Hero Page</h1>
      <p className="text-gray-400 mb-6 text-center max-w-xl">Explore the family tree, watch videos, and see more about Roshan.</p>

      {current && history.length > 0 && (
        <button onClick={goBack} className="mb-4 px-4 py-2 bg-white/10 text-white rounded-xl backdrop-blur">⬅ Back</button>
      )}

      {/* FAMILY DISPLAY */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <AnimatePresence>
          {(current ? current.children.concat(current.spouse ? [current.spouse] : []) : data.grandparents).map((person) => (
            <motion.div key={person.id} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}>
              <Card person={person} onClick={handleExplore} onDetails={setDetail} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DETAILS MODAL */}
      {detail && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-2xl text-white max-w-sm w-full">
            <img src={detail.img} className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-xl text-center mt-3">{detail.name}</h2>
            <p className="text-sm text-gray-400 mt-2 text-center">{detail.details}</p>
            <button onClick={() => setDetail(null)} className="mt-4 w-full py-2 bg-blue-500 rounded-lg">Close</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-12 w-full bg-gray-900/90 text-white p-6 flex flex-col md:flex-row items-center justify-between rounded-t-3xl">
        <div className="text-center md:text-left">
          <p>Created by Roshan</p>
          
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://linkedin.com" target="_blank" className="text-blue-500">LinkedIn</a>
          <a href="https://github.com" target="_blank" className="text-gray-400">GitHub</a>
          <a href="https://facebook.com" target="_blank" className="text-blue-700">Facebook</a>
        </div>
      </footer>
    </div>
  );
}