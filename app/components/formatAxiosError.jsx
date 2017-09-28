export default function formatAxiosError (axiosError) {
  return axiosError.response.data.errors.map(e=> e.message).join(', ')
}
