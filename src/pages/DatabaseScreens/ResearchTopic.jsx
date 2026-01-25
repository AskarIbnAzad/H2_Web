// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Card,
//   Typography,
//   Input,
//   Space,
//   Button,
//   Spin,
//   Empty,
//   Row,
//   Col,
//   Statistic,
//   Divider,
// } from "antd";
// import {
//   SearchOutlined,
//   DatabaseOutlined,
//   SortAscendingOutlined,
//   SortDescendingOutlined,
//   ReloadOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { apiHandle } from "../../config/apiHandle/apiHandle";
// import GoBackButton from "../../components/GoBackButton/GoBackButton";
// import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
// import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";

// const { Title, Text } = Typography;

// const ResearchTopic = () => {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 0,
//   });

//   const themeColor = "#214a78";
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTopics();
//   }, []);

//   const fetchTopics = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await apiHandle.get(
//         // "https://h2research.org/backend/public/api/get-research-topic"
//         "https://h2research.org/backend/public/api/get-public-data-explorer/topic"
//       );
//       if (data?.status) {
//         const loaded = data?.research_topic?.map((t) => ({ ...t, key: t.id }));
//         setTopics(loaded);
//         setPagination((p) => ({ ...p, total: loaded?.length }));
//       } else {
//         setError("No research topics available");
//       }
//     } catch (err) {
//       setError("Failed to fetch research topics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setPagination((p) => ({ ...p, current: 1 }));
//   };

//   const toggleSortDirection = () => {
//     setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
//   };

//   const filtered = topics
//     .filter((t) => t.name.toLowerCase().includes(searchTerm))
//     .sort((a, b) =>
//       sortDirection === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );

//   const handleTableChange = (pg) => {
//     setPagination(pg);
//   };

//   const handleTopicClick = (name) => {
//     navigate(`/articles?researchTopic=${encodeURIComponent(name)}`);
//   };

//   const columns = [
//     {
//       title: (
//         <Space>
//           <Text strong>Topic</Text>
//           <Button
//             type="text"
//             icon={
//               sortDirection === "asc" ? (
//                 <SortAscendingOutlined />
//               ) : (
//                 <SortDescendingOutlined />
//               )
//             }
//             onClick={toggleSortDirection}
//             size="small"
//           />
//         </Space>
//       ),
//       dataIndex: "name",
//       key: "name",
//       render: (name) => (
//         <Text
//           strong
//           style={{ color: themeColor, cursor: "pointer" }}
//           onClick={() => handleTopicClick(name)}
//         >
//           {name}
//         </Text>
//       ),
//     },
//     {
//       title: "Added Date",
//       dataIndex: "created_at",
//       key: "created_at",
//       render: (date) =>
//         new Date(date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         }),
//     },
//     {
//       title: "Last Updated",
//       dataIndex: "updated_at",
//       key: "updated_at",
//       render: (date) =>
//         new Date(date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         }),
//     },
//   ];

//   return (
//     <div  className="max-w-[1200px] mx-auto p-4 md:p-8">
//       {/* Stats */}
//       <Row gutter={16}  className="mb-6 items-center justify-between">
//         <Col>
//           <GoBackButton />
//         </Col>
//         <Col xs={24} sm={8}>
//           <Card bordered={false}>
//             <Statistic
//               title="Total Topics"
//               value={topics?.length}
//               prefix={<DatabaseOutlined />}
//               valueStyle={{ color: themeColor }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Card
//         bordered={false}
//          className="shadow-md rounded-lg"
//         title={
//           <div  className="flex flex-col md:flex-row md:justify-between md:items-center">
//             <Title level={4} style={{ color: themeColor, margin: 0 }}>
//               <DatabaseOutlined /> Research Topics
//             </Title>
//             <Text type="secondary">
//               Showing {filtered?.length} of {topics?.length}
//             </Text>
//           </div>
//         }
//         extra={
//           <div  className="flex items-center gap-3 ml-3">
//             <Button icon={<ReloadOutlined />} onClick={fetchTopics}>
//               Refresh
//             </Button>
//             <FeedbackButton />
//           </div>
//         }
//       >
//         {/* Search */}
//         <div  className="mb-6">
//           <Input
//             placeholder="Search topics..."
//             prefix={<SearchOutlined style={{ color: themeColor }} />}
//             onChange={handleSearch}
//             allowClear
//             size="large"
//           />
//         </div>

//         {error && (
//           <Divider>
//             <Text type="danger">{error}</Text>
//           </Divider>
//         )}

//         <Spin spinning={loading} tip="Loading topics...">
//           <Table
//             columns={columns}
//             dataSource={filtered}
//             pagination={{
//               ...pagination,
//               showSizeChanger: true,
//               pageSizeOptions: ["10", "20", "50", "100"],
//               showTotal: (total, range) =>
//                 `${range[0]}-${range[1]} of ${total} topics`,
//               position: ["bottomCenter"],
//             }}
//             onChange={handleTableChange}
//             bordered
//             scroll={{ x: "max-content" }}
//             locale={{
//               emptyText: (
//                 <Empty
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                   description="No topics match your search"
//                 />
//               ),
//             }}
//             rowClassName={(r, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
//           />
//         </Spin>
//       </Card>

//         <ExploreDataButton />
//     </div>
//   );
// };

// export default ResearchTopic;

import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Typography,
  Input,
  Space,
  Button,
  Spin,
  Empty,
  Row,
  Col,
  Statistic,
  Divider,
} from "antd";
import {
  SearchOutlined,
  ExperimentOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";

const { Title, Text } = Typography;

const ResearchTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [humanOnly, setHumanOnly] = useState(false);
  const [topTopic, setTopTopic] = useState(null);

  const themeColor = "#214a78";

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post(
        "https://api.h2research.org/api/get-public-data-explorer/researchTopics"
      );
      if (data?.status) {
        const loaded = data?.data?.items?.map((t) => ({ ...t, key: t.id }));
        setTopics(loaded);
        setFilteredTopics(loaded);
        setPagination((p) => ({ ...p, total: loaded?.length }));
        // find most researched
        const top = loaded?.reduce((a, b) =>
          a.article_count > b.article_count ? a : b
        );
        setTopTopic(top);
      } else {
        setError("No topics available");
      }
    } catch (e) {
      console.error("Error fetching topics:", e);
      // setError("Failed to fetch topics");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const toggleSort = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const toggleHuman = () => {
    setHumanOnly((h) => {
      const next = !h;
      setFilteredTopics(
        next ? topics.filter((t) => t.human_study_occurrences > 0) : topics
      );
      return next;
    });
  };

  const filtered = filteredTopics?.filter((t) => t.name.toLowerCase().includes(searchTerm))
    .sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const onTableChange = (pg) => setPagination(pg);

  const goToTopic = (name) =>
    navigate(`/articles?researchTopics=${encodeURIComponent(name)}`);

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Topic</Text>
          <Button
            type="text"
            icon={
              sortDirection === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={toggleSort}
            size="small"
          />
        </Space>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text
          strong
          style={{ color: themeColor, cursor: "pointer" }}
          onClick={() => goToTopic(text)}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Total # of Studies",
      dataIndex: "article_count",
      key: "article_count",
      sorter: (a, b) => a.article_count - b.article_count,
      render: (num) => (
        <Text strong style={{ color: themeColor }}>
          {num}
        </Text>
      ),
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Top Stats & Tile */}
      <Row className="mb-6" gutter={16} justify="space-between" align="middle">
        <Col>
          <GoBackButton />
        </Col>
        <Col>
          {topTopic && (
            <Card bordered={false}>
              <Statistic
                title="Most Researched Topic"
                value={topTopic?.name}
                suffix={`(${topTopic?.article_count})`}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: themeColor, fontSize: "16px" }}
              />
            </Card>
          )}
        </Col>
      </Row>

      <Card
        bordered={false}
        className="shadow-md rounded-lg pt-4"
        title={
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 pb-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Title level={4} style={{ color: themeColor, margin: 0 }}>
                <ExperimentOutlined /> Research Topics
              </Title>
              <Text type="secondary">
                Showing {filtered?.length} of {topics?.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchTopics}
                  className="w-full h-[30px]"
                  style={{ height: "30px" }}
                >
                  Refresh
                </Button>
              </div>
              <div className="w-full sm:w-1/2 flex items-center whitespace-nowrap overflow-visible min-w-[180px]">
                <FeedbackButton
                  style={{ width: "100%", height: "30px", minWidth: "140px" }}
                />
              </div>
            </div>
          </div>
        }
        extra={null}
      >
        {/* Search + Toggle */}
        <div className="mb-6 flex flex-col md:flex-row gap-20 items-center">
          <Input
            className="flex-1"
            placeholder="Search topics..."
            prefix={<SearchOutlined style={{ color: themeColor }} />}
            onChange={handleSearch}
            allowClear
            size="large"
          />
          <Button
            type="primary"
            onClick={toggleHuman}
            style={{
              backgroundColor: themeColor,
              borderColor: themeColor,
              height: "40px",
              fontWeight: 600,
            }}
          >
            {humanOnly ? "Show All" : "Human Studies"}
          </Button>
        </div>

        {error && (
          <Divider>
            <Text type="danger">{error}</Text>
          </Divider>
        )}

        <Spin spinning={loading} tip="Loading topics...">
          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} topics`,
              position: ["bottomCenter"],
            }}
            onChange={onTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No topics match your search"
                />
              ),
            }}
            rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
          />
        </Spin>
        {/* Contribute CTA */}
       <ContributeStudyCTA className="mt-6" />
      </Card>

      <div className="mt-8 text-center">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: themeColor,
            borderColor: themeColor,
            height: "50px",
            fontSize: "16px",
            fontWeight: "600",
          }}
          onClick={() => navigate("/species")}
        >
          Explore the Data by Species
        </Button>
      </div>
    </div>
  );
};

export default ResearchTopics;
