import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Card,
    Typography,
    Descriptions,
    Tag,
    Button,
    Space,
    Spin,
    Alert,
    Divider,
    Row,
    Col,
} from "antd";
import {
    ArrowLeftOutlined,
    MedicineBoxOutlined,
    FileTextOutlined,
    TrophyOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle.js";

const { Title, Text, Paragraph } = Typography;

const DiseaseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [disease, setDisease] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const themeColor = "#214a78";

    useEffect(() => {
        fetchDiseaseDetails();
    }, [id]);

    const fetchDiseaseDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await apiHandle.get(`/get-disease/${id}`);
            if (data.status) {
                setDisease(data.disease);
            } else {
                setError("Disease not found");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load disease details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading disease details..." />
            </div>
        );
    }

    if (error || !disease) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <Alert
                    message="Error"
                    description={error || "Disease not found"}
                    type="error"
                    showIcon
                    action={
                        <Button onClick={() => navigate(-1)}>Go Back</Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <Link
                to="/diseases"
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
                Back to Diseases
            </Link>

            <Card
                bordered={false}
                className="shadow-lg rounded-2xl overflow-hidden"
                style={{ borderRadius: 24 }}
                bodyStyle={{ padding: 32 }}
            >
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

                <div className="text-center mb-6">
                    <MedicineBoxOutlined
                        style={{ fontSize: 48, color: themeColor, marginBottom: 16 }}
                    />
                    <Title level={2} style={{ color: themeColor, marginBottom: 8 }}>
                        {disease.name}
                    </Title>
                    <Space>
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
                            {disease.articles_count || 0} Studies
                        </Tag>
                        {disease.parent_id && (
                            <Tag color="default">Sub‑category</Tag>
                        )}
                    </Space>
                </div>

                <Divider />

                {disease.short_description && (
                    <>
                        <Title level={4}>Summary</Title>
                        <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                            {disease.short_description}
                        </Paragraph>
                        <Divider />
                    </>
                )}

                {disease.description && (
                    <>
                        <Title level={4}>Detailed Information</Title>
                        <div
                            dangerouslySetInnerHTML={{ __html: disease.description }}
                            style={{ lineHeight: 1.7, fontSize: 15 }}
                        />
                        <Divider />
                    </>
                )}

                {disease.organs && disease.organs.length > 0 && (
                    <>
                        <Title level={4} style={{ color: themeColor }}>
                            <MedicineBoxOutlined style={{ marginRight: 8 }} />
                            Related Organs &amp; Tissues
                        </Title>
                        <Space wrap>
                            {disease.organs.map((organ) => (
                                <Link
                                    key={organ.id}
                                    to={`/organs-tissues/${organ.id}`}
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
                                        {organ.name} ({organ.articles_count || 0})
                                    </Tag>
                                </Link>
                            ))}
                        </Space>
                        <Divider />
                    </>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to={`/articles?diseases=${encodeURIComponent(disease.name)}`}
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

export default DiseaseDetails;
