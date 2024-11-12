import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filters",
    initialState: {
        uploadDate: null,
        duration: null,
        features: [],
        sortBy: "Relevance"
    },
    reducers: {
        setFilters: (state, action) => {
            const { category, value } = action.payload;
            if (category === 'features') {
                // Toggle feature selection
                if (state.features.includes(value)) {
                    state.features = state.features.filter(f => f !== value);
                } else {
                    state.features.push(value);
                }
            } else {
                // For other categories, just set the value
                state[category] = value;
            }
        },
        clearFilters: (state) => {
            return {
                uploadDate: null,
                duration: null,
                features: [],
                sortBy: "Relevance"
            };
        }
    }
});

export const { setFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;