import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
    saveArticleToFolder,
    removeArticleFromFolder,
    createFolder,
} from '../store/slice/folderSlice.js';

const SaveArticleButton = ({ articleId }) => {
    const dispatch = useDispatch();
    const { userAuth } = useSelector((state) => state.userAuth);
    const { folders, articleFolderMap, saving } = useSelector(state => state.folders);
    const [showModal, setShowModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const savedFolderId = articleFolderMap[articleId];
    const savedFolder = folders.find(f => f.id === savedFolderId);

    const handleSave = (folderId) => {
        dispatch(saveArticleToFolder({ folderId, articleId }));
        setShowModal(false);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (savedFolderId) {
            dispatch(removeArticleFromFolder({ folderId: savedFolderId, articleId }));
        }
    };

    const handleCreateAndSave = async () => {
        if (!newFolderName.trim()) return;
        const result = await dispatch(createFolder(newFolderName.trim()));
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(saveArticleToFolder({ folderId: result.payload.id, articleId }));
        }
        setNewFolderName('');
    };

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (savedFolderId) {
                        handleRemove(e);
                    } else {
                        setShowModal(true);
                    }
                }}
                className="text-gray-500 hover:text-yellow-500 p-1"
                title={savedFolderId ? `Saved in ${savedFolder?.name}` : 'Save to folder'}
            >
                {savedFolderId ? <FaBookmark className="text-[#004C78]" /> : <FaRegBookmark className="text-[#004C78] hover:text-[#003A5C]" />}
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />

                    {/* Modal */}
                    <div
                        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 bg-gradient-to-r from-blue-50 to-white border-b">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-blue-100 text-[#004C78] flex items-center justify-center">
                                        <FaBookmark className="text-lg" />
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                            Save to Folder
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                                            Choose a folder or create a new one.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                    title="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            {userAuth ? (
                                <>
                            {folders.length === 0 && (
                                <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-600">
                                    No folders yet. Create one below.
                                </div>
                            )}

                            {folders.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Your Folders
                                    </p>

                                    <ul className="max-h-60 overflow-y-auto space-y-2 pr-1">
                                        {folders.map((folder) => (
                                            <li
                                                key={folder.id}
                                                className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center hover:bg-blue-50 hover:border-blue-200 transition"
                                            >
                  <span className="text-sm text-gray-700 truncate pr-3">
                    {folder.name}
                  </span>

                                                <button
                                                    type="button"
                                                    onClick={() => handleSave(folder.id)}
                                                    className="text-xs bg-[#0E7490] hover:bg-[#155E75] text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                                                >
                                                    Save
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="border-t pt-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Create New Folder
                                </label>

                                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="New folder name"
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#004C78] shadow-sm text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleCreateAndSave();
                                            }
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={handleCreateAndSave}
                                        disabled={saving}
                                        className="text-sm bg-[#004C78] hover:bg-[#003A5C] text-white px-4 py-2.5 rounded-xl font-semibold disabled:opacity-50 transition-colors"
                                    >
                                        {saving ? "Creating..." : "Create & Save"}
                                    </button>
                                </div>
                            </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-600">
                                        Please login first to save this article.
                                        <a
                                            href={`${import.meta.env.VITE_ADMIN_PANEL_BASE_URL}/login`}
                                            className="px-3 py-1.5 rounded-lg bg-[#004C78] hover:bg-[#003A5C] text-white text-xs shadow-sm transition-colors text-center"
                                        >
                                            Login Now
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SaveArticleButton;
