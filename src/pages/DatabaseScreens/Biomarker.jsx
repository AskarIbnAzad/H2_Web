import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Spin,
  Select,
  Card,
  Typography,
  Space,
  Button,
  Tooltip,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  DatabaseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import ExploreDataButton from "../../components/ExploreDataButton/ExploreDataButton";

const { Title, Text } = Typography;
const { Option } = Select;

const Biomarker = () => {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const themeColor = "#214a78";
  const [mostResearchedBiomarker, setMostResearchedBiomarker] = useState({});

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedCategories]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resp } = await apiHandle.post(
          `${import.meta.env.VITE_API_BASE_URL}/get-public-data-explorer/biomarkers`
      );

      console.log("API Response:", resp);

      if (resp.status) {
        // build category filter options
        const allCats = new Set();
        resp?.data?.items?.forEach((item) =>
          (item.categories || [])?.forEach((cat) => allCats.add(cat))
        );
        console.log("All Categories:", allCats);
        setCategoryFilters(
          Array.from(allCats)?.map((cat) => ({ text: cat, value: cat }))
        );

        // prepare rows
        let rows = resp?.data?.items?.map((item, idx) => ({
          key: idx,
          ...item,
          categories: item.categories || [],
        }));

        // Get the most researched biomarker
        const mostResearched = resp?.sub?.reduce((prev, current) =>
          prev.total_articles > current.total_articles ? prev : current
        );
        setMostResearchedBiomarker(mostResearched);

        // search filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          rows = rows?.filter(
            (r) =>
              r?.sub_category_name.toLowerCase().includes(term) ||
              r.categories?.some((cat) => cat.toLowerCase().includes(term))
          );
        }

        // category filter
        if (selectedCategories?.length) {
          rows = rows?.filter((r) =>
            r?.categories?.some((cat) => selectedCategories?.includes(cat))
          );
        }

        setData(rows);
        setPagination((p) => ({ ...p, total: rows?.length }));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const handleCategoryChange = (vals) => {
    setSelectedCategories(vals);
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPagination({ current: 1, pageSize: 10, total: 0 });
    fetchData();
  };

  const handleTableChange = (pg, filters, sorter) => {
    setPagination({
      current: pg.current,
      pageSize: pg.pageSize,
      total: pagination.total,
    });
  };

  // Navigation handlers
  const navigateToBiomarker = (biomarkerName) => {
    navigate(`/articles?marker=${encodeURIComponent(biomarkerName)}`);
  };

  const navigateToCategory = (category) => {
    navigate(`/articles?category=${encodeURIComponent(category)}`);
  };

  const columns = [
    {
      title: "Biomarker",
      dataIndex: "sub_category_name",
      key: "sub_category_name",
      sorter: (a, b) => a.sub_category_name.localeCompare(b.sub_category_name),
      render: (text) => {
        // Capitalize each word
        const titleCase = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
        return (
          <Text
            strong
            style={{
              color: themeColor,
              cursor: "pointer",
            }}
            onClick={() => navigateToBiomarker(text)}
          >
            {titleCase}
          </Text>
        );
      },
      width: "30%",
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      filters: categoryFilters,
      filterSearch: true,
      onFilter: (value, record) => record.categories.includes(value),
      render: (cats) => (
        <Space wrap size={[0, 8]}>
          {cats?.length ? (
            cats?.map((c, i) => (
              <Tooltip key={i} title={c}>
                <Text
                  style={{
                    background: "#fff",
                    color: themeColor,
                    padding: "2px 8px",
                    borderRadius: 12,
                    border: `1px solid ${themeColor}`,
                    display: "inline-block",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  ellipsis={{ tooltip: c }}
                  onClick={() => navigateToCategory(c)}
                >
                  {c}
                </Text>
              </Tooltip>
            ))
          ) : (
            <Text type="secondary">N/A</Text>
          )}
        </Space>
      ),
      width: "30%",
    },
    {
      title: "Total Studies",
      dataIndex: "total_articles",
      key: "total_articles",
      sorter: (a, b) => a.total_articles - b.total_articles,
      render: (text) => (
        <Text
          strong
          style={{
            color: themeColor,
          }}
        >
          {text}
        </Text>
      ),
      width: "20%",
    },
  ];

  // Calculate current page data based on pagination
  const getCurrentPageData = () => {
    const { current, pageSize } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  };

  return (
    <div  className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Stats */}
      <Row gutter={16}  className="mb-6 items-center justify-between">
        <Col>
          <GoBackButton />
        </Col>
        <Col xs={24} sm={8}>
          {mostResearchedBiomarker && (
            <Card bordered={false}>
              <Statistic
                title="Most Researched Biomarker"
                value={mostResearchedBiomarker?.sub_category_name}
                suffix={`(${mostResearchedBiomarker?.total_articles})`}
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
                Biomarkers Database
              </Title>
              <Text type="secondary">
                Showing {Math.min(pagination.pageSize, data?.length)} of {pagination.total} biomarkers
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchData}
                      className="w-full h-[30px]"
                  style={{ height: "30px", }}
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
        {/* Controls */}
        <div  className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Input
             className="md:w-1/3"
            placeholder="Search biomarkers..."
            prefix={<SearchOutlined style={{ color: themeColor }} />}
            allowClear
            value={searchTerm}
            onChange={handleSearch}
            size="large"
          />

          <div  className="flex flex-wrap items-center gap-2 w-full md:w-1/2">
            <Select
              mode="multiple"
              allowClear
              placeholder={
                <>
                  <FilterOutlined /> Filter by categories
                </>
              }
              value={selectedCategories}
              onChange={handleCategoryChange}
               className="flex-grow"
              maxTagCount={2}
              maxTagTextLength={12}
              size="large"
            >
              {categoryFilters.map((f) => (
                <Option key={f.value} value={f.value}>
                  {f.text}
                </Option>
              ))}
            </Select>

            <Tooltip title="Reset filters">
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                size="large"
                style={{ borderColor: themeColor, color: themeColor }}
              />
            </Tooltip>
          </div>
        </div>

        {/* Table */}
        <Spin spinning={loading} tip="Loading biomarkers...">
          <Table
            columns={columns}
            dataSource={getCurrentPageData()}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} biomarkers`,
              position: ["bottomCenter"],
              onChange: (page, pageSize) => {
                setPagination({
                  ...pagination,
                  current: page,
                  pageSize: pageSize,
                });
              },
              onShowSizeChange: (current, size) => {
                setPagination({
                  ...pagination,
                  current: 1,
                  pageSize: size,
                });
              },
            }}
            onChange={handleTableChange}
            bordered
            scroll={{ x: "max-content" }}
            rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
            locale={{
              emptyText: searchTerm
                ? "No biomarkers match your criteria"
                : "No biomarkers found",
            }}
          />
        </Spin>
         {/* Contribute CTA */}
                    <div className="text-center mt-6">
                      <ContributeStudyCTA className="mt-6" />
                    </div>
      </Card>
      {/* Updated Call to Action */}
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
          onClick={() => navigate("/countries")}
        >
         Explore the Data by Country
        </Button>
      </div>
      {/* <ExploreDataButton /> */}
    </div>
  );
};

export default Biomarker;
