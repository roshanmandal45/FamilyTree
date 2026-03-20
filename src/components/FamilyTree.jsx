// 📁 FULL ADVANCED FAMILY TREE (React + Tailwind + Zoom + Relations)
// Place this file at: src/components/FamilyTree.jsx

import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// 🧬 DATA STRUCTURE (you can expand this or fetch from backend)
const people = {
  1: {
    id: 1,
    name: "Grandfather",
    img: "https://i.pravatar.cc/150?img=1",
    parents: [],
    spouse: 2,
    children: [3, 4],
    siblings: [],
  },
  2: {
    id: 2,
    name: "Grandmother",
    img: "https://i.pravatar.cc/150?img=8",
    parents: [],
    spouse: 1,
    children: [3, 4],
    siblings: [],
  },
  3: {
    id: 3,
    name: "Father",
    img: "https://i.pravatar.cc/150?img=2",
    parents: [1, 2],
    spouse: 5,
    children: [6, 7],
    siblings: [4],
  },
  4: {
    id: 4,
    name: "Uncle",
    img: "https://i.pravatar.cc/150?img=5",
    parents: [1, 2],
    spouse: null,
    children: [8],
    siblings: [3],
  },
  5: {
    id: 5,
    name: "Mother",
    img: "https://i.pravatar.cc/150?img=9",
    parents: [],
    spouse: 3,
    children: [6, 7],
    siblings: [],
  },
  6: {
    id: 6,
    name: "You",
    img: "https://i.pravatar.cc/150?img=3",
    parents: [3, 5],
    spouse: null,
    children: [],
    siblings: [7],
  },
  7: {
    id: 7,
    name: "Sibling",
    img: "https://i.pravatar.cc/150?img=4",
    parents: [3, 5],
    spouse: null,
    children: [],
    siblings: [6],
  },
  8: {
    id: 8,
    name: "Cousin",
    img: "https://i.pravatar.cc/150?img=6",
    parents: [4],
    spouse: null,
    children: [],
    siblings: [],
  },
};

// 👤 PERSON CARD
const Person = ({ person, onClick }) => (
  <div
    onClick={() => onClick(person.id)}
    className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
  >
    <img
      src={person.img}
      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-400"
    />
    <p className="text-xs md:text-sm mt-1">{person.name}</p>
  </div>
);

// 🔗 LINE COMPONENT
const Line = () => (
  <div className="w-0.5 h-6 bg-white mx-auto"></div>
);

export default function FamilyTree() {
  const [selected, setSelected] = useState(6);

  const person = people[selected];

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {/* 🔍 ZOOM + PAN */}
      <TransformWrapper>
        <TransformComponent>
          <div className="flex flex-col items-center p-6 min-w-[600px]">

            {/* 👴 PARENTS */}
            <div className="flex gap-6">
              {person.parents.map((id) => (
                <Person key={id} person={people[id]} onClick={setSelected} />
              ))}
            </div>

            {person.parents.length > 0 && <Line />}

            {/* 👤 CURRENT + SPOUSE */}
            <div className="flex items-center gap-6">
              <Person person={person} onClick={setSelected} />
              {person.spouse && (
                <Person
                  person={people[person.spouse]}
                  onClick={setSelected}
                />
              )}
            </div>

            <Line />

            {/* 👶 CHILDREN */}
            <div className="flex gap-6 mt-2">
              {person.children.map((id) => (
                <Person key={id} person={people[id]} onClick={setSelected} />
              ))}
            </div>

            {/* 👥 SIBLINGS */}
            {person.siblings.length > 0 && (
              <>
                <h3 className="mt-6 text-sm text-gray-400">Siblings</h3>
                <div className="flex gap-4">
                  {person.siblings.map((id) => (
                    <Person
                      key={id}
                      person={people[id]}
                      onClick={setSelected}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* 📄 DETAIL PANEL */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
        <h2 className="text-lg font-bold">{person.name}</h2>
        <p className="text-sm text-gray-400">Click any member to explore</p>
      </div>
    </div>
  );
}

