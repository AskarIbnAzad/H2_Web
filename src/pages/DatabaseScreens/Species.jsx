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
  Statistic,
  Row,
  Col,
  Divider,
  Tree,
} from "antd";
import {
  SearchOutlined,
  BranchesOutlined,
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

const Species = () => {
  const [species, setSpecies] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [topSpecies, setTopSpecies] = useState(null);
  const [viewMode, setViewMode] = useState("flat");

  const navigate = useNavigate();
  const themeColor = "#214a78";

  useEffect(() => {
    fetchSpecies();
  }, []);


  const fetchSpecies = async () => {
  setLoading(true);
  setError(null);
  try {
    const { data } = await apiHandle.post("get-public-data-explorer/species");
    if (data.status) {
      // Filter only parent species (where parent_id is null)
      const parentSpeciesOnly = data?.data?.items?.filter(s => s.parent === null);
      console.log("Parent species:", parentSpeciesOnly);

      const loaded = parentSpeciesOnly.map((s) => ({ ...s, key: s.id }));
      setSpecies(loaded);
      setFilteredSpecies(loaded);
      setPagination((p) => ({ ...p, total: loaded.length }));

      // find the most researched species from parent species only
      const top = loaded.reduce((a, b) =>
        a.count > b.count ? a : b
      );
      setTopSpecies(top);
      
      console.log("Parent species loaded:", loaded.length);
      console.log("Total species in API:", data.species.length);
    } else {
      setError("No species available");
    }
  } catch (err) {
    // setError("Failed to fetch species");
    console.error("Error fetching species:", err);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const toggleSort = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const filtered = filteredSpecies
    .filter((s) => s.name.toLowerCase().includes(searchTerm))
    .sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const onTableChange = (pg) => setPagination(pg);

  const goToSpecies = (name) =>
    navigate(`/articles?species=${encodeURIComponent(name)}`);

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Species</Text>
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
          onClick={() => goToSpecies(text)}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Total # of Studies",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
      render: (n) => (
        <Text strong style={{ color: themeColor }}>
          {n}
        </Text>
      ),
    },
  ];

  // for hierarchical view
  const buildTreeData = () =>
    species
      .filter((s) => s.parent_id === null)
      .map((p) => ({
        title: p.name,
        key: `parent-${p.id}`,
        children: species
          .filter(
            (c) =>
              (typeof c.parent_id === "object"
                ? c.parent_id.id
                : c.parent_id) === p.id
          )
          .map((c) => ({ title: c.name, key: `child-${c.id}` })),
      }));

  return (
    <div  className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Top Stats & Tile */}
      <Row gutter={16}  className="mb-6" justify="space-between" align="middle">
        <Col>
          <GoBackButton />
        </Col>
        
        <Col>
          {topSpecies && (
            <Card bordered={false}>
              <Statistic
                title="Most Researched Species"
                value={topSpecies?.name}
                suffix={`(${topSpecies?.count})`}
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
                <BranchesOutlined /> Species Database
              </Title>
              <Text type="secondary">
                Showing {filtered.length} of {species.length}
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchSpecies}
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
        <div  className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <Input
             className="flex-1"
            placeholder="Search species..."
            prefix={<SearchOutlined style={{ color: themeColor }} />}
            onChange={handleSearch}
            allowClear
            size="large"
          />
        </div>

        {error && (
          <Divider>
            <Text type="danger">{error}</Text>
          </Divider>
        )}

        <Spin spinning={loading} tip="Loading species...">
          {viewMode === "flat" ? (
            <Table
              columns={columns}
              dataSource={filtered}
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
                emptyText: (
                  <Empty description="No species match your criteria" />
                ),
              }}
              rowClassName={(_, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
            />
          ) : (
            <Tree
              showLine
              defaultExpandAll
              onSelect={(keys, info) => goToSpecies(info.node.title)}
              treeData={buildTreeData()}
            />
          )}
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
          onClick={() => navigate("/article-type")}
        >
          Explore the Data by Article Type
        </Button>
      </div>
    </div>
  );
};

export default Species;
