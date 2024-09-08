import api from "./api";
const Financial_API = import.meta.env.VITE_Financial_API;

//get all Financial
const getFinanciaAll = async () => {
  return await api.get(Financial_API);
};

//get Financial By ID
const getFinanciaById = async (id) => {
  return await api.get(Financial_API + `/${id}`);
};

//get Financial By User ID
const getFinanciaByUserId = async (userId) => {
  return await api.get(`${Financial_API}/user/${userId}`);
};

//update a Financial data
const editFinancia = async (id, financial) => {
  return await api.put(Financial_API + `/${id}`, financial);
};

//Delete a Financial data
const deleteFinancia = async (id) => {
  return await api.delete(Financial_API +`/${id}`);
};

//Add a Financial Data
const insertFinancia = async (financial) => {
  return await api.post(Financial_API, financial);
};

const FinancialService = {
  getFinanciaAll,
  getFinanciaById,
  editFinancia,
  deleteFinancia,
  insertFinancia,
  getFinanciaByUserId,
};
export default FinancialService;
