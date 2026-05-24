import React, { useEffect, useState } from "react";
import {
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
  Pagination,
  Tag,
} from "antd";
import {
  SearchOutlined,
  SkinOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";

const { Title, Text, Paragraph } = Typography;

const OrgansTissues = () => {
  const [organs, setOrgans] = useState([]);
  const [filteredOrgans, setFilteredOrgans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [humanStudiesFilter, setHumanStudiesFilter] = useState(false);
  const [mostResearchedOrgan, setMostResearchedOrgan] = useState(null);

  const themeColor = "#214a78";
  const navigate = useNavigate();
  const imageBaseUrl = import.meta.env.VITE_APP_IMAGE_URL || "";

  useEffect(() => {
    fetchOrgans();
  }, []);

  const fetchOrgans = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post(
          `${import.meta.env.VITE_API_BASE_URL}/get-public-data-explorer/organs`
      );
      if (data?.status) {
        const loaded = data?.data?.items?.map((o) => ({ ...o, key: o.id }));
        setOrgans(loaded);
        setFilteredOrgans(loaded);
        if (loaded.length > 0) {
          const mostResearched = loaded.reduce((prev, current) =>
              prev.article_count > current.article_count ? prev : current
          );
          setMostResearchedOrgan(mostResearched);
        }
      } else {
        setError("No organs/tissues available");
      }
    } catch (err) {
      console.error("Error fetching organs/tissues:", err);
      setError("Failed to fetch organs/tissues");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const toggleSortDirection = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const toggleHumanStudiesFilter = () => {
    setHumanStudiesFilter(!humanStudiesFilter);
    setCurrentPage(1);
  };

  const processedData = React.useMemo(() => {
    let data = [...organs];
    if (humanStudiesFilter) {
      data = data.filter((o) => (o.human_study_occurrences || 0) > 0);
    }
    if (searchTerm) {
      data = data.filter((o) => o.name.toLowerCase().includes(searchTerm));
    }
    data.sort((a, b) =>
        sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );
    return data;
  }, [organs, humanStudiesFilter, searchTerm, sortDirection]);

  const paginatedData = processedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
  );

  const handleOrganClick = (id) => {
    navigate(`/organ/${id}`);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${imageBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-8">
        {/* Top stats row */}
        <Row gutter={[16, 16]} className="mb-6" justify="space-between" align="middle">
          <Col>
            <GoBackButton />
          </Col>
          <Col xs={24} sm={12} md={8}>
            {mostResearchedOrgan && (
                <Card
                    bordered={false}
                    style={{
                      background: `linear-gradient(135deg, ${themeColor}08 0%, ${themeColor}15 100%)`,
                      borderRadius: 20,
                    }}
                    bodyStyle={{ padding: "12px 24px" }}
                >
                  <Statistic
                      title={
                        <Space>
                          <TrophyOutlined style={{ color: "#faad14" }} />
                          <Text strong>Most Researched</Text>
                        </Space>
                      }
                      value={mostResearchedOrgan?.name}
                      suffix={<Text type="secondary">({mostResearchedOrgan?.article_count})</Text>}
                      valueStyle={{ color: themeColor, fontSize: "16px", fontWeight: 600 }}
                  />
                </Card>
            )}
          </Col>
        </Row>

        <Card
            bordered={false}
            className="shadow-md rounded-xl overflow-hidden"
            style={{ borderRadius: 20, paddingTop: 30, }}
            bodyStyle={{ padding: "24px" }}
            title={
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full">
                <div>
                  <Title level={3} style={{ color: themeColor, margin: 0 }}>
                    <SkinOutlined /> Organs &amp; Tissues
                  </Title>
                  <Text type="secondary">
                    {processedData.length} of {organs.length} items
                  </Text>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button icon={<ReloadOutlined />} onClick={fetchOrgans} loading={loading}>
                    Refresh
                  </Button>
                  <FeedbackButton />
                </div>
              </div>
            }
            extra={null}
        >
          {/* Search and Filter bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Input
                className="flex-1"
                placeholder="Search organs/tissues..."
                prefix={<SearchOutlined style={{ color: themeColor }} />}
                onChange={handleSearch}
                allowClear
                size="large"
                style={{ borderRadius: 40 }}
            />
            <Button
                type="primary"
                onClick={toggleHumanStudiesFilter}
                style={{
                  backgroundColor: humanStudiesFilter ? "#52c41a" : themeColor,
                  borderColor: humanStudiesFilter ? "#52c41a" : themeColor,
                  borderRadius: 40,
                  minWidth: 140,
                }}
            >
              {humanStudiesFilter ? "Show All" : "Human Studies"}
            </Button>
            <Button
                icon={
                  sortDirection === "asc" ? <SortAscendingOutlined /> : <SortDescendingOutlined />
                }
                onClick={toggleSortDirection}
                size="large"
                style={{ borderRadius: 40 }}
            >
              Sort {sortDirection === "asc" ? "A–Z" : "Z–A"}
            </Button>
          </div>

          <Divider style={{ margin: "0 0 24px 0" }} />

          {loading ? (
              <div className="text-center py-12">
                <Spin size="large" />
                <div className="mt-4">
                  <Text>Loading organs/tissues...</Text>
                </div>
              </div>
          ) : error ? (
              <div className="text-center py-12">
                <Text type="danger">{error}</Text>
                <div className="mt-4">
                  <Button onClick={fetchOrgans} type="primary">
                    Try Again
                  </Button>
                </div>
              </div>
          ) : paginatedData.length === 0 ? (
              <Empty
                  description={
                    organs.length === 0
                        ? "No organs/tissues available in the database yet"
                        : "No items match your criteria"
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
          ) : (
              <>
                <Row gutter={[24, 24]}>
                  {paginatedData.map((organ) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={organ.id}>
                        <Card
                            hoverable
                            className="organ-card"
                            style={{
                              borderRadius: 24,
                              border: "1px solid #f0f0f0",
                              transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                              background: "#fff",
                              overflow: "hidden",
                              cursor: "default",
                              height: "100%",
                            }}
                            bodyStyle={{
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                            }}
                        >
                          {/* Top accent bar */}
                          <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 8,
                                background: `linear-gradient(90deg, ${themeColor}, #40a9ff)`,
                                borderTopLeftRadius: 24,
                                borderTopRightRadius: 24,
                              }}
                          />

                          {/* Wrap all upper content in a flex container that expands */}
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {/* Organ Image */}
                            {organ.image ? (
                                <div className="mb-3 flex justify-center">
                                  {console.log('imageBaseUrl', imageBaseUrl)}
                                  <img
                                      src={`${imageBaseUrl}${organ.image}`}
                                      alt={organ.name}
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        border: `2px solid ${themeColor}20`,
                                      }}
                                      onError={(e) => (e.target.style.display = "none")}
                                  />
                                </div>
                            ) : (
                                <div className="mb-3">
                                  <SkinOutlined style={{ fontSize: 48, color: themeColor }} />
                                </div>
                            )}

                            {/* Organ Name – no longer clickable, no pointer cursor */}
                            <div className="mb-2" style={{ textAlign: "center" }}>
                              <Text
                                  strong
                                  style={{
                                    color: themeColor,
                                    fontSize: "1rem",
                                    lineHeight: 1.4,
                                    cursor: "default",
                                  }}
                              >
                                {organ.name}
                              </Text>
                            </div>

                            {/* Study count tag (still links to articles) */}
                            <div className="mb-3">
                              <a
                                  href={`/articles?organs=${encodeURIComponent(organ.name)}`}
                                  style={{ textDecoration: "none" }}
                              >
                                <Tag
                                    icon={<FileTextOutlined />}
                                    style={{
                                      backgroundColor: `${themeColor}10`,
                                      border: `1px solid ${themeColor}30`,
                                      color: themeColor,
                                      borderRadius: 30,
                                      padding: "4px 12px",
                                      fontSize: 13,
                                      fontWeight: 500,
                                    }}
                                >
                                  {organ.article_count || 0} Studies
                                </Tag>
                              </a>
                            </div>

                            {/* Short description – flexible area, grows as needed */}
                            <Paragraph
                                ellipsis={{ rows: 2, expandable: false }}
                                type="secondary"
                                style={{
                                  fontSize: "13px",
                                  lineHeight: 1.5,
                                  marginBottom: 0,
                                  textAlign: "center",
                                  flex: 1,
                                }}
                            >
                              {organ.short_description || "No summary available."}
                            </Paragraph>
                          </div>

                          {/* Sticky bottom: View Details button */}
                          <div style={{ marginTop: "16px", textAlign: "center" }}>
                            <Link
                                to={`/organs-tissues/${organ.id}`}
                                style={{ color: themeColor, textDecoration: "none" }}
                            >
                              <FileTextOutlined /> View Details →
                            </Link>
                          </div>
                        </Card>
                      </Col>
                  ))}
                </Row>

                <div className="mt-10 flex justify-center">
                  <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={processedData.length}
                      onChange={(page, size) => {
                        setCurrentPage(page);
                        if (size !== pageSize) setPageSize(size);
                      }}
                      showSizeChanger
                      pageSizeOptions={["12", "24", "48", "96"]}
                      showTotal={(total, range) =>
                          `${range[0]}–${range[1]} of ${total} organs/tissues`
                      }
                  />
                </div>
              </>
          )}

          <div className="text-center mt-10">
            <ContributeStudyCTA />
          </div>
        </Card>

        <div className="mt-10 text-center">
          <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: themeColor,
                borderColor: themeColor,
                borderRadius: 40,
                height: 48,
                fontSize: "1rem",
                fontWeight: 600,
                padding: "0 32px",
              }}
              onClick={() => navigate("/physiological-systems")}
          >
            Explore the Data by Physiological Systems
          </Button>
        </div>
      </div>
  );
};

export default OrgansTissues;
