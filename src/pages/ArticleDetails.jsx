import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import SectionOneNew from '../components/ArticleDetails/SectionOne/SectionOneNew';
import MHIInfoBox from '../components/MHIInfoBox/MHIInfoBox';



const ArticleDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [articleData, setArticleData] = useState(null);
    const [relatedArticleData, setRelatedArticleData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch(`https://api.h2research.org/api/get-article/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch article data');
                }
                const data = await response.json();
                setArticleData(data?.article);
                setRelatedArticleData(data?.related_article);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div  className="flex justify-center items-center min-h-screen bg-white">
                <Oval height={50} width={50} color="#346896" secondaryColor="#346896" visible={true} />
            </div>
        );
    }


    if (error) {
        return (
            <div  className="flex justify-center items-center min-h-screen bg-white">
                <p  className="text-red-500 font-semibold">Error: {error}</p>
            </div>
        );
    }


    return (
        <div  className="bg-white">
            <div  className="max-w-[900px] 1366px:max-w-[1000px] 1440px:max-w-[1200px] 1920px:max-w-[1200px] mx-auto p-4">
                <div  className='mt-16'>
                    <SectionOneNew articleData={articleData} relatedArticleData={relatedArticleData} />
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
