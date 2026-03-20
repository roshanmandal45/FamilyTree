// App.js
import React, { useState, useEffect } from 'react';
import FamilyTree from './components/FamilyTree';
import Footer from './components/Footer';
import FloatingContent from './components/FloatingContent';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [slideDirection, setSlideDirection] = useState('right');
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Family data structure
  const familyData = {
    home: {
      type: 'home',
      title: 'Family Tree',
      members: [
        {
          id: 'A',
          name: 'John Smith',
          role: 'Grandfather',
          image: 'https://via.placeholder.com/150',
          bio: 'Family patriarch',
          spouse: 'B',
          children: ['C', 'D', 'E']
        },
        {
          id: 'B',
          name: 'Jane Smith',
          role: 'Grandmother',
          image: 'https://via.placeholder.com/150',
          bio: 'Family matriarch',
          spouse: 'A',
          children: ['C', 'D', 'E']
        }
      ]
    },
    C: {
      id: 'C',
      name: 'Michael Smith',
      role: 'Son',
      image: 'https://via.placeholder.com/150',
      spouse: {
        name: 'Sarah Smith',
        image: 'https://via.placeholder.com/150'
      },
      children: [
        { id: 'C1', name: 'Emma Smith', age: 8, image: 'https://via.placeholder.com/150' },
        { id: 'C2', name: 'James Smith', age: 5, image: 'https://via.placeholder.com/150' }
      ],
      bio: 'Loves painting and outdoor activities',
      siblings: ['D', 'E']
    },
    D: {
      id: 'D',
      name: 'David Smith',
      role: 'Son',
      image: 'https://via.placeholder.com/150',
      spouse: {
        name: 'Lisa Smith',
        image: 'https://via.placeholder.com/150'
      },
      children: [
        { id: 'D1', name: 'Oliver Smith', age: 10, image: 'https://via.placeholder.com/150' },
        { id: 'D2', name: 'Sophia Smith', age: 7, image: 'https://via.placeholder.com/150' },
        { id: 'D3', name: 'Mason Smith', age: 3, image: 'https://via.placeholder.com/150' }
      ],
      bio: 'Enjoys photography and traveling',
      siblings: ['C', 'E']
    },
    E: {
      id: 'E',
      name: 'Emily Johnson',
      role: 'Daughter',
      image: 'https://via.placeholder.com/150',
      spouse: {
        name: 'Robert Johnson',
        image: 'https://via.placeholder.com/150'
      },
      children: [
        { id: 'E1', name: 'Ava Johnson', age: 9, image: 'https://via.placeholder.com/150' },
        { id: 'E2', name: 'William Johnson', age: 6, image: 'https://via.placeholder.com/150' },
        { id: 'E3', name: 'Isabella Johnson', age: 2, image: 'https://via.placeholder.com/150' }
      ],
      bio: 'Professional chef and food blogger',
      siblings: ['C', 'D']
    }
  };

  // Add child data for grandchildren
  const grandChildren = ['C1', 'C2', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3'];
  grandChildren.forEach(id => {
    const parent = Object.values(familyData).find(p => 
      p.children?.some(c => c.id === id)
    );
    if (parent) {
      const childData = parent.children.find(c => c.id === id);
      familyData[id] = {
        ...childData,
        role: 'Grandchild',
        parents: [parent.id, parent.spouse?.name],
        bio: `${childData.name} loves playing and learning new things.`,
        siblings: parent.children.filter(c => c.id !== id).map(c => c.id)
      };
    }
  });

  const handlePersonClick = (personId) => {
    setSlideDirection('left');
    setCurrentPage(personId);
    setSelectedPerson(personId);
  };

  const handleBack = () => {
    setSlideDirection('right');
    if (selectedPerson && familyData[selectedPerson]?.parents) {
      // Go back to parent
      const parentId = familyData[selectedPerson].parents[0];
      setCurrentPage(parentId);
      setSelectedPerson(parentId);
    } else {
      // Go back to home
      setCurrentPage('home');
      setSelectedPerson(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 bg-amber-500">
        <PageTransition slideDirection={slideDirection}>
          {currentPage === 'home' ? (
            <HomePage 
              familyData={familyData.home} 
              onPersonClick={handlePersonClick}
            />
          ) : (
            <PersonPage 
              personData={familyData[currentPage]}
              onBack={handleBack}
              onPersonClick={handlePersonClick}
              familyData={familyData}
            />
          )}
        </PageTransition>
        
        <FloatingContent />
        <Footer />
      </div>
    </div>
  );
}

// Page Transition Component
const PageTransition = ({ children, slideDirection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [children]);

  const slideClasses = {
    left: 'translate-x-0 opacity-100',
    right: 'translate-x-0 opacity-100',
  };

  return (
    <div
      className={`transform transition-all duration-500 ease-in-out ${
        isVisible ? slideClasses[slideDirection] : 'translate-x-full opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

// Home Page Component
const HomePage = ({ familyData, onPersonClick }) => {
  return (
    <div className="min-h-screen py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 animate-pulse">
        Our Family Tree
      </h1>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        {familyData.members.map((member) => (
          <div
            key={member.id}
            onClick={() => onPersonClick(member.id)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-2"
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-400 shadow-2xl hover:border-pink-400 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold whitespace-nowrap shadow-lg">
                {member.name}
              </div>
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-white text-lg md:text-xl italic">
          "Click on a portrait to explore our family tree"
        </p>
      </div>
    </div>
  );
};

// Person Page Component
const PersonPage = ({ personData, onBack, onPersonClick, familyData }) => {
  return (
    <div className="min-h-screen py-8 relative">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative group">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl">
              <img
                src={personData.image}
                alt={personData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              {personData.role}
            </div>
          </div>

          <div className="text-center md:text-left text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{personData.name}</h2>
            <p className="text-lg opacity-90 mb-4">{personData.bio}</p>
            {personData.spouse && (
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <span className="text-pink-300">💕</span>
                <span>Spouse: {typeof personData.spouse === 'object' ? personData.spouse.name : personData.spouse}</span>
              </div>
            )}
          </div>
        </div>

        {personData.spouse && personData.spouse.image && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Partner</h3>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 shadow-xl">
                  <img
                    src={personData.spouse.image}
                    alt={personData.spouse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-center mt-2 font-semibold">{personData.spouse.name}</p>
              </div>
            </div>
          </div>
        )}

        {personData.children && personData.children.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Children</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {personData.children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => onPersonClick(child.id)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white bg-opacity-5 rounded-2xl p-4 backdrop-blur-sm hover:bg-opacity-10 transition-all">
                    <div className="relative">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-pink-400 mb-3">
                        <img
                          src={child.image}
                          alt={child.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-white font-semibold text-center">{child.name}</h4>
                      {child.age && (
                        <p className="text-gray-300 text-sm text-center">Age: {child.age}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Content Component
const FloatingContent = () => {
  const images = [
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/120',
    'https://via.placeholder.com/80',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/90',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${index * 2}s`,
            animationDuration: `${15 + index * 5}s`,
            opacity: 0.1,
          }}
        >
          <img
            src={img}
            alt=""
            className="w-16 h-16 md:w-24 md:h-24 rounded-full opacity-50"
          />
        </div>
      ))}
      
      <div className="absolute top-20 right-10 animate-spin-slow pointer-events-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <span className="text-sm font-semibold">✨ Family Memories</span>
        </div>
      </div>
      
      <div className="absolute bottom-40 left-10 animate-bounce-slow pointer-events-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-xl">
          <p className="text-xs">❤️ 5 Generations</p>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative z-10 mt-16 bg-black bg-opacity-30 backdrop-blur-lg rounded-t-3xl text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
              Family Tree
            </h3>
            <p className="text-sm opacity-80">
              Preserving our family history and memories for generations to come.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:opacity-100 transition-opacity cursor-pointer">About Our Family</li>
              <li className="hover:opacity-100 transition-opacity cursor-pointer">Family Gallery</li>
              <li className="hover:opacity-100 transition-opacity cursor-pointer">Upcoming Events</li>
              <li className="hover:opacity-100 transition-opacity cursor-pointer">Family Recipes</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <span className="text-xl">📸</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <span className="text-xl">💬</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <span className="text-xl">📧</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center text-sm opacity-60">
          <p>&copy; 2024 Family Tree. All memories preserved with love.</p>
        </div>
      </div>
    </footer>
  );
};

export default App;