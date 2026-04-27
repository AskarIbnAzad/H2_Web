import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {apiHandle} from "../../config/apiHandle/apiHandle.js";

const { Title, Text, Paragraph } = Typography;

const DiseaseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [disease, setDisease] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const themeColor = "#214a78";

    console.log('id', id);

    useEffect(() => {
        fetchDiseaseDetails();
    }, [id]);

    const fetchDiseaseDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // Option 1: Direct API endpoint (recommended)
            const { data } = await apiHandle.get(`/get-disease/${id}`);
            if (data.status) {
                setDisease(data.disease);
                console.log('disease', data.disease);
            } else {
                setError("Disease not found");
            }

            // Option 2: If no single endpoint, fetch all and filter (fallback)
            // const { data } = await apiHandle.post("get-public-data-explorer/diseases");
            // const found = data?.data?.items.find(d => d.id == id);
            // setDisease(found);
        } catch (err) {
            console.error(err);
            setError("Failed to load disease details");
        } finally {
            setLoading(false);
        }
    };

    const goToArticles = () => {
        if (disease?.name) {
            navigate(`/articles?diseases=${encodeURIComponent(disease.name)}`);
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
            {/* Back button */}
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: 24 }}
            >
                Back to Diseases
            </Button>

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

                {/* Header with icon and title */}
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

                {/* Short description */}
                {disease.short_description && (
                    <>
                        <Title level={4}>Summary</Title>
                        <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                            {disease.short_description}
                        </Paragraph>
                        <Divider />
                    </>
                )}

                {/* Full description (HTML allowed) */}
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

                <div className="mt-8 text-center">
                    <Button
                        type="primary"
                        size="large"
                        icon={<FileTextOutlined />}
                        onClick={goToArticles}
                        style={{
                            backgroundColor: themeColor,
                            borderColor: themeColor,
                            borderRadius: 40,
                            height: 48,
                            padding: "0 32px",
                        }}
                    >
                        View All Related Studies
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DiseaseDetails;