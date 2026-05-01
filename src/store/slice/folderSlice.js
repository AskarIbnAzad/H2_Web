import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiHandle } from '../../config/apiHandle/apiHandle';

// Always fetch with ?with_articles=1 so we can build the articleFolderMap
export const fetchFolders = createAsyncThunk('folders/fetchFolders', async () => {
    const res = await apiHandle.get('folders?with_articles=1');
    return res.data.data; // [{ id, name, article_count, articles: [1,2] }]
});

export const createFolder = createAsyncThunk('folders/createFolder', async (name) => {
    const res = await apiHandle.post('folders', { name });
    return res.data.data;
});

export const deleteFolder = createAsyncThunk('folders/deleteFolder', async (folderId) => {
    await apiHandle.delete(`folders/${folderId}`);
    return folderId;
});

export const saveArticleToFolder = createAsyncThunk(
    'folders/saveArticle',
    async ({ folderId, articleId }) => {
        await apiHandle.post(`folders/${folderId}/articles`, { article_id: articleId });
        return { folderId, articleId };
    }
);

export const removeArticleFromFolder = createAsyncThunk(
    'folders/removeArticle',
    async ({ folderId, articleId }) => {
        await apiHandle.delete(`folders/${folderId}/articles/${articleId}`);
        return { folderId, articleId };
    }
);

const initialState = {
    folders: [],
    articleFolderMap: {},   // articleId -> folderId
    activeFolderId: null,   // set when a folder is clicked
    loading: false,
    saving: false,
    error: null,
};

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setActiveFolder: (state, action) => {
            state.activeFolderId = action.payload;
        },
        clearFolderArticles: (state) => {
            state.activeFolderId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFolders.fulfilled, (state, action) => {
                state.folders = action.payload;
                // Build the map
                const map = {};
                action.payload.forEach(folder => {
                    folder.articles?.forEach(articleId => {
                        map[articleId] = folder.id;
                    });
                });
                state.articleFolderMap = map;
            })
            .addCase(createFolder.fulfilled, (state, action) => {
                state.folders.push({ ...action.payload, article_count: 0, articles: [] });
            })
            .addCase(deleteFolder.fulfilled, (state, action) => {
                state.folders = state.folders.filter(f => f.id !== action.payload);
                // Remove articles from map that belonged to this folder
                for (const [articleId, folderId] of Object.entries(state.articleFolderMap)) {
                    if (folderId === action.payload) delete state.articleFolderMap[articleId];
                }
            })
            .addCase(saveArticleToFolder.pending, (state) => { state.saving = true; })
            .addCase(saveArticleToFolder.fulfilled, (state, action) => {
                state.saving = false;
                const { folderId, articleId } = action.payload;
                // Move from old folder
                const oldFolderId = state.articleFolderMap[articleId];
                if (oldFolderId) {
                    const oldFolder = state.folders.find(f => f.id === oldFolderId);
                    if (oldFolder) {
                        oldFolder.article_count = Math.max(0, (oldFolder.article_count || 1) - 1);
                        oldFolder.articles = oldFolder.articles?.filter(id => id !== articleId);
                    }
                }
                state.articleFolderMap[articleId] = folderId;
                const folder = state.folders.find(f => f.id === folderId);
                if (folder) {
                    folder.article_count = (folder.article_count || 0) + 1;
                    if (folder.articles) folder.articles.push(articleId);
                    else folder.articles = [articleId];
                }
            })
            .addCase(removeArticleFromFolder.fulfilled, (state, action) => {
                const { folderId, articleId } = action.payload;
                delete state.articleFolderMap[articleId];
                const folder = state.folders.find(f => f.id === folderId);
                if (folder) {
                    folder.article_count = Math.max(0, (folder.article_count || 1) - 1);
                    folder.articles = folder.articles?.filter(id => id !== articleId);
                }
            });
    },
});

export const { setActiveFolder, clearFolderArticles } = folderSlice.actions;
export default folderSlice.reducer;
