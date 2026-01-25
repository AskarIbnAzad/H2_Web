import React, { useState, useEffect } from "react";
import {
  Table,
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
} from "antd";
import {
  SearchOutlined,
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

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
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
    setPagination((p) => ({ ...p, total: filtered.length, current: 1 }));
  }, [diseases, searchTerm]);

  const fetchDiseases = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiHandle.post("get-public-data-explorer/diseases");

      console.log("Fetched diseases data:", data?.data?.items);
      if (data.status) {
        const loaded = data?.data?.diseases.map((d) => ({ ...d, key: d.id }));
        setDiseases(loaded);
        setFilteredDiseases(loaded);
        setPagination((p) => ({ ...p, total: loaded.length }));

        // find the most researched disease only if diseases exist
        if (loaded.length > 0) {
          const top = loaded.reduce((a, b) =>
            a.article_count > b.article_count ? a : b
          );
          setTopDisease(top);
        } else {
          setTopDisease(null);
        }
        
        console.log("Diseases loaded:", loaded.length);
      } else {
        // setError("No diseases available");
      }
    } catch (err) {
      // setError("Failed to fetch diseases");
      console.error("Error fetching diseases:", err);
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

  // Sort the filtered diseases
  const sortedDiseases = [...filteredDiseases].sort((a, b) =>
    sortDirection === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const onTableChange = (pg) => setPagination(pg);

  const goToDisease = (name) =>
    navigate(`/articles?diseases=${encodeURIComponent(name)}`);

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Diseases/Disorders</Text>
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
          onClick={() => goToDisease(text)}
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
      render: (n) => (
        <Text strong style={{ color: themeColor }}>
          {n}
        </Text>
      ),
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Top Stats & Tile */}
      <Row gutter={16} className="mb-6" justify="space-between" align="middle">
        <Col>
          <GoBackButton />
        </Col>
        <Col>
          {topDisease && (
            <Card bordered={false}>
              <Statistic
                title="Most Researched Disease/Disorder"
                value={topDisease?.name}
                suffix={`(${topDisease?.article_count})`}
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
                Diseases/Disorders Database
              </Title>
              <Text type="secondary">
                Showing {filteredDiseases.length} of {diseases.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchDiseases}
                  loading={loading}
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
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <Input
            className="flex-1"
            placeholder="Search diseases..."
            prefix={<SearchOutlined style={{ color: themeColor }} />}
            onChange={handleSearch}
            allowClear
            size="large"
          />
        </div>

        <Divider />

        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
            <div className="mt-4">
              <Text>Loading diseases...</Text>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Text type="danger">{error}</Text>
            <div className="mt-4">
              <Button onClick={fetchDiseases} type="primary">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={sortedDiseases}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showTotal: (t, r) => `${r[0]}-${r[1]} of ${t}`,
                position: ["bottomCenter"],
              }}
              onChange={onTableChange}
              bordered
              scroll={{ x: "max-content" }}
              locale={{
                emptyText: diseases.length === 0 ? 
                  <Empty description="No diseases available in the database yet" /> :
                  <Empty description="No diseases match your criteria" />,
              }}
              rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
            />

           
          </>
        )}
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
          onClick={() => navigate("/methods-of-administration")}
        >
          Explore the Data by Methods of Administration
        </Button>
      </div>
    </div>
  );
};

export default Diseases;
