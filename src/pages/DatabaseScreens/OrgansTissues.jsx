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
  SkinOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";
import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";

const { Title, Text } = Typography;

const OrgansTissues = () => {
  const [organs, setOrgans] = useState([]);
  const [filteredOrgans, setFilteredOrgans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [humanStudiesFilter, setHumanStudiesFilter] = useState(false); // Track the filter state
  const [mostResearchedOrgan, setMostResearchedOrgan] = useState(null);
  const themeColor = "#214a78";
  const navigate = useNavigate();

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
        setFilteredOrgans(loaded); // Set all organs initially
        setPagination((p) => ({ ...p, total: loaded?.length }));

        // Find the most researched organ
        const mostResearched = loaded.reduce((prev, current) =>
          prev.article_count > current.article_count ? prev : current
        );
        setMostResearchedOrgan(mostResearched);
      } else {
        setError("No organs/tissues available");
      }
    } catch (err) {
      console.error("Error fetching organs/tissues:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const toggleSortDirection = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const filtered = filteredOrgans
    ?.filter((o) => o.name.toLowerCase().includes(searchTerm))
    ?.sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleTableChange = (pg) => {
    setPagination(pg);
  };

  const handleOrganClick = (name) => {
    navigate(`/articles?organs=${encodeURIComponent(name)}`);
  };

  // Toggle between showing all and human studies only
  const toggleHumanStudiesFilter = () => {
    setHumanStudiesFilter(!humanStudiesFilter);
    if (!humanStudiesFilter) {
      const filteredData = organs.filter((o) => o.human_study_occurrences > 0);
      setFilteredOrgans(filteredData);
    } else {
      setFilteredOrgans(organs); // Reset to show all
    }
  };

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Organ / Tissue</Text>
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
            size="small"
          />
        </Space>
      ),
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Text
          strong
          style={{ color: themeColor, cursor: "pointer" }}
          onClick={() => handleOrganClick(name)}
        >
          {name}
        </Text>
      ),
    },
    {
      title: "Total # of Studies",
      dataIndex: "article_count",
      key: "article_count",
      sorter: (a, b) => a.article_count - b.article_count,
      render: (count) => (
        <Text
          strong
          style={{
            color: themeColor,
          }}
        >
          {count}
        </Text>
      ),
    },
  ];

  return (
    <div  className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Stats */}
      {/* <Row gutter={16}  className="mb-6 items-center justify-between">
        <Col>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={8}>
          {mostResearchedOrgan && (
            <Card bordered={false}>
              <Statistic
                title="Most Researched Organ"
                value={mostResearchedOrgan?.name}
                suffix={`(${mostResearchedOrgan?.article_count})`}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: themeColor, fontSize: "16px" }}
              />
            </Card>
          )}
        </Col>
      </Row> */}
      <Row gutter={16} className="mb-6">
              <Col xs={24} sm={12} md={8}>
                <GoBackButton />
              </Col>
              <Col xs={24} sm={12} md={16}>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 mt-4 sm:mt-0">
      
                  <>
                   {organs?.length > 0  && <Card
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        minWidth: '150px'
                      }}
                      bordered={false}
                      size="small"
                    >
                      <Statistic
                        title="Total Organs/Tissues"
                        value={organs?.length}
                        valueStyle={{
                          color: themeColor,
                          fontSize: "14px",
                          lineHeight: "1.2"
                        }}
                        style={{
                          textAlign: 'center'
                        }}
                      />
                    </Card>}
                    {mostResearchedOrgan && (
                      <Card
                        style={{
                          width: '100%',
                          maxWidth: '200px',
                          minWidth: '150px'
                        }}
                        bordered={false}
                        size="small"
                      >
                        <Statistic
                          title="Most Researched Organ"
                          value={mostResearchedOrgan?.name}
                          suffix={`(${mostResearchedOrgan?.article_count})`}
                          prefix={<TrophyOutlined />}
                          valueStyle={{
                            color: themeColor,
                            fontSize: "14px",
                            lineHeight: "1.2"
                          }}
                          style={{
                            textAlign: 'center'
                          }}
                        />
                      </Card>
                    )}
                  </>
                </div>
              </Col>
            </Row>

      <Card
        bordered={false}
        className="shadow-md rounded-lg pt-4"
        title={
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 pb-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Title level={4} style={{ color: themeColor, margin: 0 }}>
                <SkinOutlined /> Organs &amp; Tissues
              </Title>
              <Text type="secondary">
                Showing {filtered?.length} of {organs?.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchOrgans}
                  className="w-full h-[30px]"
                  style={{ height: "30px" }}
                >
                  Refresh
                </Button>
              </div>
              <div className="w-full sm:w-1/2 flex items-center whitespace-nowrap overflow-visible min-w-[180px]">
                <FeedbackButton style={{ width: "100%", height: "30px", minWidth: "140px" }} />
              </div>
            </div>
          </div>
        }
        extra={null}
      >
        {/* Search */}
        <div  className="mb-6 flex flex-row gap-20 items-center justify-between">
          <div  className="flex-1">
            <Input
              placeholder="Search organs/tissues..."
              prefix={<SearchOutlined style={{ color: themeColor }} />}
              onChange={handleSearch}
              allowClear
              size="large"
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={toggleHumanStudiesFilter}
              style={{
                backgroundColor: themeColor,
                borderColor: themeColor,
                width: "100%",
                height: "40px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {humanStudiesFilter ? "Show All" : "Human Studies"}
            </Button>
          </div>
        </div>

        {error && (
          <Divider>
            <Text type="danger">{error}</Text>
          </Divider>
        )}

        <Spin spinning={loading} tip="Loading organs/tissues...">
          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              position: ["bottomCenter"],
            }}
            onChange={handleTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No items match your search"
                />
              ),
            }}
            rowClassName={(r, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
          />
        </Spin>
         {/* Contribute CTA */}
                    <div className="text-center mt-6">
                      <ContributeStudyCTA className="mt-6" />
                    </div>
      </Card>

      <div  className="mt-8 text-center">
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
          onClick={() => navigate("/physiological-systems")}
        >
          Explore the Data by Physiological Systems
        </Button>
      </div>
    </div>
  );
};

export default OrgansTissues;
