import { EventEmitter } from 'fbemitter'
import Axios from 'axios'

class EntitiesStore {
    constructor() {
        this.data = [];
        this.videos = [];
        this.axios = Axios.create();
        this.emitter = new EventEmitter();
    }

    async getLists() {
        this.axios.get("/api/lists").then((response) => {
            this.data = response.data;
            console.log(this.data)
            this.emitter.emit("GET_LISTS_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("GET_LISTS_FAILED");
        })
    }

    async getListsAsc() {
        this.axios.get("/api/lists/asc").then((response) => {
            this.data = response.data;
            console.log(this.data)
            this.emitter.emit("GET_LISTS_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("GET_LISTS_FAILED");
        })
    }

    async addList(list) {
        this.axios.post("/api/lists", list).then((response) => {
            this.emitter.emit("INSERT_LIST_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("INSERT_LIST_FAILED");
        })
    }

    async updateList(list, id) {
        this.axios.put(`/api/lists/${id}`, list).then((response) => {
            this.emitter.emit("UPDATE_LIST_SUCCESS");
            this.getLists();
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("UPDATE_LIST_FAILED");
        })
    }

    async deleteList(id){
        this.axios.delete(`/api/lists/${id}`).then((response) => {
            this.emitter.emit("DELETE_LIST_SUCCESS");
            this.getLists();
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("DELETE_LIST_FAILED");
        })
    }

    async getVideosFromList(id){
        this.axios.get(`/api/videos/${id}`).then((response) => {
            this.videos = response.data;
            console.log(this.data)
            this.emitter.emit("GET_VIDEOS_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("GET_VIDEOS_FAILED");
        })
    }

    async insertVideo(id, video){
        this.axios.post(`/api/lists/${id}/video`, video).then((response) => {
            this.emitter.emit("INSERT_VIDEO_SUCCESS");
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("INSERT_VIDEO_FAILED");
        })
    }

    async updateVideo(listID, videoID, video){
        this.axios.put(`/api/lists/${listID}/video/${videoID}`, video).then((response) => {
            this.emitter.emit("UPDATE_VIDEO_SUCCESS");
            this.getVideosFromList(listID);
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("UPDATE_VIDEO_FAILED");
        })
    }

    async deleteVideo(listID, videoID){
        this.axios.delete(`/api/lists/${listID}/video/${videoID}`).then((response) => {
            this.emitter.emit("DELETE_VIDEO_SUCCESS");
            this.getVideosFromList(listID);
        }).catch((error) => {
            console.warn(error)
            this.emitter.emit("DELETE_VIDEO_FAILED");
        })
    }
}

const store = new EntitiesStore();

export default store;