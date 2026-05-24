import React, { useState, useEffect, useCallback } from "react";
import { Oval } from "react-loader-spinner";

const MHIArticlesSection = () => {
    const [articles, setArticles]     = useState([]);
    const [loading, setLoading]       = useState(false);
    const [search, setSearch]         = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage]             = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 4;

    const fetchArticles = useCallback(async (pageNum, searchTerm) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page:     pageNum,
                pageSize: PAGE_SIZE,
                ...(searchTerm.trim() && { search: searchTerm.trim() }),
            });
            const res  = await fetch(
                `https://molecularhydrogeninstitute.org/wp-json/articles-api/v1/articles?${params}`
            );
            const data = await res.json();
            setArticles(data.items || []);
            setTotalPages(data.totalPages || 1);
            setTotalCount(data.totalCount || 0);
        } catch {
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles(page, search);
    }, [page, search, fetchArticles]);

    const handleSearch = () => {
        setPage(1);
        setSearch(inputValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        window.scrollTo({ top: document.getElementById("mhi-articles-section")?.offsetTop - 100, behavior: "smooth" });
    };

    // Build page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const delta = 2;
        const left  = Math.max(1, page - delta);
        const right = Math.min(totalPages, page + delta);

        if (left > 1)          { pages.push(1); if (left > 2) pages.push("..."); }
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < totalPages) { if (right < totalPages - 1) pages.push("..."); pages.push(totalPages); }

        return pages;
    };

    return (
        <div id="mhi-articles-section" className="bg-gray-50 py-10 mt-10 border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto px-4">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">MHI Articles</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Browse educational articles from the Molecular Hydrogen Institute
                    </p>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search articles..."
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#004c78] transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-5 py-2.5 bg-[#004c78] text-white rounded-lg text-sm font-medium hover:bg-[#003a5c] transition"
                    >
                        Search
                    </button>
                    {search && (
                        <button
                            onClick={() => { setInputValue(""); setSearch(""); setPage(1); }}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Results count */}
                {!loading && (
                    <p className="text-sm text-gray-500 mb-4">
                        {totalCount} article{totalCount !== 1 ? "s" : ""} found
                        {search && <span> for "<strong>{search}</strong>"</span>}
                    </p>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Oval height={45} width={45} color="#004c78" secondaryColor="#004c78" visible />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No articles found.
                    </div>
                ) : (
                    <>
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {articles.map((article) => (
                                <div
                                    key={article.id}
                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                                >
                                    {/* Image */}
                                    {article.featuredImage?.url ? (
                                        <img
                                            src={article.featuredImage.url}
                                            alt={article.title}
                                            className="w-full h-44 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-44 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                            <span className="text-[#004c78] text-4xl font-bold opacity-20">H₂</span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-4 flex flex-col flex-1">

                                        {/* Title */}
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug">
                                            {article.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-xs text-gray-500 line-clamp-3 mb-3 flex-1">
                                            {article.excerpt}
                                        </p>

                                        {/* Categories */}
                                        {article.categories?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {article.categories.map((cat) => (
                                                    <a
                                                        key={cat.id}
                                                    href={`https://molecularhydrogeninstitute.org/category/${cat.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] text-[#004c78] bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 hover:bg-blue-100 transition truncate max-w-full"
                                                    title={cat.name}
                                                    >
                                                {cat.name.length > 30 ? cat.name.slice(0, 30) + "…" : cat.name}
                                                    </a>
                                                    ))}
                                            </div>
                                            )}

                                        {/* Read More */}
                                    <a
                                        href={`https://molecularhydrogeninstitute.org/${article.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-block text-center text-xs font-semibold text-white bg-[#004c78] hover:bg-[#003a5c] rounded-lg px-4 py-2 transition"
                                        >
                                        Read More →
                                    </a>
                                </div>
                                </div>
                                ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-1 mt-8 flex-wrap">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                                >
                                    ← Prev
                                </button>

                                {getPageNumbers().map((p, i) =>
                                    p === "..." ? (
                                        <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => handlePageChange(p)}
                                            className={`px-3 py-1.5 text-sm border rounded-lg transition ${
                                                page === p
                                                    ? "bg-[#004c78] text-white border-[#004c78]"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
</div>
</div>
);
};

export default MHIArticlesSection;
