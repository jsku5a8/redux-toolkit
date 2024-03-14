import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TodoType } from '../../types';

const url = import.meta.env.VITE_BACKEND_URL;

interface TodoState {
	data: TodoType[];
	loading: boolean;
	error: string | null;
	errorMessage: string | null;
}

const initialState: TodoState = {
	data: [],
	loading: false,
	error: null,
	errorMessage: null
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
	const response = await axios.get(url);
	return response.data;
});

export const createTodo = createAsyncThunk(
	'todo/createTodo',
	async (newTodo: TodoType) => {
		const response = await axios.post(url, newTodo);
		return response.data;
	}
);

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.loading = false;
				state.error = 'Failed to fetch todos.';
				state.errorMessage = action.error.message!;
			});
	}
});

export default todoSlice.reducer;
