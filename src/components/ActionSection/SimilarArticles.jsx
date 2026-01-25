import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import mhidImage from "../../assets/images/mhid.png"
import { useNavigate } from "react-router-dom";

const SimilarArticles = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div  className="">
      {articles?.length > 0 && <>
        <h2  className="text-2xl font-bold text-gray-800 mb-6">Similar articles</h2>
        <ul  className="space-y-4">
          {articles?.map((article, index) => {
            return <li key={index}  className="border-b pb-4 last:border-b-0" >
              <h3 onClick={() => navigate(`/ArticleDetails/${article?.id}`)}  className="text-lg font-semibold text-[#346896] hover:underline cursor-pointer w-3/4">
                {article?.publicData?.title}
              </h3>
              {article?.publicData?.authors?.length > 0 && <p  className="text-sm text-gray-700 w-3/6 mt-0.5 mb-0.5">
                {/* {article?.publicData?.authors}. */}
                {article?.publicData?.authors
                  ? article?.publicData?.authors.map((author, index) => (
                    <span key={index}>
                      {author.name}
                      {index < article?.publicData?.authors.length - 1 && ", "}
                    </span>
                  ))
                  : "N/A"}
              </p>}
              {article?.publicData?.doi && <p  className="text-sm">
                <span  className="text-gray-700">doi: </span>
                <a
                  href={article?.publicData?.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="text-[#346896] hover:underline"
                >
                  {article?.publicData?.doi}
                </a>
              </p>}
              {article?.mhid && <p  className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                <img src={mhidImage} alt="mhid" />
                <span>MHID: {article?.mhid}</span>
              </p>}
            </li>

          })}
        </ul></>}
    </div>
  );
};

export default SimilarArticles;
