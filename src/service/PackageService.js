import axios from 'axios'

const SHOP_API_URL = 'http://localhost:8080/shop/api/v1'
class PackageService {
    retrieveAllPackages() {
        return axios.get(`${SHOP_API_URL}/packages`);
    }


	deletePackage(id) {
	    console.log('executed service')
	    return axios.delete(`${SHOP_API_URL}/packages/${id}`);
	}
	
    retrievePackage(id) {
        //console.log('executed service')
        return axios.get(`${SHOP_API_URL}/packages/${id}`);
    }

    updatePackage(id, shotpPackage) {
        //console.log('executed service')
        return axios.put(`${SHOP_API_URL}/packages/${id}`, shotpPackage);
    }

    createPackage(shotpPackage) {
        //console.log('executed service')
        return axios.post(`${SHOP_API_URL}/packages/`, shotpPackage);
	}
}
export default new PackageService()