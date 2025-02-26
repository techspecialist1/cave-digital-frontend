import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/config';

const fetchData = async (url, method = 'GET', body = null, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Something went wrong');
    }

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};

export const addTask = createAsyncThunk(
  'tasks/add',
  async ({ task, token }) => {
    const data = await fetchData(`${BASE_URL}tasks`, 'POST', task, token);
    return data;
  }
);

export const getAllTasks = createAsyncThunk('tasks/getAll', async (token) => {
  const data = await fetchData(`${BASE_URL}tasks`, null, null, token);
  return data;
});

export const getTaskById = createAsyncThunk(
  'tasks/getById',
  async ({ id, token }) => {
    const data = await fetchData(`${BASE_URL}tasks/${id}`, 'GET', null, token);

    return data;
  }
);

export const editTaskById = createAsyncThunk(
  'tasks/edit',
  async ({ taskId, task, token }) => {
    const data = await fetchData(
      `${BASE_URL}tasks/${taskId}`,
      'PUT',
      task,
      token
    );
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async ({ taskId, token }) => {
    await fetchData(`${BASE_URL}tasks/${taskId}`, 'DELETE', null, token);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add task';
      })

      .addCase(getAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      .addCase(editTaskById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = action.payload;
        state.tasks = updatedTask;
        state.error = null;
      })
      .addCase(editTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to edit task';
      })

      .addCase(getTaskById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const task = action.payload;
        state.tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
        state.error = null;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch task';
      })

      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export default taskSlice.reducer;
