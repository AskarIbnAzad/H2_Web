import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Typography,
  Input,
  Space,
  Button,
  Select,
  Spin,
  Empty,
  Badge,
  Tooltip,
  Statistic,
  Row,
  Col,
  Divider,
} from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  FilterOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";
import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";
import { SiToptal } from "react-icons/si";

const { Title, Text } = Typography;
const { Option } = Select;

const Country = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [topCountry, setTopCountry] = useState(null);

  const themeColor = "#214a78";

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiHandle.post(
          `${import.meta.env.VITE_API_BASE_URL}/get-public-data-explorer/countries`
      );

      if (response.data?.status) {
        const countriesData = response?.data?.data?.items?.map((country) => ({
          ...country,
          key: country.id,
        }));

        setCountries(countriesData);
        setPagination((prev) => ({
          ...prev,
          total: countriesData?.length,
        }));

        // Get the country with the highest number of studies
        const mostPublishedCountry = countriesData.reduce((prev, current) =>
          prev.article_count > current.article_count ? prev : current
        );
        setTopCountry(mostPublishedCountry);
      }
    } catch (err) {
      setError("Failed to fetch countries data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const navigateToCountry = (countryName) => {
    navigate(`/articles?countries=${encodeURIComponent(countryName)}`);
  };

  const filteredCountries = countries
    ?.filter((country) => country?.name?.toLowerCase().includes(searchTerm))
    ?.filter((country) =>
      statusFilter === "all"
        ? true
        : country?.status?.toLowerCase() === statusFilter.toLowerCase()
    )
    ?.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    })
    ?.map(({ children, ...rest }) => rest); // Remove children property

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Country</Text>
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
          style={{
            color: themeColor,
            cursor: "pointer", // Add cursor pointer to indicate it's clickable
          }}
          onClick={() => navigateToCountry(name)} // Add click handler to navigate
        >
          {name}
        </Text>
      ),
    },
    {
      title: "# of Studies",
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
      {/* <Row gutter={16} className="mb-6 items-center justify-between">
        <Col>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={9}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div>
              {topCountry && (
                <Card style={{ width: 'max-content' }} bordered={false}>
                  <Statistic
                    title="Top Publishing Country"
                    value={topCountry?.name}
                    suffix={`(${topCountry?.article_count})`}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: themeColor, fontSize: "16px" }}
                  />
                </Card>
              )}
            </div>
            <div >
              {topCountry && (
                <Card style={{ width: 'max-content' }} bordered={false}>
                  <Statistic
                    title="Top Publishing Country"
                    value={topCountry?.name}
                    suffix={`(${topCountry?.article_count})`}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: themeColor, fontSize: "16px" }}
                  />
                </Card>
              )}
            </div>
          </div>
        </Col>
      </Row> */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-4 mt-4 sm:mt-0">

            <>
             {countries?.length > 0 && <Card
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  minWidth: '150px'
                }}
                bordered={false}
                size="small"
              >
                <Statistic
                  title="Total Countries"
                  value={countries?.length}
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
              {topCountry && (
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
                    title="Top Publishing Country"
                    value={topCountry?.name}
                    suffix={`(${topCountry?.article_count})`}
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
                <GlobalOutlined /> Countries Database
              </Title>
              <Text type="secondary">
                Showing {filteredCountries?.length} of {pagination.total} countries
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchCountries}
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
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2">
            <Input
              placeholder="Search countries..."
              prefix={<SearchOutlined style={{ color: themeColor }} />}
              onChange={handleSearch}
              allowClear
              size="large"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Badge.Ribbon text="Error" color="red">
              <Card>
                <Text type="danger">{error}</Text>
              </Card>
            </Badge.Ribbon>
          </div>
        )}

        <Spin spinning={loading} tip="Loading countries...">
          <Table
            columns={columns}
            dataSource={filteredCountries}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} countries`,
              position: ["bottomCenter"],
            }}
            onChange={handleTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText:
                searchTerm || statusFilter !== "all" ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No countries match your search criteria"
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No countries available"
                  />
                ),
            }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "bg-gray-50" : ""
            }
          />
        </Spin>
         {/* Contribute CTA */}
                    <div className="text-center mt-6">
                      <ContributeStudyCTA className="mt-6" />
                    </div>
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
          onClick={() => navigate("/diseases")}
        >
          Explore Data by Diseases/Disorders
        </Button>
      </div>
      {/* <ExploreDataButton /> */}
    </div>
  );
};

export default Country;
