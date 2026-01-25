// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import {
//     FiChevronLeft,
//     FiChevronRight,
//     FiZoomIn,
//     FiZoomOut,
//     FiSearch,
//     FiX,
//     FiMaximize,
//     FiMinimize,
//     FiFileText,
//     FiSidebar
// } from 'react-icons/fi';
// import { debounce } from 'lodash';
// import { useHotkeys } from 'react-hotkeys-hook';
// import { Oval } from 'react-loader-spinner';
// import { useParams } from 'react-router-dom';
// import { apiHandle } from "../../config/apiHandle/apiHandle";


// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export const PdfViewer = () => {

//     const { mhid } = useParams();
//     const [state, setState] = useState({
//         url: '',
//         numPages: 0,
//         currentPage: 1,
//         scale: 1,
//         searchQuery: '',
//         searchResults: [],
//         activeResult: 0,
//         showThumbnails: true,
//         showSearch: false,
//         fullscreen: false,
//         loading: true,
//         error: null,
//         rotation: 0
//     });

//     const containerRef = useRef(null);
//     const searchInputRef = useRef(null);

//     // Fetch PDF document
//     useEffect(() => {
//         try {
//             setState(prev => ({ ...prev, loading: true, error: null }));

//             const response = apiHandle.get(`/get-article/${mhid}`);
//             response.then((res) => {
//                 const pdfUrl = res?.data?.article?.publicData?.pdf_url[0]?.name;
//                 if (!pdfUrl) throw new Error('Document not found');
//                 setState(prev => ({
//                     ...prev,
//                     url: pdfUrl,
//                     loading: false
//                 }));


//             }).catch((error) => {
//                 setState(prev => ({
//                     ...prev,
//                     loading: false,
//                     error: error.message || 'Failed to load document'
//                 }));
//             })




//         } catch (error) {
//             setState(prev => ({
//                 ...prev,
//                 loading: false,
//                 error: error.message || 'Failed to load document'
//             }));
//         }
//     }, [])


//     // Document handlers
//     const handleLoadSuccess = ({ numPages }) => {
//         setState(prev => ({ ...prev, numPages }));
//     };

//     const handlePageChange = (newPage) => {
//         setState(prev => ({
//             ...prev,
//             currentPage: Math.max(1, Math.min(prev.numPages, newPage))
//         }));
//     };

//     // Zoom controls
//     const handleZoom = (direction) => {
//         setState(prev => ({
//             ...prev,
//             scale: Math.max(0.5, Math.min(3,
//                 direction === 'in' ? prev.scale * 1.2 : prev.scale / 1.2
//             ))
//         }));
//     };

//     // Search implementation
//     const handleSearch = useCallback(debounce(async (query) => {
//         if (!query || !state.url) return;

//         const pdf = await pdfjs.getDocument(state.url).promise;
//         const results = [];

//         for (let i = 1; i <= state.numPages; i++) {
//             const page = await pdf.getPage(i);
//             const content = await page.getTextContent();

//             content.items.forEach((item, index) => {
//                 if (item.str.toLowerCase().includes(query.toLowerCase())) {
//                     results.push({
//                         page: i,
//                         text: item.str,
//                         index,
//                         rect: item.transform
//                     });
//                 }
//             });
//         }

//         setState(prev => ({
//             ...prev,
//             searchResults: results,
//             activeResult: 0
//         }));
//     }, 500), [state.url, state.numPages]);

//     // Fullscreen toggle
//     const toggleFullscreen = () => {
//         if (!document.fullscreenElement) {
//             containerRef.current.requestFullscreen();
//             setState(prev => ({ ...prev, fullscreen: true }));
//         } else {
//             document.exitFullscreen();
//             setState(prev => ({ ...prev, fullscreen: false }));
//         }
//     };

//     // Keyboard shortcuts
//     useHotkeys('left', () => handlePageChange(state.currentPage - 1));
//     useHotkeys('right', () => handlePageChange(state.currentPage + 1));
//     // useHotkeys('ctrl+f, cmd+f', (e) => {
//     //     e.preventDefault();
//     //     setState(prev => ({ ...prev, showSearch: true }));
//     //     searchInputRef.current?.focus();
//     // });
//     useHotkeys('esc', () => {
//         if (state.fullscreen) toggleFullscreen();
//         if (state.showSearch) setState(prev => ({ ...prev, showSearch: false }));
//     });

//     // Thumbnail navigation
//     const ThumbnailsPanel = () => (
//         <div  className="w-48 bg-white border-r border-gray-200 overflow-y-auto p-4">
//             {Array.from({ length: state.numPages }, (_, i) => (
//                 <div
//                     key={i}
//                      className={`mb-4 cursor-pointer border-2 ${i + 1 === state.currentPage
//                         ? 'border-blue-500 shadow-md'
//                         : 'border-transparent hover:border-gray-200'
//                         } rounded-lg overflow-hidden transition-all`}
//                     onClick={() => handlePageChange(i + 1)}
//                 >
//                     <Document file={state.url}>
//                         <Page
//                             pageNumber={i + 1}
//                             width={120}
//                             renderAnnotationLayer={false}
//                             renderTextLayer={false}
//                         />
//                     </Document>
//                     <div  className="text-center text-sm text-gray-600 mt-1">Page {i + 1}</div>
//                 </div>
//             ))}
//         </div>
//     );

   
//     const Toolbar = () => (
//         <div  className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
//             <div  className="flex items-center space-x-4">
//                 <button
//                     onClick={() => setState(prev => ({ ...prev, showThumbnails: !prev.showThumbnails }))}
//                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                     <FiSidebar  className="w-5 h-5 text-gray-700" />
//                 </button>

//                 <div  className="flex items-center space-x-2">
//                     <button
//                         onClick={() => handlePageChange(state.currentPage - 1)}
//                         disabled={state.currentPage <= 1}
//                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                         <FiChevronLeft  className="w-5 h-5 text-gray-700" />
//                     </button>

//                     <input
//                         type="number"
//                         value={state.currentPage}
//                         onChange={(e) => handlePageChange(parseInt(e.target.value))}
//                          className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         min="1"
//                         max={state.numPages}
//                     />

//                     <span  className="text-gray-600">of {state.numPages}</span>

//                     <button
//                         onClick={() => handlePageChange(state.currentPage + 1)}
//                         disabled={state.currentPage >= state.numPages}
//                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                         <FiChevronRight  className="w-5 h-5 text-gray-700" />
//                     </button>
//                 </div>
//             </div>

//             <div  className="flex items-center space-x-4">
//                 <div  className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
//                     <button
//                         onClick={() => handleZoom('out')}
//                         disabled={state.scale <= 0.5}
//                          className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-colors"
//                     >
//                         <FiZoomOut  className="w-5 h-5 text-gray-700" />
//                     </button>
//                     <span  className="text-gray-700">{Math.round(state.scale * 100)}%</span>
//                     <button
//                         onClick={() => handleZoom('in')}
//                         disabled={state.scale >= 3}
//                          className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-colors"
//                     >
//                         <FiZoomIn  className="w-5 h-5 text-gray-700" />
//                     </button>
//                 </div>

//                 <div  className="flex items-center space-x-2">
//                     <button
//                         onClick={toggleFullscreen}
//                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     >
//                         {state.fullscreen ? (
//                             <FiMinimize  className="w-5 h-5 text-gray-700" />
//                         ) : (
//                             <FiMaximize  className="w-5 h-5 text-gray-700" />
//                         )}
//                     </button>
//                     {/* <button
//                         onClick={() => setState(prev => ({ ...prev, showSearch: true }))}
//                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     >
//                         <FiSearch  className="w-5 h-5 text-gray-700" />
//                     </button> */}
//                 </div>
//             </div>
//         </div>
//     );

//     // Loading state
//     if (state.loading) {
//         return (
//             <div  className="flex flex-col items-center justify-center h-screen space-y-4">
//                 <Oval
//                     height={60}
//                     width={60}
//                     color="#3b82f6"
//                     secondaryColor="#e5e7eb"
//                     strokeWidth={4}
//                     strokeWidthSecondary={4}
//                 />
//                 <p  className="text-gray-600 text-lg">Loading document...</p>
//             </div>
//         );
//     }

//     // Error state
//     if (state.error) {
//         return (
//             <div  className="flex flex-col items-center justify-center h-screen space-y-4">
//                 <div  className="text-red-500 text-4xl">⚠️</div>
//                 <h2  className="text-xl font-semibold text-gray-800">Document unavailable</h2>
//                 <p  className="text-gray-600 max-w-md text-center">{state.error}</p>
//             </div>
//         );
//     }

//     return (
//         <div
//              className={`flex flex-col max-h-screen mb-5 relative bg-gray-50 ${state.fullscreen ? 'fixed inset-0 z-50' : ''
//                 }`}
//             ref={containerRef}
//         >
//             <Toolbar />

//             {/* {state.showSearch && <SearchPanel />} */}

//             <div  className="flex flex-1 overflow-hidden">
//                 {state.showThumbnails && <ThumbnailsPanel />}

//                 <div  className="flex-1 overflow-auto p-4">
//                     {state.url && <Document
//                         file={state.url}
//                         onLoadSuccess={handleLoadSuccess}
//                         onLoadError={(error) =>

//                         }
//                         loading={
//                             <div  className="flex justify-center items-center h-full">
//                                 <Oval
//                                     height={40}
//                                     width={40}
//                                     color="#3b82f6"
//                                     secondaryColor="#e5e7eb"
//                                     strokeWidth={4}
//                                 />
//                             </div>
//                         }
//                     >
//                         <Page
//                             pageNumber={state.currentPage}
//                             scale={state.scale}
//                             rotate={state.rotation}
//                             loading={
//                                 <div  className="flex justify-center items-center h-full">
//                                     <Oval
//                                         height={30}
//                                         width={30}
//                                         color="#3b82f6"
//                                         secondaryColor="#e5e7eb"
//                                         strokeWidth={4}
//                                     />
//                                 </div>
//                             }
//                              className="bg-white shadow-lg mx-auto"
//                             renderAnnotationLayer={true}
//                             renderTextLayer={true}
//                         />
//                     </Document>}
//                 </div>
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
    FiChevronLeft,
    FiChevronRight,
    FiZoomIn,
    FiZoomOut,
    FiSearch,
    FiX,
    FiMaximize,
    FiMinimize,
    FiFileText,
    FiSidebar,
    FiDownload,
    FiRotateCw,
    FiPrinter,
    FiBookmark
} from 'react-icons/fi';
import { debounce } from 'lodash';
import { useHotkeys } from 'react-hotkeys-hook';
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { apiHandle } from "../../config/apiHandle/apiHandle";

// Set worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = () => {
    const { mhid } = useParams();
    const [state, setState] = useState({
        url: '',
        numPages: 0,
        currentPage: 1,
        scale: 1,
        searchQuery: '',
        searchResults: [],
        activeResult: 0,
        showThumbnails: true,
        showSearch: false,
        fullscreen: false,
        loading: true,
        error: null,
        rotation: 0,
        bookmarks: [],
        isToolbarVisible: true,
        pdfTitle: 'Document'
    });

    const containerRef = useRef(null);
    const searchInputRef = useRef(null);
    const documentRef = useRef(null);
    const pageRef = useRef(null);

    // Fetch PDF document
    useEffect(() => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const response = apiHandle.get(`/get-article/${mhid}`);
            response.then((res) => {
                const pdfUrl = res?.data?.article?.publicData?.pdf_url[0]?.name;
                const pdfTitle = res?.data?.article?.title || 'Document';
                
                if (!pdfUrl) throw new Error('Document not found');
                
                setState(prev => ({
                    ...prev,
                    url: pdfUrl,
                    pdfTitle,
                    loading: false
                }));
            }).catch((error) => {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message || 'Failed to load document'
                }));
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Failed to load document'
            }));
        }
    }, [mhid]);

    // Document handlers
    const handleLoadSuccess = ({ numPages }) => {
        setState(prev => ({ ...prev, numPages, loading: false }));
    };

    const handlePageChange = (newPage) => {
        setState(prev => ({
            ...prev,
            currentPage: Math.max(1, Math.min(prev.numPages, newPage))
        }));
        
        // Smooth scroll to top when changing pages
        if (documentRef.current) {
            documentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Zoom controls with smooth transitions
    const handleZoom = (direction) => {
        setState(prev => ({
            ...prev,
            scale: Math.max(0.5, Math.min(3,
                direction === 'in' ? prev.scale * 1.2 : prev.scale / 1.2
            ))
        }));
    };

    // Rotation handler
    const handleRotate = () => {
        setState(prev => ({
            ...prev,
            rotation: (prev.rotation + 90) % 360
        }));
    };

    // Bookmark functionality
    const toggleBookmark = () => {
        setState(prev => {
            const currentBookmarks = [...prev.bookmarks];
            const pageIndex = currentBookmarks.indexOf(prev.currentPage);
            
            if (pageIndex === -1) {
                currentBookmarks.push(prev.currentPage);
            } else {
                currentBookmarks.splice(pageIndex, 1);
            }
            
            return { ...prev, bookmarks: currentBookmarks };
        });
    };

    const isCurrentPageBookmarked = state.bookmarks.includes(state.currentPage);

    // Advanced search implementation
    const handleSearch = useCallback(debounce(async (query) => {
        if (!query || !state.url) return;

        setState(prev => ({ ...prev, searching: true }));
        
        try {
            const pdf = await pdfjs.getDocument(state.url).promise;
            const results = [];

            for (let i = 1; i <= state.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();

                content.items.forEach((item, index) => {
                    if (item.str.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            page: i,
                            text: item.str,
                            index,
                            rect: item.transform
                        });
                    }
                });
            }

            setState(prev => ({
                ...prev,
                searchResults: results,
                activeResult: 0,
                searching: false
            }));
            
            // Auto-navigate to first result
            if (results.length > 0) {
                handlePageChange(results[0].page);
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                searching: false,
                searchError: error.message
            }));
        }
    }, 500), [state.url, state.numPages]);

    // Navigation to next/previous search result
    const navigateSearchResults = (direction) => {
        if (state.searchResults.length === 0) return;
        
        setState(prev => {
            const newActiveResult = direction === 'next'
                ? (prev.activeResult + 1) % prev.searchResults.length
                : (prev.activeResult - 1 + prev.searchResults.length) % prev.searchResults.length;
                
            const targetPage = prev.searchResults[newActiveResult].page;
            
            // Change page if needed
            if (targetPage !== prev.currentPage) {
                handlePageChange(targetPage);
            }
            
            return {
                ...prev,
                activeResult: newActiveResult
            };
        });
    };

    // Fullscreen toggle with improved handling
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
            });
            setState(prev => ({ ...prev, fullscreen: true }));
        } else {
            document.exitFullscreen();
            setState(prev => ({ ...prev, fullscreen: false }));
        }
    };

    

    // Download functionality
    // const handleDownload = () => {
    //     if (state.url) {
    //         const link = document.createElement('a');
    //         link.href = state.url;
    //         link.download = `${state.pdfTitle || 'document'}.pdf`;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // };

    // Auto-hide toolbar when scrolling
    useEffect(() => {
        let timeout;
        const handleScroll = () => {
            setState(prev => ({ ...prev, isToolbarVisible: false }));
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setState(prev => ({ ...prev, isToolbarVisible: true }));
            }, 1500);
        };
        
        const scrollContainer = documentRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            
            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
                clearTimeout(timeout);
            };
        }
    }, [documentRef.current]);

    // Keyboard shortcuts with improved handling
    useHotkeys('left', () => handlePageChange(state.currentPage - 1), [state.currentPage]);
    useHotkeys('right', () => handlePageChange(state.currentPage + 1), [state.currentPage]);
    useHotkeys('ctrl+f, cmd+f', (e) => {
        e.preventDefault();
        setState(prev => ({ ...prev, showSearch: true }));
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }, []);
    useHotkeys('esc', () => {
        if (state.fullscreen) toggleFullscreen();
        if (state.showSearch) setState(prev => ({ ...prev, showSearch: false }));
    }, [state.fullscreen, state.showSearch]);
    useHotkeys('ctrl+=, cmd+=', (e) => {
        e.preventDefault();
        handleZoom('in');
    }, []);
    useHotkeys('ctrl+-, cmd+-', (e) => {
        e.preventDefault();
        handleZoom('out');
    }, []);

    // Thumbnails panel with improved rendering
    const ThumbnailsPanel = () => (
        <div  className="w-52 bg-white border-r border-gray-200 overflow-y-auto p-4 shadow-md transition-all">
            <h3  className="text-gray-700 font-medium mb-4 flex items-center">
                <FiFileText  className="mr-2" /> Pages
            </h3>
            
            <div  className="space-y-4">
                {state.bookmarks.length > 0 && (
                    <div  className="mb-6">
                        <h4  className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <FiBookmark  className="mr-1 text-blue-500" /> Bookmarks
                        </h4>
                        <div  className="space-y-2">
                            {state.bookmarks.map(pageNum => (
                                <div 
                                    key={`bookmark-${pageNum}`}
                                     className="flex items-center text-sm py-1 px-2 rounded cursor-pointer hover:bg-blue-50 text-blue-600"
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    Page {pageNum}
                                </div>
                            ))}
                        </div>
                        <hr  className="my-3 border-gray-200" />
                    </div>
                )}
                
                {Array.from({ length: state.numPages }, (_, i) => (
                    <div
                        key={i}
                         className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
                            i + 1 === state.currentPage
                                ? 'border-blue-500 shadow-md'
                                : 'border-transparent hover:border-gray-300'
                        } ${state.bookmarks.includes(i + 1) ? 'ring-2 ring-blue-200' : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        <div  className="relative">
                            <Document file={state.url}>
                                <Page
                                    pageNumber={i + 1}
                                    width={135}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    loading={
                                        <div  className="h-40 flex justify-center items-center bg-gray-50">
                                            <div  className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                        </div>
                                    }
                                />
                            </Document>
                            {state.bookmarks.includes(i + 1) && (
                                <div  className="absolute top-1 right-1">
                                    <FiBookmark  className="text-blue-500 drop-shadow-md" />
                                </div>
                            )}
                        </div>
                        <div  className="text-center text-sm py-1 bg-gray-50 text-gray-700">
                            Page {i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Search panel with improved styling and features
    const SearchPanel = () => (
        <div  className="absolute top-16 right-4 w-96 bg-white rounded-lg shadow-xl z-10 overflow-hidden transition-all transform origin-top-right">
            <div  className="p-4 border-b border-gray-200">
                <div  className="flex items-center">
                    <div  className="relative flex-1">
                        <div  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch  className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={state.searchQuery}
                            onChange={(e) => {
                                setState(prev => ({ ...prev, searchQuery: e.target.value }));
                                handleSearch(e.target.value);
                            }}
                             className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search in document..."
                        />
                        {state.searchQuery && (
                            <div  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    onClick={() => {
                                        setState(prev => ({ ...prev, searchQuery: '', searchResults: [] }));
                                    }}
                                     className="text-gray-400 hover:text-gray-600"
                                >
                                    <FiX  className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setState(prev => ({ ...prev, showSearch: false }))}
                         className="ml-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                        <FiX  className="h-5 w-5" />
                    </button>
                </div>
            </div>
            
            <div  className="max-h-80 overflow-y-auto p-1">
                {state.searching ? (
                    <div  className="flex justify-center items-center py-8">
                        <Oval
                            height={30}
                            width={30}
                            color="#3b82f6"
                            secondaryColor="#e5e7eb"
                            strokeWidth={4}
                        />
                        <span  className="ml-3 text-gray-600">Searching...</span>
                    </div>
                ) : state.searchResults.length > 0 ? (
                    <div>
                        <div  className="px-4 py-2 text-sm text-gray-500">
                            {state.searchResults.length} {state.searchResults.length === 1 ? 'result' : 'results'}
                        </div>
                        {state.searchResults.map((result, index) => (
                            <div
                                key={index}
                                 className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                                    index === state.activeResult ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                                onClick={() => {
                                    setState(prev => ({ ...prev, activeResult: index }));
                                    handlePageChange(result.page);
                                }}
                            >
                                <div  className="text-sm font-medium text-gray-700">Page {result.page}</div>
                                <div  className="text-sm text-gray-600">
                                    {result.text.length > 60
                                        ? `...${result.text.substring(0, 60)}...`
                                        : result.text}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : state.searchQuery ? (
                    <div  className="px-4 py-8 text-center text-gray-500">
                        No results found for "{state.searchQuery}"
                    </div>
                ) : (
                    <div  className="px-4 py-8 text-center text-gray-500">
                        Enter a search term to find in the document
                    </div>
                )}
            </div>
            
            {state.searchResults.length > 0 && (
                <div  className="p-2 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={() => navigateSearchResults('prev')}
                         className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                        <FiChevronLeft />
                    </button>
                    <div  className="text-sm text-gray-600 flex items-center">
                        {state.activeResult + 1} of {state.searchResults.length}
                    </div>
                    <button
                        onClick={() => navigateSearchResults('next')}
                         className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            )}
        </div>
    );

    // Main toolbar with improved styling and animations
    const Toolbar = () => (
        <div 
             className={`flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm transition-opacity duration-300 ${
                state.isToolbarVisible ? 'opacity-100' : 'opacity-0'
            } sticky top-0 z-10`}
        >
            <div  className="flex items-center space-x-3">
                <button
                    onClick={() => setState(prev => ({ ...prev, showThumbnails: !prev.showThumbnails }))}
                     className={`p-2 rounded-lg transition-colors ${
                        state.showThumbnails ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    title="Toggle thumbnails"
                >
                    <FiSidebar  className="w-5 h-5" />
                </button>

                <div  className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <button
                        onClick={() => handlePageChange(state.currentPage - 1)}
                        disabled={state.currentPage <= 1}
                         className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Previous page"
                    >
                        <FiChevronLeft  className="w-5 h-5 text-gray-700" />
                    </button>

                    <div  className="flex items-center">
                        <input
                            type="number"
                            value={state.currentPage}
                            onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                             className="w-14 px-2 py-1 border-0 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            min="1"
                            max={state.numPages}
                        />
                        <span  className="text-gray-600 pr-2">/ {state.numPages}</span>
                    </div>

                    <button
                        onClick={() => handlePageChange(state.currentPage + 1)}
                        disabled={state.currentPage >= state.numPages}
                         className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Next page"
                    >
                        <FiChevronRight  className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            <div  className="hidden md:block">
                <div  className="text-lg font-medium text-gray-700 truncate max-w-md">
                    {state.pdfTitle}
                </div>
            </div>

            <div  className="flex items-center space-x-2">
                <div  className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <button
                        onClick={() => handleZoom('out')}
                        disabled={state.scale <= 0.5}
                         className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 transition-colors"
                        title="Zoom out"
                    >
                        <FiZoomOut  className="w-5 h-5 text-gray-700" />
                    </button>
                    <span  className="text-gray-700 px-2">{Math.round(state.scale * 100)}%</span>
                    <button
                        onClick={() => handleZoom('in')}
                        disabled={state.scale >= 3}
                         className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 transition-colors"
                        title="Zoom in"
                    >
                        <FiZoomIn  className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                <div  className="flex items-center space-x-1">
                    <button
                        onClick={handleRotate}
                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Rotate page"
                    >
                        <FiRotateCw  className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    <button
                        onClick={toggleBookmark}
                         className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                            isCurrentPageBookmarked ? 'text-blue-500' : 'text-gray-700'
                        }`}
                        title={isCurrentPageBookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                        <FiBookmark  className="w-5 h-5" />
                    </button>
                    
                    <button
                        onClick={() => setState(prev => ({ ...prev, showSearch: !prev.showSearch }))}
                         className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                            state.showSearch ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                        title="Search document"
                    >
                        <FiSearch  className="w-5 h-5" />
                    </button>
                    
                    {/* <button
                        onClick={handlePrint}
                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Print document"
                    >
                        <FiPrinter  className="w-5 h-5 text-gray-700" />
                    </button> */}
                    
                    {/* <button
                        onClick={handleDownload}
                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download document"
                    >
                        <FiDownload  className="w-5 h-5 text-gray-700" />
                    </button> */}
                    
                    <button
                        onClick={toggleFullscreen}
                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={state.fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {state.fullscreen ? (
                            <FiMinimize  className="w-5 h-5 text-gray-700" />
                        ) : (
                            <FiMaximize  className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    // Loading state with improved animation
    if (state.loading) {
        return (
            <div  className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-50">
                <div  className="relative w-20 h-20">
                    <div  className="absolute inset-0 flex items-center justify-center">
                        <Oval
                            height={60}
                            width={60}
                            color="#3b82f6"
                            secondaryColor="#e5e7eb"
                            strokeWidth={4}
                            strokeWidthSecondary={4}
                        />
                    </div>
                    <div  className="absolute inset-0 flex items-center justify-center">
                        <FiFileText  className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <p  className="text-gray-600 text-lg font-medium">Loading document...</p>
                <p  className="text-gray-500 text-sm">This may take a moment</p>
            </div>
        );
    }

    // Error state with better visual feedback
    if (state.error) {
        return (
            <div  className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-50 px-4">
                <div  className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100 text-red-500 animate-pulse">
                    <FiX  className="w-10 h-10" />
                </div>
                <h2  className="text-2xl font-semibold text-gray-800">Document unavailable</h2>
                <p  className="text-gray-600 max-w-md text-center">{state.error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div
             className={`flex flex-col h-screen relative bg-gray-50 ${
                state.fullscreen ? 'fixed inset-0 z-50' : ''
            }`}
            ref={containerRef}
        >
            {/* <Toolbar /> */}

            {/* {state.showSearch && <SearchPanel />} */}

            <div  className="flex flex-1 overflow-hidden">
                {/* {state.showThumbnails && <ThumbnailsPanel />} */}

                <div 
                    ref={documentRef}
                     className="flex-1 overflow-auto  bg-gray-100"
                >
                    <iframe
                src={state.url}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="PDF Viewer"
            />
                    {/* <div  className="flex justify-center">
                        {state.url && 
                            <Document
                                file={state.url}
                                onLoadSuccess={handleLoadSuccess}
                                onLoadError={(error) => {
                                    setState(prev => ({
                                        ...prev, 
                                        error: 'Failed to load PDF. The document may be corrupted or unavailable.'
                                    }));
                                }}
                                loading={
                                    <div  className="flex justify-center items-center h-96">
                                        <Oval
                                            height={40}
                                            width={40}
                                            color="#3b82f6"
                                            secondaryColor="#e5e7eb"
                                            strokeWidth={4}
                                        />
                                    </div>
                                }
                                 className="pdf-document"
                            >
                                <Page
                                    pageNumber={state.currentPage}
                                    scale={state.scale}
                                    rotate={state.rotation}
                                    inputRef={pageRef}
                                    loading={
                                        <div  className="flex justify-center items-center h-96 w-full bg-white shadow-md rounded-lg">
                                            <Oval
                                                height={30}
                                                width={30}
                                                color="#3b82f6"
                                                secondaryColor="#e5e7eb"
                                                strokeWidth={4}
                                            />
                                        </div>
                                    }
                                     className="bg-white shadow-lg rounded-lg transition-all duration-300"
                                    renderAnnotationLayer={true}
                                    renderTextLayer={true}
                                />
                            </Document>
                        }
                    </div> */}
                </div>
            </div>
            
            {/* Mobile floating navigation buttons */}
            <div  className="md:hidden fixed bottom-6 right-6 flex flex-col space-y-2">
                <div  className="bg-white rounded-full shadow-lg flex">
                    <button
                        onClick={() => handlePageChange(state.currentPage - 1)}
                        disabled={state.currentPage <= 1}
                         className="p-3 bg-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <FiChevronLeft  className="w-6 h-6 text-blue-600" />
                    </button>
                    <div  className="py-3 px-4 bg-white text-gray-700 font-medium">{state.currentPage}</div>
                    <button
                        onClick={() => handlePageChange(state.currentPage + 1)}
                        disabled={state.currentPage >= state.numPages}
                         className="p-3 bg-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <FiChevronRight  className="w-6 h-6 text-blue-600" />
                    </button>
                </div>
            </div>

            {/* Keyboard shortcuts help - hidden by default */}
            {state.showShortcutsHelp && (
                <div  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div  className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3  className="text-lg font-medium text-gray-900 mb-4">Keyboard Shortcuts</h3>
                        <div  className="space-y-2">
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Previous Page</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">←</span>
                            </div>
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Next Page</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">→</span>
                            </div>
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Search</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Ctrl+F</span>
                            </div>
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Zoom In</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Ctrl++</span>
                            </div>
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Zoom Out</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Ctrl+-</span>
                            </div>
                            <div  className="flex justify-between">
                                <span  className="text-gray-600">Exit Fullscreen/Search</span>
                                <span  className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">Esc</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setState(prev => ({ ...prev, showShortcutsHelp: false }))}
                             className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};