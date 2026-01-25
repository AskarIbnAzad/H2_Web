import React from "react";

const LearnMoreH2 = ({ articles }) => {
  return (
    <div  className="">
      <h2  className="text-2xl font-bold text-gray-800 mb-6">Learn more about H2</h2>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article, index) => (
          <div
            key={index}
             className=" overflow-hidden"
          >
            {/* Image */}
            <div  className="h-48 bg-gray-200">
              <img
                src={article.image}
                alt={article.title}
                 className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div  className=" mt-3">
              <p  className="text-sm text-center items-center justify-center py-3 px-1 rounded-full w-3/5 mb-2" style={{
                backgroundColor:"rgba(52, 104, 150, 0.27)"
              }}>
                {article.date}. Author
              </p>
              <h3  className="text-xl font-semibold text-[#346896] hover:underline cursor-pointer">
                {article.title}
              </h3>
              <a
                href={article.link}
                 className="text-sm text-[#346896] mt-4 inline-block hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMoreH2;
