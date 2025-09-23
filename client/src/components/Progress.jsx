import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const Progress = ({ courses }) => {
  // Function to calculate progress
  const calculateProgress = (course) => {
    let totalTopics = 0;
    let completedTopics = 0;

    course.heading.forEach((heading) => {
      totalTopics += heading.topics.length;
      heading.topics.forEach((topic) => {
        if (topic.completed) {
          completedTopics++;
        }
      });
    });

    return totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Progress</h2>
      <div className="space-y-4">
        {courses.map((course) => {
          const progress = calculateProgress(course);

          return (
            <div key={course.id} className="bg-gray-700 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <span className={`text-sm font-medium ${progress === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {progress.toFixed(0)}% Complete
                </span>
              </div>
              <div className="relative pt-1 mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-600">
                  <div
                    style={{ width: `${progress}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                {course.heading.map((heading) => (
                  <div key={heading.name} className="mt-2">
                    <h4 className="text-md font-semibold text-gray-300">{heading.name}</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {heading.topics.map((topic) => (
                        <li key={topic.title} className="flex items-center text-sm text-gray-400">
                          {topic.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-500 mr-2" />
                          )}
                          <span>{topic.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;