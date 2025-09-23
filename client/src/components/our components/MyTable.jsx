import React, { useState, useEffect } from "react";
import { FcStart } from "react-icons/fc";

const MyTable = ({ topics, sawTable}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = (link) => {
    setSelectedVideo(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const getEmbedLink = (link) => {
    if (!link) return "";
    const videoId = link.includes("watch?v=")
      ? link.split("watch?v=")[1].split("&")[0]
      : link.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (!Array.isArray(topics)) {
    return <div className="text-white">No topics available.</div>;
  }

  return (
    <div className={`p-5 ${sawTable ? "hidden" : "visible"}`}>
      <div className="overflow-hidden rounded-xl border-[0.5px] border-gray-100 bg-black">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-[0.5px] text-base text-gray-400 border-gray-600 px-4 py-2">
                #
              </th>
              <th className="border-[0.5px] text-base text-gray-400 border-gray-600 px-4 py-2">
                Topic
              </th>
              <th className="border-[0.5px] text-base text-gray-400 border-gray-600 px-4 py-2">
                YouTube
              </th>
            </tr>
          </thead>
          <tbody>
            {topics.map((value, index) => (
              <tr key={index} className="text-sm text-white">
                <td className="border-[0.5px] border-gray-600 px-4 py-2  text-center">
                  {index + 1}
                </td>
                <td className="border-[0.5px] border-gray-600 px-4 py-2 text-left w-[60%]">
                  {value.title}
                </td>
                <td className="border-[0.5px] border-gray-600 px-4 py-2 text-center grid place-items-center">
                  <button
                    onClick={() => openVideoModal(value.youtubeLink)}
                    className="text-blue-500"
                  >
                    <FcStart size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal with Cancel Button */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-4xl relative">
            {/* Close X Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-2xl text-black"
            >
              &times;
            </button>

            {/* YouTube Embed */}
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={getEmbedLink(selectedVideo)}
                title="YouTube video player"
                frameBorder="2"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[40vw] rounded-md"
              />
            </div>

            {/* Cancel Button */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTable;
