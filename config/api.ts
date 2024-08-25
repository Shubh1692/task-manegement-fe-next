"use client"
import { Task } from "@/interface/task";
import { toast } from "react-toastify";

class API {
    baseUrl =  '/api/task-management-api/'
    /**
     * This method user for create a wrapper to get api call to add Authorization
     * header for logged in user
     * @param url get api url
     */

    async get(url: string) {
        try {
            const headers = new Headers({});
            const request = await fetch(`${this.baseUrl}${btoa(encodeURIComponent(url))}`, {
                method: 'GET',
                headers,
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else if (!response.success || !response) {
                toast.error(response.message);
                return null;
            }  else {
                toast.error(response?.message || 'Error while calling web service');
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to post api call to
     * add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */

    async post(url: string, body: Task) {
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            const request = await fetch(`${this.baseUrl}${btoa(encodeURIComponent(url))}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else {
                toast.error(response?.message || 'Error while calling web service');
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * This method user for create a wrapper to put api
     * call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */

    async put(url: string, body: Task) {
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            const request = await fetch(`${this.baseUrl}${btoa(encodeURIComponent(url))}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body),
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else {
                toast.error(response?.message || 'Error while calling web service');
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to delete api call to
     * add Authorization header for logged in user
     * @param url get api url
     */

    async delete(url: string) {
        try {
            const headers = new Headers();
            const request = await fetch(`${this.baseUrl}${btoa(encodeURIComponent(url))}`, {
                method: 'Delete',
                headers
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else {
                toast.error(response?.message || 'Error while calling web service');
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default API;
