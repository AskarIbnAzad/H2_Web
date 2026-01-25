import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaChevronDown } from "react-icons/fa";

import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Year", "Authors", "Title", "Abstract"];

export function ArticlesTable({ articles, loading }) {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      <Card  className="h-full w-full">
        {/* Table for larger screens */}
        <table  className="hidden w-full min-w-max table-auto text-left lg:table">
          <thead>
            <tr  className="bg-[#132B38]">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                   className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-white"
                >
                  <Typography
                    variant="small"
                    color="white"
                     className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <div  className="flex justify-center my-6">
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
              articles.map((e, index) => {
                const isLast = index === articles.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td  className={`${classes} w-10`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                         className="font-normal"
                      >
                        {e?.publicData?.year}
                      </Typography>
                    </td>
                    <td  className={`${classes} bg-blue-gray-50/50 w-40 border`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                         className="font-normal"
                      >
                        {e?.publicData?.authors}
                      </Typography>
                    </td>
                    <td  className={`${classes} w-96`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                         className="font-normal"
                      >
                        {e?.publicData?.title}
                      </Typography>
                    </td>
                    <td  className={`${classes} w-96`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                         className="font-normal"
                      >
                        {e?.publicData?.abstract?.slice(0, 100)}...
                      </Typography>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Accordion for smaller screens */}
        <div  className="block lg:hidden">
          {articles?.length > 0 &&
            articles.map((e, index) => (
              <div
                key={index}
                 className="mb-4 border border-blue-gray-100 rounded-lg"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                   className="flex w-full items-center justify-between p-4 bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                     className="font-medium"
                  >
                    {e?.publicData?.title} - {e?.publicData?.year}
                  </Typography>
                  <FaChevronDown
                     className={`h-5 w-5 transition-transform ${
                      openAccordion === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                   className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === index
                      ? "max-h-screen p-4 bg-white"
                      : "max-h-0"
                  }`}
                >
                  <Typography variant="small" color="blue-gray">
                    <strong>Authors:</strong> {e?.publicData?.Authors}
                  </Typography>
                  <Typography variant="small" color="blue-gray">
                    <strong>Abstract:</strong>{" "}
                    {e?.publicData?.abstract?.slice(0, 100)}...
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </Card>

      <div  className="flex justify-center my-4">
        <button
          onClick={() => navigate("/articles")}
           className="outline-none border-none rounded-full text-white bg-primary font-extrabold mb-14 flex justify-center items-center px-5 py-2"
        >
          Read More
        </button>
      </div>
    </>
  );
}
