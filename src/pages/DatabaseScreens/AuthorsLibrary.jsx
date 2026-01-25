import React, { useEffect, useState } from "react";
import { Tabs, List, Avatar } from "antd";


import {
  Table,
  Card,
  Typography,
  Input,
  Space,
  Button,
  Spin,
  Row,
  Col,
  Statistic,
  Empty,
} from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";
import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";
import mhidSheild from "../../assets/images/mhid.png";
const { Title, Text } = Typography;

const AuthorsLibrary = () => {
  const [activeTab, setActiveTab] = useState("all");
  // Helper for title case
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [topAuthor, setTopAuthor] = useState(null);
  const [featuredAuthors, setFeaturedAuthors] = useState([]);
 const [paginationAll, setPaginationAll] = useState({
  current: 1,
  pageSize: 10,
  total: 0,
});
const [paginationFeatured, setPaginationFeatured] = useState({
  current: 1,
  pageSize: 10,
  total: 0,
});

  const themeColor = "#214a78";

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching authors...");
      const { data } = await apiHandle.post("get-public-data-explorer/authors");

      console.log("API Response:", data?.data?.items);

      if (data.status) {
        // Exclude authors with no articles and "Anonymous", sort by article_count (descending)
        const allAuthors = data?.data?.items
          .filter((author) => author.name !== "Anonymous")
          .map((author) => {
            const { children, ...rest } = author;
            return { ...rest, key: author.id };
          })
          .sort((a, b) => b.article_count - a.article_count); // Sort by count descending

          console.log("Processed Authors:", allAuthors);
        setAuthors(allAuthors);
        setPaginationAll((p) => ({ ...p, total: allAuthors.length, current: 1 }));
        setPaginationFeatured((p) => ({
          ...p,
          total: allAuthors.filter((a) => a.is_featured > 0).length,
          current: 1,
        }));

        // Find the most researched author (first one after sorting)
        if (allAuthors.length > 0) {
          setFeaturedAuthors(
            allAuthors.filter((author) => author.is_featured > 0)
          );

          console.log(
            "Featured authors:",
            allAuthors.filter((author) => author.is_featured > 0)
          );
          setTopAuthor(allAuthors[0]);
        }

        console.log("All authors loaded:", allAuthors.length);
      } else {
        setError("No authors available");
      }
    } catch (err) {
      console.error("API Error:", err);
      // setError("Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const toggleSortDirection = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

 const handleTableChangeAll = (pg) => {
  setPaginationAll(pg);
};

const handleTableChangeFeatured = (pg) => {
  setPaginationFeatured(pg);
};

  // Navigation handler for author
  const navigateToAuthor = (authorName) => {
    navigate(`/articles?authors=${encodeURIComponent(authorName)}`);
  };

  const filtered = authors
    ?.filter((a) => a.name.toLowerCase().includes(searchTerm))
    ?.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const featuredList = featuredAuthors
    ?.filter((a) => a.name.toLowerCase().includes(searchTerm))
    ?.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const columns = [
    {
      title: (
        <Space>
          <Text strong>Author Name</Text>
          <Button
            type="text"
            icon={
              sortDirection === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={toggleSortDirection}
          />
        </Space>
      ),
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Text
          strong
          style={{
            color: themeColor,
            cursor: "pointer",
          }}
          onClick={() => navigateToAuthor(name)}
        >
          {toTitleCase(name)}
        </Text>
      ),
    },
    {
      title: "Total # of Studies",
      dataIndex: "article_count",
      key: "article_count",
      sorter: (a, b) => a.article_count - b.article_count,
      render: (count) =>
        count > 0 ? (
          <Text strong style={{ color: themeColor }}>
            {count}
          </Text>
        ) : (
          <Text type="secondary" style={{ fontStyle: "italic" }}>
            No articles yet
          </Text>
        ),
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-2 sm:p-4 md:p-8">
      {/* Top Stats & Title */}

      <Row gutter={[16, 16]} className="mb-6" justify="space-between" align="middle">
        <Col xs={24} md={12}>
          <GoBackButton />
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[8, 16]} align="middle" justify="end">
            <Col xs={12} sm={8} md={12}>
              <Card bordered={false} 
              hoverable
              onClick={() => setActiveTab("all")}
                 style={{
                  cursor: "pointer",
                  borderColor:
                    activeTab === "all" ? themeColor : undefined,
                }}
                bodyStyle={{ padding: "12px" }}
              >
                <Statistic
                  title="Total Authors"
                 
                  value={authors?.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: themeColor, fontSize: "14px" }}
                  className="text-center"
                />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={12}>
              <Card
                bordered={false}
                hoverable
                onClick={() => setActiveTab("featured")}
                style={{
                  cursor: "pointer",
                  borderColor:
                    activeTab === "featured" ? themeColor : undefined,
                }}
                bodyStyle={{ padding: "12px" }}
              >
                <Statistic
                  title="Featured Contributors"
                  value={featuredAuthors?.length || 0}
                  prefix={
                    <img
                      src={mhidSheild}
                      alt="MHID Shield"
                      style={{ marginBottom: "-2px", width: "16px", height: "16px" }}
                    />
                  }
                  valueStyle={{ color: themeColor, fontSize: "14px" }}
                  className="text-center"
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "all",
            label: "All Authors",
            children: (
              <Card
                bordered={false}
                className="shadow-md rounded-lg"
                title={
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
                    <Title level={4} style={{ color: themeColor, margin: 0 }} className="text-base lg:text-lg">
                      <TeamOutlined /> Authors Database
                    </Title>
                    <Text type="secondary" className="text-sm pr-2">
                      Showing {filtered?.length} of {authors?.length}
                    </Text>
                  </div>
                }
                extra={
                  <div className="hidden lg:flex items-center gap-3">
                    <Button icon={<ReloadOutlined />} onClick={fetchAuthors}>
                      Refresh
                    </Button>
                    <FeedbackButton />
                  </div>
                }
              >
                {/* Mobile Action Buttons */}
                <div className="mb-4 lg:hidden">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                    <div className="flex-1">
                      <Button 
                        icon={<ReloadOutlined />} 
                        onClick={fetchAuthors} 
                        className="w-full"
                        style={{ width: '100%' }}
                      >
                        Refresh
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="w-full">
                        <FeedbackButton />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Input
                    className="w-full"
                    placeholder="Search authors..."
                    prefix={<SearchOutlined style={{ color: themeColor }} />}
                    allowClear
                    onChange={handleSearch}
                    size="large"
                  />
                </div>

                {error && (
                  <div className="mb-4 text-center">
                    <Text type="danger">{error}</Text>
                  </div>
                )}

                <Spin spinning={loading} tip="Loading authors...">
                  <Table
                  ex
                 
                    columns={columns}
                    dataSource={filtered}
                    pagination={{
                      ...paginationAll,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "50", "100"],
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} authors`,
                      position: ["bottomCenter"],
                    }}
                    onChange={handleTableChangeAll}
                    bordered
                    scroll={{ x: "max-content" }}
                    className="mobile-responsive-table"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No authors match your search"
                        />
                      ),
                    }}
                    rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
                  />
                </Spin>
              </Card>
            ),
          },
          {
            key: "featured",
            label: "Featured Authors",
            children: (
              <Card
                bordered={false}
                className="shadow-md rounded-lg"
                title={
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
                    <Title level={4} style={{ color: themeColor, margin: 0 }} className="text-base lg:text-lg">
                      <TrophyOutlined /> Featured Authors
                    </Title>
                    <Text type="secondary" className="text-sm pr-2">
                      Showing {featuredList?.length} of {featuredAuthors?.length}
                    </Text>
                  </div>
                }
                extra={
                  <div className="hidden lg:flex items-center gap-3">
                    <Button icon={<ReloadOutlined />} onClick={fetchAuthors}>
                      Refresh
                    </Button>
                    <FeedbackButton />
                  </div>
                }
              >
                {/* Mobile Action Buttons */}
                <div className="mb-4 lg:hidden">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                    <div className="flex-1">
                      <Button 
                        icon={<ReloadOutlined />} 
                        onClick={fetchAuthors} 
                        className="w-full"
                        style={{ width: '100%' }}
                      >
                        Refresh
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="w-full">
                        <FeedbackButton />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Input
                    className="w-full"
                    placeholder="Search featured authors..."
                    prefix={<SearchOutlined style={{ color: themeColor }} />}
                    allowClear
                    onChange={handleSearch}
                    size="large"
                  />
                </div>

                {error && (
                  <div className="mb-4 text-center">
                    <Text type="danger">{error}</Text>
                  </div>
                )}

                <Spin spinning={loading} tip="Loading authors...">
                  <Table
                    columns={columns}
                    dataSource={featuredList}
                    pagination={{
                      ...paginationFeatured,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "50", "100"],
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} authors`,
                      position: ["bottomCenter"],
                    }}
                    onChange={handleTableChangeFeatured}
                    bordered
                    scroll={{ x: "max-content" }}
                    className="mobile-responsive-table"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No featured authors match your search"
                        />
                      ),
                    }}
                    rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
                  />
                </Spin>
                 {/* Contribute CTA */}
                            <div className="text-center mt-6">
                              <ContributeStudyCTA className="mt-6" />
                            </div>
              </Card>
            ),
          },
        ]}
      />

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
          onClick={() => navigate("/biomarker")}
        >
          Explore the Data by Biomarker
        </Button>
      </div>
    </div>
  );
};

export default AuthorsLibrary;
