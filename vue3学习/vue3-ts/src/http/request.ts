import { LoginResult } from "@/api/user/userModel";
import { getStorageItem } from "@/utils/auth";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import qs from "qs";


export interface Result<T> {
    code: number;
    msg: string;
    data: T
}
export enum StateStatus {
    NoAuth = 600, //token失效
    Success = 200 //返回成功
}

export class Request {
    private instance: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors()
    }

    private interceptors() {
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            let token = getStorageItem('token')
            if (token) {
                config.headers = {
                    ...config.headers,
                    token
                }
            }
            return config;
        }, (error) => {
            error.data = {};
            error.data.msg = '服务器异常，请联系管理员'
            return error
        });
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            if (res && res.data) {
                let data = res.data
                if (data.code === StateStatus.NoAuth) {
                    window.location.href = '/login'
                } else if (data.code === StateStatus.Success || res.config.responseType === 'arraybuffer') {
                    return res
                } else {
                    ElMessage.error(data.msg || '服务器出错!')
                    return res || null // 返回数据
                }
            }
        }, (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        ElMessage.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = '未授权，请重新登录';
                        ElMessage.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = '拒绝访问';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = '请求方法未允许';
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = '请求超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = '服务器端出错';
                        ElMessage.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = '网络未实现';
                        ElMessage.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = '网络错误';
                        ElMessage.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = '服务不可用';
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = '网络超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        ElMessage.error(error.data.msg)
                }
            } else {
                ElMessage.error(error.data.msg || '服务器出错!')

            }
            return error// 返回数据
        })
    }
    get<T>(url: string, params?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get(url, {
                params,
                paramsSerializer: (params) => {
                    return qs.stringify(params)
                }
            }).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getParams(params: any) {
        let _params = ''
        if (params) {
            for (let key in params) {
                _params += `/${params[key]}`
            }
        }
        return _params
    }
    getRestApi<T>(url: string, params: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            let getParams = this.getParams(params)
            this.instance.get(getParams ? `${url}${getParams}` : url).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    post<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    put<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.put<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    delete<T = any>(url: string, params: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(this.getParams(params) ? `${url}${this.getParams(params)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    // login<T>(url: string, params: any): Promise<Result<T>> {
    //     return new Promise((resolve, reject) => {
    //         this.instance.post<T>(url, params, {
    //             transformRequest: [(params) => {
    //                 return qs.stringify(params)
    //             }],
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         }).then((res) => {
    //             resolve(res as any)
    //         }).catch((error) => {
    //             reject(error)
    //         })
    //     })
    // }
    getImage(url: string) {
        return this.instance.post(url, null, {
            responseType: 'arraybuffer'
        })
    }
    login<T = any>(url: string, params: any): Promise<LoginResult> {
        return new Promise((reslove, reject) => {
            this.instance.post<T>(url, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [(params) => {
                    return qs.stringify(params)
                }]
            }).then(res => {
                reslove(res.data as any)
            }).catch(error => {
                reject(error)
            })
        })
    }
}