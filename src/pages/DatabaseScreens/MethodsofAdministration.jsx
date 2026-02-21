
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
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";

const { Title, Text } = Typography;

const MethodsofAdministration = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filteredMethods, setFilteredMethods] = useState([]);
  const [topResearchedMethod, setTopResearchedMethod] = useState(null);
  const [isHumanStudies, setIsHumanStudies] = useState(false); // Track Human studies filter

  const themeColor = "#214a78";

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post(
          `${import.meta.env.VITE_API_BASE_URL}/get-public-data-explorer/administrationMethods`
      );
      if (data?.status) {
        const loaded = data?.data?.items?.map((m) => ({ ...m, key: m.id }));
        setMethods(loaded);
        setPagination((p) => ({ ...p, total: loaded?.length }));

        // Find the most researched method
        const mostResearched = loaded.reduce((prev, current) =>
          prev.article_count > current.article_count ? prev : current
        );
        setTopResearchedMethod(mostResearched);
      } else {
        setError("No methods available");
      }
    } catch (err) {
      // setError("Failed to fetch methods");
      console.error("Error fetching methods:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value); // Update the search term
    setPagination((p) => ({ ...p, current: 1 }));

    // Update the filtered methods after search term change
    const filteredData = methods.filter((method) =>
      method.name.toLowerCase().includes(value)
    );
    setFilteredMethods(filteredData);
  };

  const toggleSortDirection = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const sortMethods = (sortType) => {
    let sortedMethods = [...methods];
    if (sortType === "A-Z") {
      sortedMethods = sortedMethods.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortType === "Z-A") {
      sortedMethods = sortedMethods.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (sortType === "Most to least") {
      sortedMethods = sortedMethods.sort(
        (a, b) => b.article_count - a.article_count
      );
    } else if (sortType === "Least to most") {
      sortedMethods = sortedMethods.sort(
        (a, b) => a.article_count - b.article_count
      );
    }

    setFilteredMethods(sortedMethods);
  };

  const toggleHumanStudiesFilter = () => {
    setIsHumanStudies(!isHumanStudies);
    if (!isHumanStudies) {
      // Filter methods where species_relationships includes Humans
      const filtered = methods.filter(
        (method) => method.species_relationships?.Humans
      );
      setFilteredMethods(filtered);
    } else {
      setFilteredMethods(methods); // Reset filter
    }
  };

  // Navigation handler for method
  const navigateToMethod = (methodName) => {
    navigate(
      `/articles?administrationMethods=${encodeURIComponent(methodName)}`
    );
  };

  const handleTableChange = (pg) => {
    setPagination(pg);
  };

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Method</Text>
          <Button
            type="text"
            icon={
              sortDirection === "asc" ? (
                <SortAscendingOutlined onClick={() => sortMethods("A-Z")} />
              ) : (
                <SortDescendingOutlined onClick={() => sortMethods("Z-A")} />
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
          style={{
            color: themeColor,
            cursor: "pointer", // Add cursor pointer to indicate it's clickable
          }}
          onClick={() => navigateToMethod(name)} // Add click handler to navigate
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
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Stats Dashboard */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 mt-4 sm:mt-0">
            <>
              {methods?.length > 0 && <Card
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  minWidth: '150px'
                }}
                bordered={false}
                size="small"
              >
                <Statistic
                  title="Total Methods"
                  value={methods?.length}
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
              {topResearchedMethod && (
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
                    title="Most Researched Method"
                    value={topResearchedMethod?.name}
                    suffix={`(${topResearchedMethod?.article_count})`}
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
                <ExperimentOutlined /> Methods of Administration
              </Title>
              <Text type="secondary">
                Showing {filteredMethods?.length} of {methods?.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchMethods}
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
              placeholder="Search methods..."
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
              {isHumanStudies ? "Show All" : "Human Studies"}
            </Button>
          </div>
        </div>

        {error && (
          <Divider>
            <Text type="danger">{error}</Text>
          </Divider>
        )}

        <Spin spinning={loading} tip="Loading methods...">
          <Table
            columns={columns}
            dataSource={filteredMethods?.length > 0 ? filteredMethods : methods}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} methods`,
              position: ["bottomCenter"],
            }}
            onChange={handleTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No methods match your search"
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
          onClick={() => navigate("/organs-tissues")}
        >
          Explore the Data by Organs/Tissues
        </Button>
      </div>
    </div>
  );
};

export default MethodsofAdministration;
