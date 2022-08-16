import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE} from "../types";

const { REACT_APP_API_URL } = process.env;
const token = localStorage.getItem("token");

export const tasksRequest = () => ({
    type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
    type: TASKS_SUCCESS,
    payload: data,
});

export const tasksFailure = (error) => ({
    type: TASKS_FAILURE,
    payload: error,
});

export const getTasks = (path) => dispatch => {
    dispatch(tasksRequest());

    fetch(`${REACT_APP_API_URL}/task${path}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
    .then((response)  => response.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
}

export const deleteTask = (id) => dispatch => {
    dispatch(tasksRequest());

    fetch(`${REACT_APP_API_URL}/task/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
    .then((response)  => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
}

export const editStatusTask = (data) => dispatch => {
    const statusList = ["NEW", "IN PROGRESS", "FINISHED"];

    const newStatusIndex = statusList.indexOf(data.status) > 1 ? 0 : statusList.indexOf(data.status) + 1

    dispatch(tasksRequest());

    fetch(`${REACT_APP_API_URL}/task/${data._id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task: {
                "title": data.title,
                "importance": data.importance,
                "status": statusList[newStatusIndex],
                "description": data.description,
            },
        }),
    })
    .then((response)  => response.json())
    .then((data) => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
}

export const createTask = (values) => dispatch => {
    dispatch(tasksRequest());

    fetch(`${REACT_APP_API_URL}/task/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task: {
                "title": values.title,
                "importance": values.importance,
                "status": values.status,
                "description": values.description,
            },
        }),
    })
    .then((response)  => response.json())
    .then((data) => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
}