import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Card,
    Typography,
    Tag,
    Button,
    Spin,
    Alert,
    Divider,
    Space,
    Descriptions,
} from "antd";
import {
    ArrowLeftOutlined,
    SkinOutlined,
    FileTextOutlined,
    ExperimentOutlined,
    ApartmentOutlined,
    MedicineBoxOutlined,   // ✅ added for disease tags
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle";

const { Title, Text, Paragraph } = Typography;

const OrganDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [organ, setOrgan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const themeColor = "#214a78";
    const imageBaseUrl = import.meta.env.VITE_APP_IMAGE_URL || "";

    useEffect(() => {
        fetchOrganDetails();
    }, [id]);

    const fetchOrganDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await apiHandle.get(`/organs/${id}`);
            if (data && data.name) {
                setOrgan(data);
            } else {
                setError("Organ not found");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load organ details");
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith("http")) return imagePath;
        return `${imageBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading organ details..." />
            </div>
        );
    }

    if (error || !organ) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <Alert
                    message="Error"
                    description={error || "Organ not found"}
                    type="error"
                    showIcon
                    action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
                />
            </div>
        );
    }

    const systemTags =
        organ.system_relationships &&
        Object.keys(organ.system_relationships).length > 0
            ? Object.entries(organ.system_relationships).map(([system, count]) => (
                <Tag
                    key={system}
                    style={{ borderRadius: 20, padding: "2px 12px" }}
                >
                    {system} ({count})
                </Tag>
            ))
            : null;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <Link
                to="/organs-tissues"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 24,
                    height: 32,
                    padding: "0 16px",
                    backgroundColor: "#fff",
                    border: `1px solid ${themeColor}`,
                    borderRadius: 6,
                    color: themeColor,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    cursor: "pointer",
                }}
            >
                <ArrowLeftOutlined />
                Back to Organs & Tissues
            </Link>

            <Card
                bordered={false}
                className="shadow-lg rounded-2xl overflow-hidden"
                style={{ borderRadius: 24 }}
                bodyStyle={{ padding: 32 }}
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
                    }}
                />

                {/* Header with image / icon */}
                <div className="text-center mb-6">
                    {organ.image ? (
                        <div className="mb-3 flex justify-center">
                            <img
                                src={getImageUrl(organ.image)}
                                alt={organ.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: `3px solid ${themeColor}30`,
                                }}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        </div>
                    ) : (
                        <SkinOutlined
                            style={{ fontSize: 48, color: themeColor, marginBottom: 16 }}
                        />
                    )}
                    <Title level={2} style={{ color: themeColor, marginBottom: 8 }}>
                        {organ.name}
                    </Title>

                    <Space wrap size={[8, 8]} style={{ justifyContent: "center" }}>
                        <Tag
                            icon={<FileTextOutlined />}
                            style={{
                                backgroundColor: `${themeColor}10`,
                                borderColor: `${themeColor}30`,
                                color: themeColor,
                                borderRadius: 20,
                                padding: "4px 16px",
                                fontSize: 14,
                            }}
                        >
                            {organ.article_count || 0} Studies
                        </Tag>

                        {organ.primary_system && (
                            <Tag
                                icon={<ApartmentOutlined />}
                                color="blue"
                                style={{ borderRadius: 20, padding: "4px 16px" }}
                            >
                                {organ.primary_system}
                            </Tag>
                        )}

                        {organ.human_study_occurrences > 0 && (
                            <Tag
                                icon={<ExperimentOutlined />}
                                color="green"
                                style={{ borderRadius: 20, padding: "4px 16px" }}
                            >
                                {organ.human_study_occurrences} Human Studies
                            </Tag>
                        )}

                        <Tag style={{ borderRadius: 20, padding: "4px 16px" }}>
                            Total Occurrences: {organ.total_occurrences || 0}
                        </Tag>
                    </Space>

                    {systemTags && (
                        <div style={{ marginTop: 16 }}>
                            <Text strong style={{ display: "block", marginBottom: 4 }}>
                                System Associations:
                            </Text>
                            <Space wrap>{systemTags}</Space>
                        </div>
                    )}
                </div>

                <Divider />

                {/* Short description */}
                {organ.short_description && (
                    <>
                        <Title level={4}>Summary</Title>
                        <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                            {organ.short_description}
                        </Paragraph>
                        <Divider />
                    </>
                )}

                {/* Full description (HTML) */}
                {organ.description && (
                    <>
                        <Title level={4}>Detailed Information</Title>
                        <div
                            dangerouslySetInnerHTML={{ __html: organ.description }}
                            style={{ lineHeight: 1.7, fontSize: 15 }}
                        />
                        <Divider />
                    </>
                )}

                {/* ✅ NEW SECTION: Related Diseases */}
                {organ.diseases && organ.diseases.length > 0 && (
                    <>
                        <Title level={4} style={{ color: themeColor }}>
                            <MedicineBoxOutlined style={{ marginRight: 8 }} />
                            Related Diseases
                        </Title>
                        <Space wrap>
                            {organ.diseases.map((disease) => (
                                <Link
                                    key={disease.id}
                                    to={`/disease/${disease.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Tag
                                        icon={<MedicineBoxOutlined />}
                                        color="blue"
                                        style={{
                                            padding: "6px 14px",
                                            fontSize: 14,
                                            borderRadius: 20,
                                            cursor: "pointer",
                                            border: `1px solid ${themeColor}40`,
                                        }}
                                    >
                                        {disease.name} ({disease.articles_count || 0})
                                    </Tag>
                                </Link>
                            ))}
                        </Space>
                        <Divider />
                    </>
                )}

                {/* Additional metadata */}
                <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
                    <Descriptions.Item label="Total Studies">
                        {organ.article_count || 0}
                    </Descriptions.Item>
                    <Descriptions.Item label="Human Study Occurrences">
                        {organ.human_study_occurrences || 0}
                    </Descriptions.Item>
                    <Descriptions.Item label="Primary System">
                        {organ.primary_system || "N/A"}
                    </Descriptions.Item>
                </Descriptions>

                {/* View Related Studies button */}
                <div className="mt-8 text-center">
                    <Link
                        to={`/articles?organs=${encodeURIComponent(organ.name)}`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: themeColor,
                            borderColor: themeColor,
                            color: "#fff",
                            borderRadius: 40,
                            height: 48,
                            padding: "0 32px",
                            fontSize: 16,
                            fontWeight: 500,
                            textDecoration: "none",
                            gap: 8,
                        }}
                    >
                        <FileTextOutlined />
                        View All Related Studies
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default OrganDetails;
