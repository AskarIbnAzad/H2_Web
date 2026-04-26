import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Input,
  Space,
  Button,
  Empty,
  Statistic,
  Row,
  Col,
  Divider,
  Spin,
  Pagination,
  Tag,
} from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";

const { Title, Text, Paragraph } = Typography;

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [topDisease, setTopDisease] = useState(null);

  const navigate = useNavigate();
  const themeColor = "#214a78";

  useEffect(() => {
    fetchDiseases();
  }, []);

  useEffect(() => {
    const filtered = diseases.filter((disease) =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDiseases(filtered);
    setCurrentPage(1);
  }, [diseases, searchTerm]);

  const fetchDiseases = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post("get-public-data-explorer/diseases");
      if (data.status) {
        const loaded = data?.data?.items.map((d) => ({ ...d, key: d.id }));
        setDiseases(loaded);
        setFilteredDiseases(loaded);
        if (loaded.length > 0) {
          const top = loaded.reduce((a, b) =>
              (a.count || 0) > (b.count || 0) ? a : b
          );
          setTopDisease(top);
        } else {
          setTopDisease(null);
        }
      }
    } catch (err) {
      console.error("Error fetching diseases:", err);
      setError("Failed to fetch diseases");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSort = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const sortedDiseases = [...filteredDiseases].sort((a, b) =>
      sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
  );

  const paginatedDiseases = sortedDiseases.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
  );

  const goToDisease = (name) =>
      navigate(`/articles?diseases=${encodeURIComponent(name)}`);

  return (
      <div className="max-w-[1200px] mx-auto p-4 md:p-8">
        {/* Top row with back button and most researched card */}
        <Row gutter={[16, 16]} className="mb-6" justify="space-between" align="middle">
          <Col>
            <GoBackButton />
          </Col>
          <Col>
            {topDisease && (
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
                      value={topDisease?.name}
                      suffix={<Text type="secondary">({topDisease?.count || 0})</Text>}
                      valueStyle={{ color: themeColor, fontSize: "16px", fontWeight: 600 }}
                  />
                </Card>
            )}
          </Col>
        </Row>

        <Card
            bordered={false}
            className="shadow-md rounded-xl overflow-hidden"
            style={{ borderRadius: 20 }}
            bodyStyle={{ padding: "24px" }}
            title={
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full">
                <div>
                  <Title level={3} style={{ color: themeColor, margin: 0 }}>
                    Diseases & Disorders
                  </Title>
                  <Text type="secondary">
                    {paginatedDiseases.length} of {filteredDiseases.length} diseases
                  </Text>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                      icon={<ReloadOutlined />}
                      onClick={fetchDiseases}
                      loading={loading}
                  >
                    Refresh
                  </Button>
                  <FeedbackButton />
                </div>
              </div>
            }
            extra={null}
        >
          {/* Search & Sort */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Input
                className="flex-1"
                placeholder="Search by disease name..."
                prefix={<SearchOutlined style={{ color: themeColor }} />}
                onChange={handleSearch}
                allowClear
                size="large"
                style={{ borderRadius: 40 }}
            />
            <Button
                icon={
                  sortDirection === "asc" ? (
                      <SortAscendingOutlined />
                  ) : (
                      <SortDescendingOutlined />
                  )
                }
                onClick={toggleSort}
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
                  <Text>Loading diseases...</Text>
                </div>
              </div>
          ) : error ? (
              <div className="text-center py-12">
                <Text type="danger">{error}</Text>
                <div className="mt-4">
                  <Button onClick={fetchDiseases} type="primary">
                    Try Again
                  </Button>
                </div>
              </div>
          ) : paginatedDiseases.length === 0 ? (
              <Empty
                  description={
                    diseases.length === 0
                        ? "No diseases available in the database yet"
                        : "No diseases match your search"
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
          ) : (
              <>
                {/* Card Grid */}
                <Row gutter={[24, 24]}>
                  {paginatedDiseases.map((disease) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={disease.id}>
                        <Card
                            hoverable
                            className="disease-card"
                            style={{
                              borderRadius: 24,
                              border: "1px solid #f0f0f0",
                              transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1)",
                              background: "#fff",
                              overflow: "hidden",
                            }}
                            bodyStyle={{ padding: "20px", textAlign: "center" }}
                        >
                          {/* Top accent bar - matches card radius */}
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

                          {/* Centered Icon */}
                          <div className="mb-3">
                            <MedicineBoxOutlined
                                style={{ fontSize: 32, color: themeColor }}
                            />
                          </div>

                          {/* Disease Name */}
                          <div className="mb-2">
                            <Text
                                strong
                                style={{
                                  color: themeColor,
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  lineHeight: 1.4,
                                }}
                                onClick={() => goToDisease(disease.name)}
                            >
                              {disease.name}
                            </Text>
                          </div>

                          {/* Study count as a Tag - centered */}
                          <div className="mb-4">
                            <Tag
                                icon={<FileTextOutlined />}
                                color="blue"
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
                              {disease.count || 0} Studies
                            </Tag>
                          </div>

                          {/* Short description - centered */}
                          <Paragraph
                              ellipsis={{ rows: 3, expandable: false }}
                              type="secondary"
                              style={{
                                fontSize: "13px",
                                lineHeight: 1.5,
                                marginBottom: 16,
                                minHeight: 60,
                                textAlign: "center",
                              }}
                          >
                            {disease.short_description || "No description available."}
                          </Paragraph>

                          {/* Centered button */}
                          <div className="mt-2">
                            <Button
                                type="link"
                                icon={<FileTextOutlined />}
                                onClick={() => goToDisease(disease.name)}
                                style={{ padding: 0, color: themeColor }}
                            >
                              View Articles →
                            </Button>
                          </div>
                        </Card>
                      </Col>
                  ))}
                </Row>

                {/* Pagination */}
                <div className="mt-10 flex justify-center">
                  <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={filteredDiseases.length}
                      onChange={(page, size) => {
                        setCurrentPage(page);
                        if (size !== pageSize) setPageSize(size);
                      }}
                      showSizeChanger
                      pageSizeOptions={["12", "24", "48", "96"]}
                      showTotal={(total, range) =>
                          `${range[0]}–${range[1]} of ${total} diseases`
                      }
                      style={{ borderRadius: 40 }}
                  />
                </div>
              </>
          )}

          {/* Contribute CTA */}
          <div className="text-center mt-10">
            <ContributeStudyCTA />
          </div>
        </Card>

        {/* Extra explore button */}
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
              onClick={() => navigate("/methods-of-administration")}
          >
            Explore Data by Methods of Administration
          </Button>
        </div>
      </div>
  );
};

export default Diseases;