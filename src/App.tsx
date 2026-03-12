import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Search, 
  Bell, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Dices,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MEDIA_ITEMS, CARDS } from './constants';
import { MediaItem, Card, Rarity } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'movie' | 'song' | 'anime'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [completedAnime, setCompletedAnime] = useState<string[]>([]);
  const [collectedCards, setCollectedCards] = useState<Card[]>([]);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonCard, setWonCard] = useState<Card | null>(null);
  const [showCollection, setShowCollection] = useState(false);

  // Filter media based on category
  const filteredMedia = activeCategory === 'all' 
    ? MEDIA_ITEMS 
    : MEDIA_ITEMS.filter(item => item.type === activeCategory);

  const animeItems = MEDIA_ITEMS.filter(item => item.type === 'anime');
  const movieItems = MEDIA_ITEMS.filter(item => item.type === 'movie');
  const songItems = MEDIA_ITEMS.filter(item => item.type === 'song');

  const handleCompleteAnime = (id: string) => {
    if (!completedAnime.includes(id)) {
      setCompletedAnime([...completedAnime, id]);
      setShowSpinModal(true);
      setSelectedMedia(null);
    }
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setWonCard(null);

    // Simulate spin delay
    setTimeout(() => {
      const rand = Math.random() * 100;
      let card: Card;

      if (rand < 5) { // 5% Legendary
        const legendary = CARDS.filter(c => c.rarity === 'Legendary');
        card = legendary[Math.floor(Math.random() * legendary.length)];
      } else if (rand < 15) { // 10% Epic
        const epic = CARDS.filter(c => c.rarity === 'Epic');
        card = epic[Math.floor(Math.random() * epic.length)];
      } else { // 85% Normal
        const normal = CARDS.filter(c => c.rarity === 'Normal');
        card = normal[Math.floor(Math.random() * normal.length)];
      }

      setWonCard(card);
      setCollectedCards(prev => [...prev, card]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white selection:bg-netflix-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent transition-all duration-500">
        <div className="flex items-center gap-8">
          <h1 className="text-netflix-red font-display text-3xl font-extrabold tracking-tighter uppercase">
            CineSpin
          </h1>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <button onClick={() => setActiveCategory('all')} className={`hover:text-white transition ${activeCategory === 'all' ? 'text-white font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveCategory('movie')} className={`hover:text-white transition ${activeCategory === 'movie' ? 'text-white font-bold' : ''}`}>Movies</button>
            <button onClick={() => setActiveCategory('song')} className={`hover:text-white transition ${activeCategory === 'song' ? 'text-white font-bold' : ''}`}>Music</button>
            <button onClick={() => setActiveCategory('anime')} className={`hover:text-white transition ${activeCategory === 'anime' ? 'text-white font-bold' : ''}`}>Anime</button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
          <div className="relative cursor-pointer" onClick={() => setShowCollection(true)}>
            <Trophy className="w-5 h-5 hover:text-gray-400 transition" />
            {collectedCards.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-netflix-red text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {collectedCards.length}
              </span>
            )}
          </div>
          <User className="w-6 h-6 p-1 bg-gray-700 rounded cursor-pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-netflix-black to-transparent" />
        </div>

        <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-netflix-red p-0.5 rounded-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Trending Now</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
            LEGEND OF THE <br /> <span className="text-netflix-red">CYBER SAMURAI</span>
          </h2>
          <p className="text-lg text-gray-300 line-clamp-3">
            In a world where technology and tradition collide, one ronin must reclaim his honor and save the neon-lit streets of Neo-Tokyo from an ancient evil.
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition">
              <Play className="w-5 h-5 fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/70 transition backdrop-blur-md">
              <Info className="w-5 h-5" /> More Info
            </button>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <main className="relative z-10 -mt-20 pb-20 space-y-12">
        <MediaRow title="Anime Collection" items={animeItems} onSelect={setSelectedMedia} />
        <MediaRow title="Blockbuster Movies" items={movieItems} onSelect={setSelectedMedia} />
        <MediaRow title="Global Music" items={songItems} onSelect={setSelectedMedia} />
      </main>

      {/* Media Detail Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-netflix-dark rounded-xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/80 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full relative">
                <img 
                  src={selectedMedia.thumbnail} 
                  alt={selectedMedia.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark to-transparent" />
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-display font-bold">{selectedMedia.title}</h3>
                  <div className="flex items-center gap-4">
                    <button className="p-3 border border-gray-600 rounded-full hover:border-white transition">
                      <Plus className="w-6 h-6" />
                    </button>
                    <button className="p-3 border border-gray-600 rounded-full hover:border-white transition">
                      <Play className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-semibold text-gray-400">
                  <span className="text-green-500">98% Match</span>
                  <span>{selectedMedia.year}</span>
                  <span className="border border-gray-600 px-1.5 py-0.5 rounded text-[10px]">HD</span>
                  <span>{selectedMedia.language}</span>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {selectedMedia.description}
                </p>

                {selectedMedia.type === 'anime' && (
                  <div className="pt-6 border-t border-gray-800">
                    <button 
                      onClick={() => handleCompleteAnime(selectedMedia.id)}
                      disabled={completedAnime.includes(selectedMedia.id)}
                      className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition ${
                        completedAnime.includes(selectedMedia.id)
                        ? 'bg-green-600 cursor-default'
                        : 'bg-netflix-red hover:bg-red-700'
                      }`}
                    >
                      {completedAnime.includes(selectedMedia.id) ? (
                        <><Check className="w-6 h-6" /> Completed</>
                      ) : (
                        <><Play className="w-6 h-6 fill-current" /> Finish Watching to Spin</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spin Modal */}
      <AnimatePresence>
        {showSpinModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-md text-center space-y-8"
            >
              {!wonCard ? (
                <>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">
                      Anime <span className="text-netflix-red">Completed!</span>
                    </h2>
                    <p className="text-gray-400">You've earned a chance to win a rare card!</p>
                  </div>

                  <div className="relative aspect-square flex items-center justify-center">
                    <motion.div 
                      animate={isSpinning ? { rotate: 360 * 5 } : { rotate: 0 }}
                      transition={isSpinning ? { duration: 3, ease: "easeInOut" } : {}}
                      className="w-64 h-64 rounded-full border-8 border-netflix-red border-dashed flex items-center justify-center"
                    >
                      <Dices className="w-24 h-24 text-netflix-red" />
                    </motion.div>
                    
                    {isSpinning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-2xl font-black text-white drop-shadow-lg"
                        >
                          SPINNING...
                        </motion.div>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="w-full py-4 bg-netflix-red rounded-xl font-black text-xl uppercase tracking-widest hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Spin Now
                  </button>
                </>
              ) : (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-3xl font-display font-bold">CONGRATULATIONS!</h2>
                    <p className="text-gray-400">You won a {wonCard.rarity} card!</p>
                  </div>

                  <div className={`relative w-64 h-96 mx-auto rounded-2xl p-1 shadow-2xl ${
                    wonCard.rarity === 'Legendary' ? 'card-gradient-legendary' :
                    wonCard.rarity === 'Epic' ? 'card-gradient-epic' : 'card-gradient-normal'
                  }`}>
                    <div className="w-full h-full bg-netflix-dark rounded-[14px] overflow-hidden flex flex-col">
                      <img 
                        src={wonCard.image} 
                        alt={wonCard.name} 
                        className="h-2/3 w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            wonCard.rarity === 'Legendary' ? 'bg-yellow-500 text-black' :
                            wonCard.rarity === 'Epic' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                          }`}>
                            {wonCard.rarity}
                          </span>
                          <h4 className="text-xl font-bold mt-2">{wonCard.name}</h4>
                        </div>
                        <p className="text-xs text-gray-400 italic">"{wonCard.description}"</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setShowSpinModal(false);
                      setWonCard(null);
                    }}
                    className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition"
                  >
                    Collect & Continue
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collection Modal */}
      <AnimatePresence>
        {showCollection && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-netflix-black/95 backdrop-blur-md">
            <div className="w-full h-full max-w-6xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Your <span className="text-netflix-red">Collection</span></h2>
                </div>
                <button 
                  onClick={() => setShowCollection(false)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                {collectedCards.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <Dices className="w-20 h-20" />
                    <p className="text-xl font-medium">No cards collected yet. Complete anime to earn spins!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {collectedCards.map((card, idx) => (
                      <motion.div 
                        key={`${card.id}-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`relative aspect-[2/3] rounded-xl p-0.5 shadow-lg ${
                          card.rarity === 'Legendary' ? 'card-gradient-legendary' :
                          card.rarity === 'Epic' ? 'card-gradient-epic' : 'card-gradient-normal'
                        }`}
                      >
                        <div className="w-full h-full bg-netflix-dark rounded-[10px] overflow-hidden flex flex-col">
                          <img 
                            src={card.image} 
                            alt={card.name} 
                            className="h-3/5 w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                              <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                card.rarity === 'Legendary' ? 'bg-yellow-500 text-black' :
                                card.rarity === 'Epic' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                              }`}>
                                {card.rarity}
                              </span>
                              <h4 className="text-sm font-bold mt-1 truncate">{card.name}</h4>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MediaRow({ title, items, onSelect }: { title: string, items: MediaItem[], onSelect: (item: MediaItem) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 px-4 md:px-12 group">
      <h3 className="text-xl md:text-2xl font-bold text-gray-200">{title}</h3>
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {items.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              onClick={() => onSelect(item)}
              className="flex-none w-64 md:w-80 aspect-video rounded-md overflow-hidden cursor-pointer bg-gray-800 shadow-lg"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="font-bold text-sm md:text-base truncate">{item.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                  <span className="text-green-500 font-bold">98% Match</span>
                  <span>{item.genre}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
