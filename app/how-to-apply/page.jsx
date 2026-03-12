"use client";
import React, { useState, useMemo } from "react";
import Footer from "@/components/Footer";
import Sectiontwo from "@/components/Home/Sectiontwo";
import Sectionfive from "@/components/Home/Sectionfive";
import Image from "next/image";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { laptop, ipad, smartphogeometry, taponeimage, taptwoimage, tapthreeimage } from "@/assets";
import { useEffect } from "react";

// --- MANUAL VIDEO LIST ---
// If you don't have a YouTube API Key, simply add your video details here.
// To get the 'youtubeId', copy the code after 'v=' in the YouTube URL.
// Example: https://www.youtube.com/watch?v=u_A3V4X_O_4 -> ID is u_A3V4X_O_4
const INITIAL_VIDEOS = [
  {
    id: "v1",
    title: 'How to Apply Orange iPhone Skin',
    model: 'iPhone 15 Pro Max',
    category: "iphone",
    youtubeId: "u_A3V4X_O_4", 
    thumbnail: smartphogeometry,
  },
  {
    id: "v2",
    title: 'MacBook Air M1 Skin Installation',
    model: 'MacBox Air (2020)',
    category: "laptop",
    youtubeId: "vB0S1gTz8vY",
    thumbnail: laptop,
  },
  {
    id: "v3",
    title: 'iPad Pro 11" M2 Skin Application',
    model: 'iPad Pro 11 (4th Gen)',
    category: "ipad",
    youtubeId: "vB0S1gTz8vY",
    thumbnail: ipad,
  },
  {
    id: "v4",
    title: 'MacBook Pro 14" Full Body Wrap',
    model: 'MacBook Pro 14 (2021)',
    category: "laptop",
    youtubeId: "vB0S1gTz8vY",
    thumbnail: laptop,
  }
];

// --- DYNAMIC FETCHING (OPTIONAL) ---
// If you want videos to update automatically, provide the API Key from your client's Google Cloud account.
const YOUTUBE_API_KEY = ""; 
const CHANNEL_ID = "UC_articwoodtech"; 

const HowToApply = () => {
  const [activeTab, setActiveTab] = useState("laptop");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [loading, setLoading] = useState(false);

  // Note: True dynamic fetching from YouTube requires an API Key
  // Below is the logic prepared for when the API Key is provided.
  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      if (!YOUTUBE_API_KEY) return;
      
      setLoading(true);
      try {
        // Fetch last 15 videos from the channel
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15&type=video`
        );
        const data = await response.json();
        
        if (data.items) {
          const fetchedVideos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            model: "Original Tutorial",
            category: item.snippet.title.toLowerCase().includes("iphone") ? "iphone" : 
                      item.snippet.title.toLowerCase().includes("ipad") ? "ipad" : "laptop",
            youtubeId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url
          }));
          setVideos(fetchedVideos);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesTab = video.category === activeTab;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            video.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, videos]);

  const tabs = [
    { id: "laptop", label: "Mac", icon: taponeimage },
    { id: "ipad", label: "iPad", icon: taptwoimage },
    { id: "iphone", label: "iPhone", icon: tapthreeimage },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Header Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-[#1D1D1F] font-semibold md:text-[48px] text-[32px] mb-8">
          How to Apply Skins
        </h1>

        {/* Tabs */}
        <div className="flex justify-center items-end gap-12 mb-10 border-b border-gray-200 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 pb-4 transition-all relative ${
                activeTab === tab.id ? "text-black scale-105" : "text-gray-400 grayscale hover:grayscale-0"
              }`}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image 
                  src={tab.icon} 
                  alt={tab.label} 
                  fill 
                  className="object-contain" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48';
                  }}
                />
              </div>
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0071E3]" />
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative px-4">
          <div className="relative flex items-center">
            <AiOutlineSearch className="absolute left-8 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Enter your device name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] rounded-lg border-none focus:ring-2 focus:ring-[#0071E3] transition-all text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071E3]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="aspect-square relative bg-[#F5F5F7] flex items-center justify-center overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Tutorial';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="w-16 h-16 bg-[#0071E3]/90 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                       </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#1D1D1F] font-semibold text-base line-clamp-2 leading-tight">{video.title}</h3>
                    <p className="text-gray-400 text-xs mt-2 uppercase tracking-wider font-bold">{video.model}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-[#F5F5F7] rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No tutorial videos found for &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Banner Section */}
      <Sectiontwo />

      {/* Features Section */}
      <Sectionfive />

      {/* Video Modal Overlay */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white backdrop-blur-sm"
            >
              <AiOutlineClose size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={selectedVideo.title}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setSelectedVideo(null)}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HowToApply;
