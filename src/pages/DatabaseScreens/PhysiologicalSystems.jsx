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
  ClusterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";
const { Title, Text } = Typography;

const PhysiologicalSystems = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState([]);
  const [filteredSystems, setFilteredSystems] = useState([]);
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
  const [topSystem, setTopSystem] = useState(null);

  const themeColor = "#214a78";

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post(
        "https://api.h2research.org/api/get-public-data-explorer/systems"
      );
      if (data?.status) {
        const loaded = data?.data?.items?.map((s) => ({ ...s, key: s.id }));
        setSystems(loaded);
        setFilteredSystems(loaded);
        setPagination((p) => ({ ...p, total: loaded.length }));
        // most researched
        const top = loaded.reduce((a, b) =>
          a.article_count > b.article_count ? a : b
        );
        setTopSystem(top);
      } else {
        setError("No systems available");
      }
    } catch (e) {
      console.error("Error fetching systems:", e);
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
      setFilteredSystems(
        next ? systems.filter((s) => s.human_study_occurrences > 0) : systems
      );
      return next;
    });
  };

  const filtered = filteredSystems
    .filter((s) => s.name.toLowerCase().includes(searchTerm))
    .sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const onTableChange = (pg) => setPagination(pg);

  const navigateTo = (name) =>
    navigate(`/articles?systems=${encodeURIComponent(name)}`);

  const columns = [
    {
      title: (
        <Space>
          <Text strong>System</Text>
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
          onClick={() => navigateTo(text)}
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
      {/* Stats Dashboard */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 mt-4 sm:mt-0">
            <>
              {systems?.length > 0 && <Card
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  minWidth: '150px'
                }}
                bordered={false}
                size="small"
              >
                <Statistic
                  title="Total Systems"
                  value={systems?.length}
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
              {topSystem && (
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
                    title="Most Researched System"
                    value={topSystem?.name}
                    suffix={`(${topSystem?.article_count})`}
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
                <ClusterOutlined /> Physiological Systems
              </Title>
              <Text type="secondary">
                Showing {filtered.length} of {systems.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchSystems}
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
        {/* Search + Toggle */}
        <div  className="mb-6 flex flex-col md:flex-row gap-20 items-center">
          <Input
             className="flex-1"
            placeholder="Search systems..."
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

        <Spin spinning={loading} tip="Loading systems...">
          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} systems`,
              position: ["bottomCenter"],
            }}
            onChange={onTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No systems match your search"
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
          onClick={() => navigate("/research-topic")}
        >
          Explore the Data by Research Topic
        </Button>
      </div>
    </div>
  );
};

export default PhysiologicalSystems;
