import { iconButton } from "@material-tailwind/react";
import React from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const TrendingArticles = ({ articles, loading }) => {
  const navigate = useNavigate();

  console.log(articles);
  //articles length
  console.log(articles?.length);

  return (
    <div className="py-5">
      <h2 className="text-[#132B38] text-3xl my-5 font-extrabold">
        Trending Articles{" "}
      </h2>
      {loading && (
        <div className="flex justify-center my-6">
          <Oval
            height={50}
            width={50}
            secondaryColor="#346896"
            color="#346896"
            visible={true}
          />
        </div>
      )}
      {articles?.length > 0 &&
        articles?.slice(0, 3).map((e, i) => {
          return (
            <div key={i} className="border-b border-[#B0B0B0]  pb-4 mb-4">
              <h4
                onClick={() => navigate(`/ArticleDetails/${e?.mhid}`)}
                className="text-primary mb-3  text-2xl cursor-pointer"
              >
                {e?.publicData?.title?.name}
              </h4>
              <div className=" flex gap-4 ">
                <div className="text-[#7A7A7A] font-semibold">
                  {e?.mhid || "N/A"}
                </div>
                {e?.publicData?.pmid?.name && (
                  <div className="text-[#7A7A7A] font-semibold">
                    PMID: {e?.publicData?.pmid?.name || "N/A"}
                  </div>
                )}
              </div>
              <div>
                {e?.publicData?.authors?.length > 0 && (
                  <p className="text-sm text-gray-700 w-3/6 mt-0.5 mb-0.5 mt-1">
                    {e?.publicData?.authors?.map((author, i) => (
                      <span key={i}>
                        {author?.name}
                        {i < e?.publicData?.authors?.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          );
        })}

      <div className="flex justify-center my-4">
        <button
          onClick={() => navigate("/articles")}
          className="outline-none border-none rounded-full text-white bg-primary font-extrabold mb-14 flex justify-center items-center px-5 py-2"
        >
          See More Articles
        </button>
      </div>
    </div>
  );
};

export default TrendingArticles;
