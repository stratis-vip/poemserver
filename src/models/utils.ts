export interface ApiResponse  {  
  status?:string
  datac?: any
  code?: number
  error?: any
}
export const createApiResponse = (status: any, datac: any, code: number = 200):ApiResponse => {
  return {status,datac,code}
};