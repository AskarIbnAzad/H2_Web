import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Typography,
  Input,
  Tag,
  Space,
  Button,
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
  ExperimentOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  TrophyOutlined,
  InfoCircleOutlined as InfoIcon,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import FeedbackButton from "../../components/FeedbackButton/FeedbackButton";
import ContributeStudyCTA from "../../components/ContributeStudyCTA/ContributeStudyCTA";

const { Title, Text } = Typography;

const ArticleType = () => {
  const [studyTypes, setStudyTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const themeColor = "#214a78";
  const navigate = useNavigate();

  // Study type definitions
 const studyTypeDefinitions = {
    // Primary categories from your system
    "ex vivo": "Studies using tissues or organs removed from their original place but maintained in artificial conditions",
    "in silico": "Computer-based simulations and computational models used to study biological processes",
    "in vitro": "Laboratory-based studies using cells, tissues, or biological molecules outside a living organism",
    "in vivo": "Studies conducted in living organisms including animals and humans",
    "non-experimental": "Observational studies, reviews, and theoretical research without controlled interventions",
    "other": "Studies that don't fit into standard experimental categories or use mixed methodologies",
    
    // Additional common study types
    "clinical": "Studies conducted with human participants in clinical settings",
    "clinical trial": "Controlled studies testing treatments or interventions in human subjects",
    "randomized controlled trial": "Clinical studies where participants are randomly assigned to treatment groups",
    "double-blind": "Studies where neither participants nor researchers know which treatment is being given",
    "placebo-controlled": "Studies that include a control group receiving inactive treatment",
    "systematic review": "Comprehensive analysis of multiple research studies on a specific topic",
    "meta-analysis": "Statistical analysis combining results from multiple independent studies",
    "case study": "Detailed examination of individual cases or small groups",
    "case series": "Collection of case reports involving patients with similar diagnoses or treatments",
    "cohort study": "Observational study following groups over time to assess outcomes",
    "cross-sectional": "Studies examining data from a population at a single point in time",
    "longitudinal": "Studies following subjects over extended periods to track changes",
    "observational": "Studies that observe subjects without intervention or manipulation",
    "experimental": "Studies involving controlled manipulation of variables to test hypotheses",
    "quasi-experimental": "Studies with some experimental elements but lacking full randomization",
    "pilot study": "Small-scale preliminary studies conducted before larger research projects",
    "feasibility study": "Research to determine if a larger study can be conducted successfully",
    "review": "Analysis and summary of existing research literature on a specific topic",
    "narrative review": "Comprehensive but non-systematic review of literature",
    "scoping review": "Broad review to map key concepts and identify research gaps",
    "literature review": "Systematic examination of published research on a particular subject",
    "animal study": "Research conducted using animal models",
    "human study": "Research involving human participants",
    "cell culture": "Studies using cells grown in controlled laboratory conditions",
    "molecular": "Studies focusing on molecular-level biological processes",
    "biochemical": "Research examining chemical processes within living organisms",
    "physiological": "Studies investigating normal functions of living organisms",
    "pathological": "Research focused on disease processes and abnormal conditions",
    "therapeutic": "Studies investigating potential treatments or therapies",
    "diagnostic": "Research focused on methods for identifying diseases or conditions",
    "preventive": "Studies examining methods to prevent disease or health problems",
    "epidemiological": "Studies of disease patterns and health outcomes in populations",
    "comparative": "Studies comparing different treatments, methods, or populations",
    "descriptive": "Studies that describe characteristics of populations or phenomena",
    "analytical": "Studies that analyze relationships between variables",
    "interventional": "Studies involving active intervention or treatment",
    "survey": "Research using questionnaires or interviews to collect data",
    "qualitative": "Studies focusing on non-numerical data and subjective experiences",
    "quantitative": "Studies using numerical data and statistical analysis",
    "mixed methods": "Studies combining both qualitative and quantitative approaches"
  };

  const getStudyTypeDefinition = (name) => {
    const lower = name.toLowerCase();
    for (const [key, definition] of Object.entries(studyTypeDefinitions)) {
      if (lower.includes(key)) {
        return definition;
      }
    }
    return "Research study methodology";
  };

  useEffect(() => {
    fetchStudyTypes();
  }, []);

  const fetchStudyTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const {data} = await apiHandle.post(
        "get-public-data-explorer/studyType"
      );

      console.log("Fetched study types data:", data);

      if (data?.status) {
        const typesData = data?.data?.items?.map((type) => ({
          ...type,
          key: type.id,
          // Mock study count - replace with actual API data when available
          study_count: type?.count,
        }));

        console.log("Processed study types data:", typesData);
        setStudyTypes(typesData);
        setPagination((prev) => ({ ...prev, total: typesData?.length }));
      }
    } catch (err) {
      setError("Failed to fetch study type data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const toggleSortDirection = () => {
    setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
  };

  const getStudyTypeCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("in vivo")) return "in_vivo";
    if (lower.includes("in vitro")) return "in_vitro";
    if (lower.includes("ex vivo")) return "ex_vivo";
    if (lower.includes("in silico")) return "in_silico";
    return "other";
  };

  const filteredStudyTypes = studyTypes?.filter((type) => type.name.toLowerCase().includes(searchTerm))
    .sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const totalCount = studyTypes?.length;
  
  // Find top study type by study count
  const topStudyType = studyTypes?.reduce((prev, current) => 
    (prev.study_count > current.study_count) ? prev : current, 
    studyTypes[0] || { name: "N/A", study_count: 0 }
  );

  const columns = [
    {
      title: (
        <Space>
          <Text strong>Study Type</Text>
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
      render: (name) => {
        let color = "default";
        const lower = name.toLowerCase();
        if (lower.includes("in vivo")) color = "green";
        else if (lower.includes("in vitro")) color = "blue";
        else if (lower.includes("ex vivo")) color = "purple";
        else if (lower.includes("in silico")) color = "cyan";
        else if (
          lower.includes("chemical") ||
          lower.includes("physicochemical")
        )
          color = "orange";
        else if (lower.includes("non-experimental")) color = "gold";

        return (
          <Space>
            <Tag
              color={color}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/articles?studyTypes=${encodeURIComponent(name)}`)
              }
            >
              {name}
            </Tag>
            <Tooltip title={getStudyTypeDefinition(name)}>
              <InfoIcon 
                style={{ 
                  color: themeColor, 
                  cursor: "pointer",
                  fontSize: "14px"
                }} 
              />
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: "# of Studies",
      dataIndex: "study_count",
      key: "study_count",
      width: "150px",
      render: (count) => (
        <Badge 
          count={count} 
          style={{ backgroundColor: themeColor }}
          showZero
        />
      ),
      sorter: (a, b) => a.study_count - b.study_count,
    },
  ];

  return (
    <div  className="max-w-[1200px] mx-auto p-4 md:p-8">
      <Row gutter={16}  className="mb-6 items-center justify-between">
        <Col>
          <GoBackButton onBack={() => navigate(-1)} />
        </Col>
        {/* <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Study Types"
              value={totalCount}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: themeColor }}
            />
          </Card>
        </Col> */}
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Top Study Type"
              value={topStudyType?.name}
              suffix={`(${topStudyType?.study_count})`}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: themeColor, fontSize: "16px" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        bordered={false}
        className="shadow-md rounded-lg pt-4"
        title={
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 pb-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Title level={4} style={{ color: themeColor, margin: 0 }}>
                <ExperimentOutlined /> Browse by Article Type
              </Title>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Explore the different types of research studies included in the database — from in vitro to clinical studies.
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="w-full sm:w-1/2 min-w-[120px]">
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={fetchStudyTypes}
                  className="w-full h-[30px]"
                  style={{ height: "30px", }}
                >
                  Refresh
                </Button>
              </div>
              <div className="w-full sm:w-1/2 flex items-center whitespace-nowrap overflow-visible min-w-[180px]">
                <FeedbackButton style={{ width: "100%", height: "44px", minWidth: "140px" }} />
              </div>
            </div>
          </div>
        }
        extra={null}
      >
        <div  className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <Input
            placeholder="Search study types..."
            prefix={<SearchOutlined style={{ color: themeColor }} />}
            onChange={handleSearch}
            allowClear
            size="large"
             className="w-full md:w-1/2"
          />
        </div>

        {error && (
          <Divider>
            <Text type="danger">{error}</Text>
          </Divider>
        )}

        <Spin spinning={loading} tip="Loading study types...">
          <Table
            columns={columns}
            dataSource={filteredStudyTypes}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} study types`,
              position: ["bottomCenter"],
            }}
            onChange={handleTableChange}
            bordered
            scroll={{ x: "max-content" }}
            locale={{
              emptyText: searchTerm ? (
                <Empty description="No study types match your search criteria" />
              ) : (
                <Empty description="No study types available" />
              ),
            }}
            rowClassName={(r, i) => (i % 2 === 0 ? "bg-gray-50" : "")}
          />
        </Spin>
         {/* Contribute CTA */}
                    <ContributeStudyCTA className="mt-6" />
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
            fontWeight: "600"
          }}
          onClick={() => navigate('/authors-library')}
        >
          Explore Data by Author
        </Button>
      </div>
    </div>
  );
};

export default ArticleType;