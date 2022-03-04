<<<<<<< HEAD
import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.3.159:5000/api',
    baseURL: 'https://621fe5dace99a7de194b643f.mockapi.io',
});

=======
// faz a importação do pacote axios
import axios from 'axios';

// define a função para chamada das requisições
const api = axios.create({
  // define a URL base das requisições
  baseURL: 'http://192.168.5.202:5000/api',
});

// define o padrão de exportação
>>>>>>> classificado-cadastro
export default api;