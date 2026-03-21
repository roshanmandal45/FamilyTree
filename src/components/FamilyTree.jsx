// 🌟 मण्डल परिवार सदस्यहरू
// Path: src/components/FamilyTree.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🧬 डाटा संरचना
const data = {
  grandparents: [
    {
      id: 1,
      name: "रतिलाल मण्डल",
      img: "https://i.pravatar.cc/150?img=1",
      details: "परिवारका मुखिया",
      spouse: { id: 2, name: "वीना देवी मण्डल", img: "https://i.pravatar.cc/150?img=2", details: "परिवारकी मातृशक्ति" },
      children: [
        {
          id: 3,
          name: "वीरेन्द्र मण्डल",
          img: "https://i.pravatar.cc/150?img=3",
          details: "जेठा छोरा",
          spouse: { id: 4, name: "सीता देवी मण्डल", img: "https://i.pravatar.cc/150?img=8", details: "गृहिणी" },
          children: [
            { id: 7, name: "रोशन कुमार मण्डल", img: "https://i.pravatar.cc/150?img=10", details: "कान्छो छोरा" },
            { id: 8, name: "भूमिका कुमारी मण्डल", img: "https://i.pravatar.cc/150?img=11", details: "छोरी" },
          ],
        },
        {
          id: 5,
          name: "धीरेन्द्र मण्डल",
          img: "https://i.pravatar.cc/150?img=4",
          details: "माइला छोरा",
          spouse: { id: 6, name: "नवीन देवी मण्डल", img: "https://i.pravatar.cc/150?img=12", details: "शिक्षिका" },
          children: [
            { id: 9, name: "राजु मण्डल", img: "https://i.pravatar.cc/150?img=13", details: "जेठा छोरा" },
            { id: 10, name: "नितेश कुमार मण्डल", img: "https://i.pravatar.cc/150?img=14", details: "माइला छोरा" },
            { id: 11, name: "नीतु मण्डल", img: "https://i.pravatar.cc/150?img=15", details: "छोरी" },
          ],
        },
        {
          id: 12,
          name: "उषा मण्डल",
          img: "https://i.pravatar.cc/150?img=5",
          details: "छोरी",
          spouse: { id: 13, name: "भोजदेव मण्डल", img: "https://i.pravatar.cc/150?img=16", details: "इन्जिनियर" },
          children: [
            { id: 14, name: "रोशन कुमार मण्डल", img: "https://i.pravatar.cc/150?img=17", details: "जेठा छोरा" },
            { id: 15, name: "प्रीति मण्डल", img: "https://i.pravatar.cc/150?img=18", details: "छोरी" },
            { id: 16, name: "ज्योति मण्डल", img: "https://i.pravatar.cc/150?img=19", details: "कान्छी छोरी" },
          ],
        },
      ],
    },
  ],
};

// IDs that should have the family button
const familyButtonIds = [1, 3, 5, 12];

// 👤 कार्ड कम्पोनेन्ट
const Card = ({ person, onClick, onDetails }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl flex flex-col items-center gap-2 border border-white/20"
  >
    <img src={person.img} className="w-20 h-20 rounded-full border-2 border-blue-400" alt={person.name} />
    <h3 className="text-white text-sm font-semibold text-center">{person.name}</h3>
    <div className="flex gap-2 mt-2">
      {familyButtonIds.includes(person.id) ? (
        <button onClick={() => onClick(person)} className="text-xs px-2 py-1 bg-blue-500 rounded-lg">परिवार</button>
      ) : (
        <button onClick={() => onClick(person)} className="text-xs px-2 py-1 bg-blue-500 rounded-lg">हेर्नुहोस्</button>
      )}
      <button onClick={() => onDetails(person)} className="text-xs px-2 py-1 bg-gray-700 rounded-lg">विवरण</button>
    </div>
  </motion.div>
);

// 👴 GRANDPARENT कार्ड (बढाइएको)
const GrandparentCard = ({ person, onClick, onDetails }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-2 border-amber-400/50 w-full max-w-md mx-auto"
  >
    <img src={person.img} className="w-32 h-32 rounded-full border-4 border-amber-400 shadow-xl" alt={person.name} />
    <h3 className="text-white text-2xl font-bold text-center">{person.name}</h3>
    <p className="text-amber-300 text-sm">{person.details}</p>
    <div className="flex gap-3 mt-3">
      {familyButtonIds.includes(person.id) ? (
        <button onClick={() => onClick(person)} className="px-4 py-2 bg-blue-500 rounded-xl text-sm font-medium hover:bg-blue-600 transition">परिवार</button>
      ) : (
        <button onClick={() => onClick(person)} className="px-4 py-2 bg-blue-500 rounded-xl text-sm font-medium hover:bg-blue-600 transition">हेर्नुहोस्</button>
      )}
      <button onClick={() => onDetails(person)} className="px-4 py-2 bg-gray-700 rounded-xl text-sm font-medium hover:bg-gray-600 transition">विवरण</button>
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

  const isGrandparentView = !current && history.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent mb-3 tracking-wide">
        मण्डल परिवार सदस्यहरू
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-2xl">
        <span className="text-amber-400">✦</span> हाम्रो परिवारको गौरवमय इतिहास <span className="text-blue-400">✦</span>
      </p>

      {current && history.length > 0 && (
        <button onClick={goBack} className="mb-6 px-5 py-2 bg-white/10 text-white rounded-xl backdrop-blur hover:bg-white/20 transition">
          ⬅ फर्कनुहोस्
        </button>
      )}

      {/* परिवार प्रदर्शन */}
      <div className="w-full max-w-6xl">
        {isGrandparentView ? (
          // Grandparent in center with larger size
          <div className="flex justify-center items-center">
            <GrandparentCard 
              person={data.grandparents[0]} 
              onClick={handleExplore} 
              onDetails={setDetail}
            />
          </div>
        ) : (
          // Children grid view
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            <AnimatePresence>
              {(current ? current.children.concat(current.spouse ? [current.spouse] : []) : data.grandparents).map((person) => (
                <motion.div key={person.id} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}>
                  <Card 
                    person={person} 
                    onClick={handleExplore} 
                    onDetails={setDetail}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* विवरण मोडल */}
      {detail && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl text-white max-w-sm w-full">
            <img src={detail.img} className="w-24 h-24 rounded-full mx-auto" alt={detail.name} />
            <h2 className="text-xl text-center mt-3">{detail.name}</h2>
            <p className="text-sm text-gray-400 mt-2 text-center">{detail.details}</p>
            <button onClick={() => setDetail(null)} className="mt-4 w-full py-2 bg-blue-500 rounded-lg">
              बन्द गर्नुहोस्
            </button>
          </div>
        </div>
      )}

      {/* फुटर */}
      <footer className="mt-12 w-full bg-gray-900/90 text-white p-6 flex flex-col md:flex-row items-center justify-between rounded-t-3xl">
        <div className="text-center md:text-left">
          <p className="mb-1">© २०८१ - मण्डल परिवार</p>
          <p className="text-sm text-gray-400">रोशन कुमार मण्डलद्वारा निर्मित</p>
        </div>
        <div className="text-center md:text-center mt-4 md:mt-0">
          <p className="text-sm text-gray-300">ठेगाना:</p>
          <p className="text-sm font-medium text-amber-300">इनरुवा - १०, सुनसरी, नेपाल</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">लिङ्क्डइन</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">गिटहब</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">फेसबुक</a>
        </div>
      </footer>
    </div>
  );
}