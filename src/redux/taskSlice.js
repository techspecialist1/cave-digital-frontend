import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/config';

const fetchData = async (url, method = 'GET', body = null, token = null) => {
  console.log(
    'fetchData calling',
    url,
    'method',
    method,
    'body',
    body,
    'token',
    token
  );
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
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};

export const addTask = createAsyncThunk(
  'tasks/add',
  async ({ task, token }) => {
    console.log('addTask calling', task, 'token', token);
    const data = await fetchData(`${BASE_URL}tasks`, 'POST', task, token);
    console.log('asyhere', data);
    return data;
  }
);

export const getAllTasks = createAsyncThunk('tasks/getAll', async (token) => {
  console.log('TT01 getAllTasks token ', token);
  const data = await fetchData(`${BASE_URL}tasks`, null, null, token);
  return data;
});

export const getTaskById = createAsyncThunk(
  'tasks/getById',
  async ({ taskId, JWTToken }) => {
    console.log('TT01 getTaskById calling', taskId, 'token', JWTToken);
    const data = await fetchData(
      `${BASE_URL}tasks/${taskId}`,
      null,
      null,
      JWTToken
    );

    console.log('>>>>>getTaskById response', data);
    return data;
  }
);

export const editTask = createAsyncThunk(
  'tasks/edit',
  async ({ taskId, task, token }) => {
    console.log('editTask calling', taskId, 'token', token);
    const data = await fetchData(
      `${BASE_URL}tasks/${taskId}`,
      'PUT',
      task,
      token
    );
    return data;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (taskId) => {
  await fetchData(`${BASE_URL}tasks/${taskId}`, 'DELETE');
  return taskId;
});

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
        console.log('here1>>>>>>>>>>>>', state.status);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add task';
        console.log('>>>>>>here22222', state.status);
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

      .addCase(editTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        state.error = null;
      })
      .addCase(editTask.rejected, (state, action) => {
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
        console.log('TT01 task by id response', action);
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
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export default taskSlice.reducer;
