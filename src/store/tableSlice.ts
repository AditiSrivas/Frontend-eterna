import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortKey = 'price' | 'change' | 'volume' | 'marketCap' | 'age'
export type SortOrder = 'asc' | 'desc'

export interface TableState {
  sortKey: SortKey
  sortOrder: SortOrder
  activeCategory: 'new' | 'final' | 'migrated'
}

const initialState: TableState = {
  sortKey: 'volume',
  sortOrder: 'desc',
  activeCategory: 'new'
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<{ key: SortKey; order?: SortOrder }>) {
      const { key, order } = action.payload
      if (state.sortKey === key) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortKey = key
        state.sortOrder = order ?? 'desc'
      }
    },
    setCategory(state, action: PayloadAction<TableState['activeCategory']>) {
      state.activeCategory = action.payload
    }
  }
})

export const { setSort, setCategory } = tableSlice.actions
export default tableSlice.reducer


